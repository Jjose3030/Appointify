'use strict';

var currentUser = null;
var currentBusiness = null;
var bookings = [];

document.addEventListener('DOMContentLoaded', async function () {
    // Redirect to login if not authenticated (also catches stale "undefined"/"null" stored values)
    var token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.assign('../Auth/bussiness-sign-in.html');
        return;
    }

    checkAuth();
    setupUI();

    await fetchBusinessProfile();
    if (currentBusiness) {
        await fetchBookings();
    }

    // Wire up success modal done button
    var doneBtn = document.querySelector('.done-btn');
    if (doneBtn) {
        doneBtn.addEventListener('click', function () {
            var modal = document.querySelector('.upd-suc-cont');
            if (modal) modal.classList.remove('active');
        });
    }
});

function checkAuth() {
    var token = localStorage.getItem('token');
    var userStr = localStorage.getItem('user');

    if (!token || token === 'undefined' || token === 'null' || !userStr) {
        return;
    }

    try {
        currentUser = JSON.parse(userStr);
    } catch (e) {
        localStorage.removeItem('user');
        return;
    }

    // Update displayed name
    var nameEls = document.querySelectorAll('.owner-name .name');
    if (nameEls.length > 0 && currentUser) {
        var firstName = currentUser.name ? currentUser.name.split(' ')[0] : 'User';
        nameEls.forEach(function (el) {
            el.textContent = 'Hi, ' + firstName;
        });
    }

    // Update profile image
    var imgEls = document.querySelectorAll('.owner-img');
    if (imgEls.length > 0 && currentUser) {
        var imgSrc = currentUser.profileImage || currentUser.profileImg || null;
        if (imgSrc) {
            imgEls.forEach(function (el) {
                el.style.backgroundImage = "url('" + imgSrc + "')";
                el.style.backgroundSize = 'cover';
                el.style.backgroundPosition = 'center';
                el.style.borderRadius = '50%';
            });
        }
    }

    // Populate profile form with current user data
    populateUserForm(currentUser);

    // Show profile image in bus-form-img label
    var bussImg = document.querySelector('.buss-img');
    if (bussImg && (currentUser.profileImage || currentUser.profileImg)) {
        bussImg.src = currentUser.profileImage || currentUser.profileImg;
        bussImg.style.display = 'block';
        var spanText = document.querySelector('.bus-span-text');
        if (spanText) spanText.style.display = 'none';
    }
}

async function fetchBusinessProfile() {
    try {
        var data = await ApiService.getMyBusiness();

        if (Array.isArray(data) && data.length > 0) {
            currentBusiness = data[0];
        } else if (data && data._id) {
            currentBusiness = data;
        }

        if (currentBusiness) {
            populateProfileForm(currentBusiness);
            updateDashboardStats(currentBusiness);

            // Show company image preview if available
            var compImg = document.querySelector('.show-comp-img');
            var compImgText = document.querySelector('.prof-img-text');
            if (compImg && (currentBusiness.image)) {
                compImg.src = currentBusiness.image;
                compImg.style.display = 'block';
                if (compImgText) compImgText.style.display = 'none';
            }
        }
    } catch (error) {
        // no business found yet — user can create one via the Company form
    }
}

async function fetchBookings() {
    if (!currentBusiness) return;

    try {
        bookings = await ApiService.getBusinessBookings(currentBusiness._id);
        if (Array.isArray(bookings)) {
            renderBookings(bookings);
            updateBookingStats(bookings);
        }
    } catch (error) {
        // failed to load bookings
    }
}

