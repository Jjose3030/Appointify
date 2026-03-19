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
    await fetchBookings();

    // If no business profile set up yet, redirect to Company tab automatically
    if (!isValidBusiness(currentBusiness)) {
        var companyLink = document.querySelector('[data-page="company"]');
        if (companyLink) companyLink.click();

        var compForm = document.querySelector('.company-form');
        if (compForm && !document.getElementById('setup-notice')) {
            var notice = document.createElement('div');
            notice.id = 'setup-notice';
            notice.style.cssText = 'background:#fff3cd;border:1px solid #ffc107;color:#856404;padding:12px 16px;border-radius:10px;margin-bottom:16px;font-size:0.9rem;';
            notice.textContent = 'Welcome! Please fill in your company details and click Save Changes to complete your setup.';
            compForm.insertAdjacentElement('afterbegin', notice);
        }
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

// Normalise a raw business object: copy 'id' → '_id' when '_id' is absent
function normalizeBusiness(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    if (!obj._id && obj.id) {
        obj._id = obj.id;
    }
    return obj;
}

function extractBusiness(data) {
    if (!data) return null;
    if (Array.isArray(data) && data.length > 0) return normalizeBusiness(data[0]);
    if (data._id || data.id) return normalizeBusiness(data);
    if (data.data) {
        if (Array.isArray(data.data) && data.data.length > 0) return normalizeBusiness(data.data[0]);
        if (data.data._id || data.data.id) return normalizeBusiness(data.data);
    }
    if (data.business && (data.business._id || data.business.id)) return normalizeBusiness(data.business);
    if (data.businesses) {
        if (Array.isArray(data.businesses) && data.businesses.length > 0) return normalizeBusiness(data.businesses[0]);
    }
    return null;
}

function isValidBusiness(b) {
    if (!b) return false;
    if (Array.isArray(b)) return false;
    if (typeof b !== 'object') return false;
    if (!b._id && !b.id) return false;
    // Ensure _id is always set
    if (!b._id) b._id = b.id;
    return true;
}

async function fetchBusinessProfile() {
    try {
        var data = await ApiService.getMyBusiness();
        currentBusiness = extractBusiness(data);

        // Fallback: try /mine endpoint if first call gave nothing
        if (!isValidBusiness(currentBusiness)) {
            try {
                var data2 = await ApiService.getMyBusinesses();
                currentBusiness = extractBusiness(data2);
            } catch (e2) { /* ignore */ }
        }

        if (isValidBusiness(currentBusiness)) {
            populateProfileForm(currentBusiness);
            updateDashboardStats(currentBusiness);

            // Show company image preview if available
            var compImg = document.querySelector('.show-comp-img');
            var compImgText = document.querySelector('.prof-img-text');
            if (compImg && currentBusiness.image) {
                compImg.src = currentBusiness.image;
                compImg.style.display = 'block';
                if (compImgText) compImgText.style.display = 'none';
                var revImgLabel = document.getElementById('rev-img');
                if (revImgLabel) revImgLabel.classList.add('has-image');
            }

            // Render gallery from API images array
            var apiGallery = Array.isArray(currentBusiness.images) ? currentBusiness.images : [];
            renderGallery(apiGallery);
        }
    } catch (error) {
        console.warn('fetchBusinessProfile error:', error);
        // No business yet — user can create one via the Company form
    }
}

async function fetchBookings() {
    // Always show a state immediately so the booking page is never blank
    renderBookingPage('loading');

    if (!isValidBusiness(currentBusiness)) {
        renderBookingPage([]);
        return;
    }

    try {
        var raw = await ApiService.getBusinessBookings(currentBusiness._id);
        // Handle wrapped responses: { data: [...] } or { bookings: [...] } or plain array
        if (Array.isArray(raw)) {
            bookings = raw;
        } else if (raw && Array.isArray(raw.data)) {
            bookings = raw.data;
        } else if (raw && Array.isArray(raw.bookings)) {
            bookings = raw.bookings;
        } else {
            bookings = [];
        }

        renderBookings(bookings);
        updateBookingStats(bookings);
        renderBookingPage(bookings);
    } catch (error) {
        console.warn('fetchBookings error:', error);
        renderBookingPage([]);
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
                var revImgLabel = document.getElementById('rev-img');
                if (revImgLabel) revImgLabel.classList.add('has-image');
            }

            if (!isValidBusiness(currentBusiness)) {
                // Show inline notice instead of blocking alert
                var notice = document.getElementById('comp-img-error');
                if (notice) {
                    notice.textContent = 'Save your company profile first before uploading an image.';
                    notice.style.display = 'block';
                    setTimeout(function () { notice.textContent = ''; notice.style.display = 'none'; }, 4000);
                }
                if (compImgEl) { compImgEl.src = ''; compImgEl.style.display = 'none'; }
                if (compImgText) compImgText.style.display = '';
                compImgInput.value = '';
                return;
            }

            try {
                var formData = new FormData();
                formData.append('images', file);
                var token = ApiService.getToken();
                if (!token) return;
                var res = await fetch(ApiService.getBaseUrl() + '/api/businesses/' + currentBusiness._id + '/image', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + token },
                    body: formData
                });
                if (res.ok) {
                    var result = await res.json();
                    var uploadedImgs = result.images || [];
                    if (uploadedImgs.length > 0) {
                        currentBusiness.image = uploadedImgs[0].url;
                        currentBusiness.imagePublicId = uploadedImgs[0].publicId;
                    }
                    showSuccess();
                } else {
                    alert('Image upload failed. Please try again.');
                }
            } catch (err) {
                // image upload failed silently
            }
        });
    }

    // Gallery image upload
    var workImgUp = document.getElementById('work-img-up');
    if (workImgUp) {
        workImgUp.addEventListener('change', async function () {
            var files = Array.from(workImgUp.files);
            if (!files.length) return;

            if (!isValidBusiness(currentBusiness)) {
                var notice = document.getElementById('comp-img-error');
                if (notice) {
                    notice.textContent = 'Save your company profile first before uploading gallery images.';
                    notice.style.display = 'block';
                    setTimeout(function () { notice.textContent = ''; notice.style.display = 'none'; }, 4000);
                }
                workImgUp.value = '';
                return;
            }

            var token = ApiService.getToken();
            if (!token) return;

            var formData = new FormData();
            files.forEach(function (f) { formData.append('images', f); });

            try {
                var res = await fetch(ApiService.getBaseUrl() + '/api/businesses/' + currentBusiness._id + '/image', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + token },
                    body: formData
                });
                if (res.ok) {
                    var result = await res.json();
                    var newImgs = result.images || [];
                    var existing = Array.isArray(currentBusiness.images) ? currentBusiness.images : [];
                    currentBusiness.images = existing.concat(newImgs);
                    renderGallery(currentBusiness.images);
                    showSuccess();
                } else {
                    alert('Gallery upload failed. Please try again.');
                }
            } catch (err) {
                alert('Gallery upload failed. Please try again.');
            }

            workImgUp.value = '';
        });
    }

    // Slot duration quick-select buttons
    var slotOpts = document.querySelectorAll('.slot-opt');
    slotOpts.forEach(function (btn) {
        btn.addEventListener('click', function () {
            slotOpts.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var slotInput = document.getElementById('comp-slot-duration');
            if (slotInput) slotInput.value = btn.dataset.min;
        });
    });

    // Sync custom slot input: deselect quick-select buttons when custom value typed
    var slotCustom = document.getElementById('comp-slot-duration');
    if (slotCustom) {
        slotCustom.addEventListener('input', function () {
            // Only deselect if the typed value doesn't match any button
            var val = parseInt(slotCustom.value, 10);
            slotOpts.forEach(function (b) {
                if (parseInt(b.dataset.min, 10) === val) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
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
            imgEl.src = (booking.user && (booking.user.profileImage || booking.user.profileImg || booking.user.image))
                ? (booking.user.profileImage || booking.user.profileImg || booking.user.image)
                : '/Images/img27.png';
            imgEl.alt = customerName + ' profile image';
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
                    updateBookingStatus(booking._id || booking.id, 'confirmed');
                });

                var declineBtn = document.createElement('button');
                declineBtn.className = 'decline-btn';
                var xIcon = document.createElement('i');
                xIcon.className = 'fa-solid fa-xmark';
                declineBtn.appendChild(xIcon);
                declineBtn.addEventListener('click', function () {
                    updateBookingStatus(booking._id || booking.id, 'cancelled');
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
        if (status === 'cancelled' && ApiService.cancelBookingPatch) {
            await ApiService.cancelBookingPatch(bookingId);
        } else if (ApiService.updateBookingStatus) {
            await ApiService.updateBookingStatus(bookingId, status);
        } else {
            await ApiService.updateBooking(bookingId, { status: status });
        }
        await fetchBookings();
    } catch (error) {
        var msg = (error && error.message) ? error.message : 'Failed to update booking. Please try again.';
        alert(msg);
    }
}

window.updateBookingStatus = updateBookingStatus;

function populateProfileForm(data) {
    var u = currentUser || {};
    var fields = {
        'comp-name': data.name || data.companyName || u.companyName || u.name,
        'comp-email': data.email || u.email,
        'comp-phone': data.phone || u.phone,
        'comp-address': data.address,
        'comp-description': data.description,
        'comp-job': data.category,
        'comp-min-price': data.minPrice != null ? data.minPrice : '',
        'comp-max-price': data.maxPrice != null ? data.maxPrice : '',
        'comp-direction': data.direction
    };

    for (var id in fields) {
        var el = document.getElementById(id);
        if (el) el.value = fields[id] || '';
    }

    populateWorkingHours(data);
}

// ─── Working Hours helpers ───────────────────────────────────────

function getWorkingSchedule() {
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var schedule = [];
    days.forEach(function (day) {
        var check = document.getElementById('wh-' + day);
        if (check && check.checked) {
            var open = document.getElementById('wh-open-' + day);
            var close = document.getElementById('wh-close-' + day);
            schedule.push({
                day: day,
                open: open ? open.value : '09:00',
                close: close ? close.value : '17:00'
            });
        }
    });
    return schedule;
}

function getSlotDuration() {
    var el = document.getElementById('comp-slot-duration');
    return (el && el.value) ? parseInt(el.value, 10) : null;
}

function populateWorkingHours(data) {
    if (!data) return;

    // Slot duration
    var slotEl = document.getElementById('comp-slot-duration');
    if (slotEl && data.slotDuration) slotEl.value = data.slotDuration;
    var slotOpts = document.querySelectorAll('.slot-opt');
    slotOpts.forEach(function (btn) {
        btn.classList.remove('active');
        if (data.slotDuration && parseInt(btn.dataset.min, 10) === parseInt(data.slotDuration, 10)) {
            btn.classList.add('active');
        }
    });

    var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var DAY_ABBR = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };

    function resolveDay(name) {
        if (!name) return null;
        var n = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (DAYS.indexOf(n) !== -1) return n;
        return DAY_ABBR[n.substring(0, 3)] || null;
    }

    var activeDays = [];

    if (data.workingHours && typeof data.workingHours === 'object' && !Array.isArray(data.workingHours)) {
        // New object format: { monday: { open, close, enabled }, ... }
        Object.keys(data.workingHours).forEach(function (key) {
            var entry = data.workingHours[key];
            var resolved = resolveDay(key);
            if (resolved && entry && entry.enabled) {
                activeDays.push({ day: resolved, open: entry.open, close: entry.close });
            }
        });
    } else if (Array.isArray(data.workingSchedule) && data.workingSchedule.length > 0) {
        activeDays = data.workingSchedule;
    } else if (typeof data.workingHours === 'string' && data.workingHours.trim()) {
        var str = data.workingHours.trim();
        var rangeMatch = str.match(/([A-Za-z]+)\s*[-\u2013]\s*([A-Za-z]+)/);
        if (rangeMatch) {
            var fromDay = resolveDay(rangeMatch[1]);
            var toDay   = resolveDay(rangeMatch[2]);
            if (fromDay && toDay) {
                var from = DAYS.indexOf(fromDay);
                var to   = DAYS.indexOf(toDay);
                if (from !== -1 && to !== -1) {
                    for (var i = from; i <= to; i++) activeDays.push({ day: DAYS[i] });
                }
            }
        } else {
            DAYS.forEach(function (d) {
                if (str.indexOf(d) !== -1 || str.indexOf(d.substring(0, 3)) !== -1) {
                    activeDays.push({ day: d });
                }
            });
        }
    }

    if (activeDays.length === 0) return;
    document.querySelectorAll('.wh-day-check').forEach(function (c) { c.checked = false; });
    activeDays.forEach(function (item) {
        var check = document.getElementById('wh-' + item.day);
        if (check) {
            check.checked = true;
            var open  = document.getElementById('wh-open-'  + item.day);
            var close = document.getElementById('wh-close-' + item.day);
            if (open  && item.open)  open.value  = item.open;
            if (close && item.close) close.value = item.close;
        }
    });
}

// ─────────────────────────────────────────────────────────────────

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

    var saveBtn = document.querySelector('.save-comp-btn');
    var originalText = saveBtn ? saveBtn.textContent : 'Save Changes';
    if (saveBtn) { saveBtn.textContent = 'Saving...'; saveBtn.disabled = true; }

    var schedule = getWorkingSchedule();

    // Build workingHours as the object format the API expects
    var ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var workingHoursObj = {};
    ALL_DAYS.forEach(function (day) {
        var key = day.toLowerCase();
        var inSchedule = schedule.find(function (s) { return s.day === day; });
        workingHoursObj[key] = inSchedule
            ? { open: inSchedule.open || '09:00', close: inSchedule.close || '17:00', enabled: true }
            : { open: '09:00', close: '17:00', enabled: false };
    });

    var payload = {
        name: getFieldValue('comp-name'),
        email: getFieldValue('comp-email'),
        phone: getFieldValue('comp-phone'),
        address: getFieldValue('comp-address'),
        description: getFieldValue('comp-description'),
        category: getFieldValue('comp-job'),
        workingSchedule: schedule,
        workingHours: workingHoursObj,
        slotDuration: getSlotDuration(),
        direction: getFieldValue('comp-direction'),
        image: (currentBusiness && currentBusiness.image) ? currentBusiness.image : undefined
    };

    var minPrice = getFieldValue('comp-min-price');
    var maxPrice = getFieldValue('comp-max-price');
    if (minPrice) payload.minPrice = parseFloat(minPrice);
    if (maxPrice) payload.maxPrice = parseFloat(maxPrice);

    // Remove falsy fields (but keep arrays/objects and valid numbers including 0)
    Object.keys(payload).forEach(function (k) {
        var v = payload[k];
        if (!v && v !== 0 && !Array.isArray(v) && typeof v !== 'object') delete payload[k];
    });
    // Clean up: remove null/NaN slotDuration
    if (!payload.slotDuration || isNaN(payload.slotDuration)) delete payload.slotDuration;

    // Helper: show inline form error
    function showFormError(msg) {
        var errEl = document.getElementById('comp-form-error');
        if (errEl) {
            errEl.textContent = msg;
            errEl.style.display = 'block';
            setTimeout(function () { errEl.style.display = 'none'; errEl.textContent = ''; }, 6000);
        } else {
            // Fallback to the image error span at top of form
            var imgErr = document.getElementById('comp-img-error');
            if (imgErr) {
                imgErr.textContent = msg;
                imgErr.style.display = 'block';
                setTimeout(function () { imgErr.textContent = ''; imgErr.style.display = 'none'; }, 6000);
            }
        }
    }

    try {
        var response;
        if (isValidBusiness(currentBusiness)) {
            response = await ApiService.updateBusiness(currentBusiness._id, payload);
        } else {
            response = await ApiService.createBusiness(payload);
        }

        // Extract from any wrapper shape: { business }, { data }, or plain object
        var updated = extractBusiness(response) || response;
        if (updated && (updated._id || updated.id)) {
            if (!updated._id) updated._id = updated.id;
            // Merge: payload keeps fields the API doesn't persist; API response wins for fields it returns
            currentBusiness = Object.assign({}, currentBusiness, payload, updated);
            populateProfileForm(currentBusiness);

            // Refresh company image preview
            var compImg = document.querySelector('.show-comp-img');
            var compImgText = document.querySelector('.prof-img-text');
            if (compImg && currentBusiness.image) {
                compImg.src = currentBusiness.image;
                compImg.style.display = 'block';
                if (compImgText) compImgText.style.display = 'none';
            }
        }

        if (saveBtn) { saveBtn.textContent = originalText; saveBtn.disabled = false; }

        // Remove the first-time setup notice if present
        var setupNotice = document.getElementById('setup-notice');
        if (setupNotice) setupNotice.remove();

        showSuccess();
    } catch (error) {
        console.error('handleCompanyUpdate error:', error);
        if (saveBtn) { saveBtn.textContent = originalText; saveBtn.disabled = false; }
        var msg = (error && error.message) ? error.message : 'Failed to save business profile. Please try again.';
        showFormError(msg);
    }
}

// ── Gallery helpers ──────────────────────────────────────────────

function getLocalGallery(businessId) {
    try {
        var raw = localStorage.getItem('gallery_' + businessId);
        return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
}

function saveLocalGallery(businessId, images) {
    try {
        localStorage.setItem('gallery_' + businessId, JSON.stringify(images));
    } catch (e) { /* storage full — silently skip */ }
}

function fileToDataURL(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (e) { resolve(e.target.result); };
        reader.onerror = function (e) { reject(e); };
        reader.readAsDataURL(file);
    });
}