function setupUI() {
    // Navigation — HTML uses .nav-menu links with data-page="pageid", pages use .page with matching id
    var navLinks = document.querySelectorAll('.nav-menu');
    var pages = document.querySelectorAll('.page');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            var targetPage = link.getAttribute('data-page');

            // Update active link
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');

            // Show matching page, hide others
            pages.forEach(function (page) {
                if (page.id === targetPage) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });

            // Close responsive nav if open
            var nav = document.querySelector('nav');
            var bar = document.querySelector('.bar-tog');
            var modal = document.querySelector('.modal');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (bar) { bar.classList.add('fa-bars'); bar.classList.remove('fa-xmark'); }
                if (modal) modal.classList.remove('active');
            }
        });
    });

    var compForm = document.getElementById('company-form');
    if (compForm) {
        compForm.addEventListener('submit', handleCompanyUpdate);
    }

    var userForm = document.getElementById('bus-prof-form');
    if (userForm) {
        userForm.addEventListener('submit', handleUserUpdate);
    }

    var logoutBtns = document.querySelectorAll('.log-out-btn');
    logoutBtns.forEach(function(logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.clear();
            window.location.assign('../index.html');
        });
    });

    // Profile dropdown toggle
    var ownerSummaries = document.querySelectorAll('.owner-summary');
    ownerSummaries.forEach(function (summary) {
        summary.addEventListener('click', function (e) {
            // Don't close when clicking the logout button itself
            if (e.target.closest('.log-out-btn')) return;
            summary.classList.toggle('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.owner-summary')) {
            ownerSummaries.forEach(function (s) { s.classList.remove('active'); });
        }
    });

    // Profile image upload (user)
    var busFormImg = document.getElementById('bus-form-img');
    if (busFormImg) {
        busFormImg.addEventListener('change', async function () {
            var file = busFormImg.files[0];
            if (!file) return;

            // Preview
            var bussImg = document.querySelector('.buss-img');
            var busSpan = document.querySelector('.bus-span-text');
            if (bussImg) {
                bussImg.src = URL.createObjectURL(file);
                bussImg.style.display = 'block';
                if (busSpan) busSpan.style.display = 'none';
            }

            try {
                var formData = new FormData();
                formData.append('image', file);
                var token = ApiService.getToken();
                if (!token) return;
                var res = await fetch(ApiService.getBaseUrl() + '/api/auth/profile/image', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + token },
                    body: formData
                });
                if (res.ok) {
                    var updated = await res.json();
                    if (updated && updated.user) {
                        localStorage.setItem('user', JSON.stringify(updated.user));
                        currentUser = updated.user;
                    }
                    showSuccess();
                }
            } catch (err) {
                // image upload failed silently
            }
        });
    }

    // Company image upload
    var compImgInput = document.getElementById('comp-img');
    if (compImgInput) {
        compImgInput.addEventListener('change', async function () {
            var file = compImgInput.files[0];
            if (!file) return;

            // Preview
            var compImgEl = document.querySelector('.show-comp-img');
            var compImgText = document.querySelector('.prof-img-text');
            if (compImgEl) {
                compImgEl.src = URL.createObjectURL(file);
                compImgEl.style.display = 'block';
                if (compImgText) compImgText.style.display = 'none';
            }

            if (!currentBusiness || !currentBusiness._id) return;

            try {
                var formData = new FormData();
                formData.append('image', file);
                var token = ApiService.getToken();
                if (!token) return;
                var res = await fetch(ApiService.getBaseUrl() + '/api/businesses/' + currentBusiness._id + '/image', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + token },
                    body: formData
                });
                if (res.ok) {
                    var updated = await res.json();
                    if (updated && updated._id) currentBusiness = updated;
                    showSuccess();
                }
            } catch (err) {
                // image upload failed silently
            }
        });
    }

    // Booking filter dropdown
    var filtOptions = document.querySelectorAll('.drop-option');
    filtOptions.forEach(function (opt) {
        opt.addEventListener('click', function () {
            var val = opt.textContent.trim().toLowerCase();
            var filterStatus = val === 'approved' ? 'confirmed' : val === 'cancel' ? 'cancelled' : val;
            var filtered = filterStatus === 'approved' || filterStatus === 'confirmed' || filterStatus === 'cancelled' || filterStatus === 'pending'
                ? bookings.filter(function (b) { return b.status === filterStatus; })
                : bookings;
            renderBookings(filtered);
        });
    });
}

async function handleUserUpdate(e) {
    e.preventDefault();

    var token = ApiService.getToken();
    if (!token) {
        alert('Please log in first.');
        return;
    }

    var profileData = {
        name: getFieldValue('bus-name'),
        email: getFieldValue('bus-email'),
        phone: getFieldValue('bus-phone'),
        address: getFieldValue('bus-addy'),
        bio: getFieldValue('bus-bio')
    };

    // Remove empty fields
    Object.keys(profileData).forEach(function (k) {
        if (!profileData[k]) delete profileData[k];
    });

    try {
        var updated = await ApiService.updateProfile(profileData);
        if (updated) {
            localStorage.setItem('user', JSON.stringify(updated));
            currentUser = updated;
            checkAuth();
            showSuccess();
        }
    } catch (error) {
        alert('Failed to update profile. Please try again.');
    }
}

function safeText(str) {
    if (!str) return '';
    return String(str);
}

function renderBookings(data) {
    var recentContainer = document.querySelector('.recent-booking-body');

    if (recentContainer) {
        recentContainer.textContent = '';

        if (data.length === 0) {
            var noMsg = document.createElement('p');
            noMsg.textContent = 'No bookings yet.';
            recentContainer.appendChild(noMsg);
            return;
        }

        data.forEach(function (booking) {
            var item = document.createElement('div');
            item.className = 'booking-item';

            var userInfo = document.createElement('div');
            userInfo.className = 'user-info';

            var imgCont = document.createElement('div');
            imgCont.className = 'user-img-cont';
            var imgEl = document.createElement('img');
            imgEl.src = '/Images/img27.png';
            imgEl.alt = '';
            imgCont.appendChild(imgEl);

            var userNameDiv = document.createElement('div');
            userNameDiv.className = 'user-name';

            var nameH2 = document.createElement('h2');
            var customerName = 'Customer';
            if (booking.user && booking.user.name) {
                customerName = booking.user.name;
            }
            nameH2.textContent = safeText(customerName);

            var serviceP = document.createElement('p');
            serviceP.textContent = safeText(booking.serviceType || 'Service');

            userNameDiv.appendChild(nameH2);
            userNameDiv.appendChild(serviceP);

            userInfo.appendChild(imgCont);
            userInfo.appendChild(userNameDiv);

            var dateTime = document.createElement('div');
            dateTime.className = 'date-time';

            var dateH2 = document.createElement('h2');
            var bookingDate = booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A';
            dateH2.textContent = bookingDate;

            var timeP = document.createElement('p');
            timeP.textContent = safeText(booking.startTime || 'TBD');

            dateTime.appendChild(dateH2);
            dateTime.appendChild(timeP);

            var statusDiv = document.createElement('div');
            statusDiv.className = 'status ' + safeText(booking.status || '').toLowerCase();
            statusDiv.textContent = safeText(booking.status || 'pending');

            item.appendChild(userInfo);
            item.appendChild(dateTime);
            item.appendChild(statusDiv);

            if (booking.status === 'pending') {
                var actionDiv = document.createElement('div');
                actionDiv.className = 'action-btn';

                var acceptBtn = document.createElement('button');
                acceptBtn.className = 'accept-btn';
                var checkIcon = document.createElement('i');
                checkIcon.className = 'fa-solid fa-check';
                acceptBtn.appendChild(checkIcon);
                acceptBtn.addEventListener('click', function () {
                    updateBookingStatus(booking._id, 'confirmed');
                });

                var declineBtn = document.createElement('button');
                declineBtn.className = 'decline-btn';
                var xIcon = document.createElement('i');
                xIcon.className = 'fa-solid fa-xmark';
                declineBtn.appendChild(xIcon);
                declineBtn.addEventListener('click', function () {
                    updateBookingStatus(booking._id, 'cancelled');
                });

                actionDiv.appendChild(acceptBtn);
                actionDiv.appendChild(declineBtn);
                item.appendChild(actionDiv);
            } else {
                var emptyDiv = document.createElement('div');
                item.appendChild(emptyDiv);
            }

            recentContainer.appendChild(item);
        });
    }
}