function renderGallery(images) {
    var container = document.querySelector('.up-img-cont');
    if (!container) return;

    container.textContent = '';

    if (!images || images.length === 0) {
        var empty = document.createElement('p');
        empty.textContent = 'No images uploaded yet';
        container.appendChild(empty);
        return;
    }

    images.forEach(function (item, idx) {
        // item can be a string URL or { url, publicId } object
        var src = typeof item === 'string' ? item : item.url;
        var publicId = (typeof item === 'object' && item.publicId) ? item.publicId : null;

        var wrapper = document.createElement('div');
        wrapper.className = 'up-img';

        var img = document.createElement('img');
        img.src = src;
        img.alt = 'gallery image';

        var delBtn = document.createElement('button');
        delBtn.className = 'del-gallery-img';
        delBtn.type = 'button';
        delBtn.title = 'Remove image';
        delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        delBtn.addEventListener('click', async function () {
            if (!isValidBusiness(currentBusiness)) return;
            // Delete from API if we have a publicId
            if (publicId) {
                try {
                    var token = ApiService.getToken();
                    await fetch(ApiService.getBaseUrl() + '/api/businesses/' + currentBusiness._id + '/image', {
                        method: 'DELETE',
                        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ publicId: publicId })
                    });
                } catch (e) { /* ignore */ }
            }
            currentBusiness.images = (currentBusiness.images || []).filter(function (_, i) { return i !== idx; });
            renderGallery(currentBusiness.images);
        });

        wrapper.appendChild(img);
        wrapper.appendChild(delBtn);
        container.appendChild(wrapper);
    });
}