async function updateBookingStatus(bookingId, status) {
    if (!bookingId || !status) return;

    var confirmMsg = status === 'confirmed' ? 'Confirm this booking?' : 'Cancel this booking?';
    if (!confirm(confirmMsg)) return;

    try {
        await ApiService.updateBooking(bookingId, { status: status });
        await fetchBookings();
    } catch (error) {
        alert('Failed to update booking. Please try again.');
    }
}

window.updateBookingStatus = updateBookingStatus;

function populateProfileForm(data) {
    var fields = {
        'comp-name': data.name || data.companyName,
        'comp-email': data.email,
        'comp-phone': data.phone,
        'comp-address': data.address,
        'comp-description': data.description,
        'comp-job': data.category,
        'comp-work-day': data.workingHours || data.workingDays,
        'comp-min-price': data.priceRange ? data.priceRange.min : '',
        'comp-max-price': data.priceRange ? data.priceRange.max : '',
        'comp-direction': data.direction
    };

    for (var id in fields) {
        var el = document.getElementById(id);
        if (el) el.value = fields[id] || '';
    }
}

function populateUserForm(user) {
    if (!user) return;

    var fields = {
        'bus-name': user.name,
        'bus-email': user.email,
        'bus-phone': user.phone,
        'bus-addy': user.address,
        'bus-bio': user.bio
    };

    for (var id in fields) {
        var el = document.getElementById(id);
        if (el) el.value = fields[id] || '';
    }
}