// ─────────────────────────────────────────────────────────────────

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
}

// Renders the full bookings list in the Bookings page tab
function renderBookingPage(data) {
    var container = document.querySelector('.book-cont');
    if (!container) return;

    container.textContent = '';

    if (data === 'loading') {
        var loading = document.createElement('p');
        loading.className = 'booking-empty-state';
        loading.textContent = 'Loading bookings...';
        container.appendChild(loading);
        return;
    }

    if (!data || data.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'booking-empty-state';
        empty.textContent = 'No bookings available.';
        container.appendChild(empty);
        return;
    }

    data.forEach(function (booking) {
        var customerName = (booking.user && booking.user.name) ? booking.user.name : 'Customer';
        var customerPhone = (booking.user && booking.user.phone) ? booking.user.phone : '';
        var customerAddr = booking.addressDirection || booking.location ||
            ((booking.user && booking.user.address) ? booking.user.address : '');
        var bookingDate = booking.date ? new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';
        var bookingTime = booking.startTime || 'TBD';
        var endTime = booking.endTime || '';
        var status = (booking.status || 'pending').toLowerCase();
        var notes = booking.note || booking.notes || 'No notes provided';
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
        profImg.src = (booking.user && (booking.user.profileImage || booking.user.profileImg || booking.user.image))
            ? (booking.user.profileImage || booking.user.profileImg || booking.user.image)
            : '/Images/img27.png';
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
            })(booking._id || booking.id);

            var declineBtn = document.createElement('button');
            declineBtn.className = 'decline-btn';
            declineBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Decline';
            (function (id) {
                declineBtn.addEventListener('click', function (e) { e.stopPropagation(); updateBookingStatus(id, 'cancelled'); });
            })(booking._id || booking.id);

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
        (function (bId, bName, bImg) {
            msgBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (typeof window.openBusinessBookingConversation === 'function') {
                    window.openBusinessBookingConversation({
                        bookingId: bId,
                        name: bName,
                        image: bImg
                    });
                    return;
                }

                try {
                    localStorage.setItem('businessPendingConversation', JSON.stringify({
                        bookingId: bId,
                        name: bName,
                        image: bImg || ''
                    }));
                } catch (err) { }

                var msgNavLink = document.querySelector('[data-page="message"]');
                if (msgNavLink) msgNavLink.click();
            });
        })(booking._id || booking.id, customerName, profImg.src);

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