function getFieldValue(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

async function handleCompanyUpdate(e) {
    e.preventDefault();

    var token = ApiService.getToken();
    if (!token) {
        alert('Please log in first.');
        return;
    }

    var payload = {
        name: getFieldValue('comp-name'),
        email: getFieldValue('comp-email'),
        phone: getFieldValue('comp-phone'),
        address: getFieldValue('comp-address'),
        description: getFieldValue('comp-description'),
        category: getFieldValue('comp-job'),
        workingHours: getFieldValue('comp-work-day'),
        direction: getFieldValue('comp-direction')
    };

    var minPrice = getFieldValue('comp-min-price');
    var maxPrice = getFieldValue('comp-max-price');
    if (minPrice || maxPrice) {
        payload.priceRange = { min: minPrice, max: maxPrice };
    }

    // Remove empty fields
    Object.keys(payload).forEach(function (k) {
        if (!payload[k]) delete payload[k];
    });

    try {
        if (currentBusiness && currentBusiness._id) {
            var updated = await ApiService.updateBusiness(currentBusiness._id, payload);
            currentBusiness = updated;
        } else {
            var created = await ApiService.createBusiness(payload);
            currentBusiness = created;
        }
        showSuccess();
    } catch (error) {
        alert('Failed to save business profile. Please try again.');
    }
}

function updateDashboardStats(business) {
    var nameEl = document.querySelector('.business-dash-name');
    if (nameEl) {
        nameEl.textContent = business.name || business.companyName || '';
    }
}

function showSuccess() {
    var modal = document.querySelector('.upd-suc-cont');
    if (modal) {
        modal.classList.add('active');
    }
}

function updateBookingStats(bookingList) {
    var total = bookingList.length;
    var pending = bookingList.filter(function (b) { return b.status === 'pending'; }).length;
    var confirmed = bookingList.filter(function (b) { return b.status === 'confirmed'; }).length;

    var totalEl = document.querySelector('.total-count');
    if (totalEl) totalEl.textContent = total;

    var pendingEl = document.querySelector('.pending-count');
    if (pendingEl) pendingEl.textContent = pending;

    var confirmedEl = document.querySelector('.confirmed-count');
    if (confirmedEl) confirmedEl.textContent = confirmed;

    // Also render the Bookings page full list
    renderBookingPage(bookingList);
}

// Renders the full bookings list in the Bookings page tab
function renderBookingPage(data) {
    var container = document.querySelector('.book-cont');
    if (!container) return;

    container.textContent = '';

    if (!data || data.length === 0) {
        var empty = document.createElement('p');
        empty.style.padding = '20px';
        empty.textContent = 'No bookings found.';
        container.appendChild(empty);
        return;
    }

    data.forEach(function (booking) {
        var customerName = (booking.user && booking.user.name) ? booking.user.name : 'Customer';
        var customerPhone = (booking.user && booking.user.phone) ? booking.user.phone : '';
        var customerAddr = (booking.user && booking.user.address) ? booking.user.address : '';
        var bookingDate = booking.date ? new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';
        var bookingTime = booking.startTime || 'TBD';
        var endTime = booking.endTime || '';
        var status = (booking.status || 'pending').toLowerCase();
        var notes = booking.notes || 'No notes provided';
        var budget = booking.budget || '';
        var serviceType = booking.serviceType || booking.category || '';

        var item = document.createElement('div');
        item.className = 'book-item';

        // LEFT SIDE
        var left = document.createElement('div');
        left.className = 'book-left';

        // Header: avatar + name + chevron
        var leftHeader = document.createElement('div');
        leftHeader.className = 'book-left-header';

        var det = document.createElement('div');
        det.className = 'book-det';

        var bookImg = document.createElement('div');
        bookImg.className = 'book-img';
        var profImg = document.createElement('img');
        profImg.className = 'book-prof-img';
        profImg.src = (booking.user && booking.user.profileImg) ? booking.user.profileImg : '/Images/img27.png';
        profImg.alt = customerName;
        bookImg.appendChild(profImg);

        var bookProf = document.createElement('div');
        bookProf.className = 'book-prof';
        var nameLabel = document.createElement('p');
        nameLabel.textContent = 'Customer';
        var nameH3 = document.createElement('h3');
        nameH3.textContent = safeText(customerName);
        bookProf.appendChild(nameLabel);
        bookProf.appendChild(nameH3);

        if (customerPhone) {
            var callDiv = document.createElement('div');
            callDiv.className = 'book-call';
            callDiv.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21.97 18.33c0 .36-.08.71-.25 1.05-.17.34-.39.66-.68.96-.49.54-1.03.8-1.6.8-.42 0-.87-.1-1.36-.31-.49-.21-.98-.49-1.46-.85-.49-.37-.95-.77-1.39-1.2-.44-.44-.84-.9-1.2-1.38-.35-.48-.63-.96-.84-1.43-.21-.48-.31-.93-.31-1.35 0-.41.09-.8.27-1.16.18-.37.45-.71.81-1.01.44-.35.92-.52 1.43-.52.2 0 .4.04.58.12.19.08.36.2.5.38l1.68 2.37c.14.19.24.37.31.54.07.16.11.31.11.45 0 .18-.05.36-.15.53-.1.17-.24.34-.42.51l-.57.59c-.08.08-.12.18-.12.3 0 .06.01.11.03.17.03.06.06.11.08.16.14.26.38.59.72.99.35.4.72.81 1.12 1.21.41.4.8.77 1.21 1.11.4.34.73.57.99.71.04.02.09.05.15.07.06.03.12.04.19.04.13 0 .23-.04.31-.13l.57-.56c.18-.18.35-.31.51-.4.16-.09.32-.13.49-.13.14 0 .29.03.45.1.16.07.33.17.51.31l2.4 1.7c.18.13.3.28.37.46.06.19.1.38.1.6z" stroke="#666" stroke-width="1.5"/></svg>';
            var callText = document.createElement('span');
            callText.textContent = customerPhone;
            callDiv.appendChild(callText);
            bookProf.appendChild(callDiv);
        }

        det.appendChild(bookImg);
        det.appendChild(bookProf);

        var chevron = document.createElement('i');
        chevron.className = 'fa-solid fa-chevron-down spin';

        leftHeader.appendChild(det);
        leftHeader.appendChild(chevron);

        // Status badge
        var statusDiv = document.createElement('div');
        statusDiv.className = 'status ' + status;
        statusDiv.textContent = status.charAt(0).toUpperCase() + status.slice(1);

        // Service details (shown when expanded)
        var servCont = document.createElement('div');
        servCont.className = 'book-serv-cont';

        if (serviceType) {
            var servType = document.createElement('div');
            servType.className = 'serv-type';
            servType.innerHTML = '<p>Service: <span>' + safeText(serviceType) + '</span></p>';
            servCont.appendChild(servType);
        }

        var dateRow = document.createElement('div');
        dateRow.className = 'book-date';
        dateRow.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 2v3M16 2v3M3 9h18M21 8V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5z" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var dateText = document.createElement('span');
        dateText.className = 'book-date-text';
        dateText.textContent = bookingDate;
        dateRow.appendChild(dateText);

        var timeRow = document.createElement('div');
        timeRow.className = 'book-time';
        timeRow.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" stroke="#555" stroke-width="1.5"/><path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51" stroke="#555" stroke-width="1.5" stroke-linecap="round"/></svg>';
        var timeText = document.createElement('span');
        timeText.className = 'book-time-text';
        timeText.textContent = bookingTime + (endTime ? ' – ' + endTime : '');
        timeRow.appendChild(timeText);

        servCont.appendChild(dateRow);
        servCont.appendChild(timeRow);

        if (budget) {
            var budgetDiv = document.createElement('div');
            budgetDiv.className = 'book-budget';
            budgetDiv.innerHTML = '<p>Budget</p><h2>' + safeText(budget) + '</h2>';
            servCont.appendChild(budgetDiv);
        }

        // Action buttons for pending
        if (status === 'pending') {
            var bookServHeader = document.createElement('div');
            bookServHeader.className = 'book-serv-header';

            var acceptBtn = document.createElement('button');
            acceptBtn.className = 'accept-btn';
            acceptBtn.innerHTML = '<i class="fa-solid fa-check"></i> Accept';
            (function (id) {
                acceptBtn.addEventListener('click', function (e) { e.stopPropagation(); updateBookingStatus(id, 'confirmed'); });
            })(booking._id);

            var declineBtn = document.createElement('button');
            declineBtn.className = 'decline-btn';
            declineBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Decline';
            (function (id) {
                declineBtn.addEventListener('click', function (e) { e.stopPropagation(); updateBookingStatus(id, 'cancelled'); });
            })(booking._id);

            bookServHeader.appendChild(acceptBtn);
            bookServHeader.appendChild(declineBtn);
            servCont.appendChild(bookServHeader);
        }

        left.appendChild(leftHeader);
        left.appendChild(statusDiv);
        left.appendChild(servCont);

        // RIGHT SIDE (notes + address + message button)
        var right = document.createElement('div');
        right.className = 'book-right';

        var shortNote = document.createElement('div');
        shortNote.className = 'book-short-note';
        shortNote.innerHTML = '<p>Notes</p><h2>' + safeText(notes) + '</h2>';

        var addy = document.createElement('div');
        addy.className = 'book-addy';
        addy.innerHTML = '<p>Address</p><h2>' + safeText(customerAddr || 'Not provided') + '</h2>';

        if (customerAddr) {
            var locDiv = document.createElement('div');
            locDiv.className = 'book-location';
            locDiv.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#666" stroke-width="1.5"/></svg>';
            var locText = document.createElement('span');
            locText.textContent = customerAddr;
            locDiv.appendChild(locText);
            addy.appendChild(locDiv);
        }

        var msgBtn = document.createElement('button');
        msgBtn.className = 'message-cust';
        msgBtn.textContent = 'Message Customer';
        (function (bId, bName) {
            msgBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                // Switch to message tab and open chat
                var msgNavLink = document.querySelector('[data-page="message"]');
                if (msgNavLink) msgNavLink.click();
                setTimeout(function () {
                    var convItems = document.querySelectorAll('.mes-item');
                    convItems.forEach(function (ci) {
                        if (ci.textContent.includes(bName)) ci.click();
                    });
                }, 300);
            });
        })(booking._id, customerName);

        right.appendChild(shortNote);
        right.appendChild(addy);
        right.appendChild(msgBtn);

        item.appendChild(left);
        item.appendChild(right);

        // Toggle expand on click
        item.addEventListener('click', function () {
            var isActive = item.classList.contains('active');
            document.querySelectorAll('.book-item.active').forEach(function (el) { el.classList.remove('active'); });
            if (!isActive) item.classList.add('active');
        });

        container.appendChild(item);
    });
}
