'use strict';

var businesses = [];
var currentUser = null;

document.addEventListener('DOMContentLoaded', async function () {
    checkAuth();
    setupUI();

    if (document.querySelector('.card-container')) {
        await fetchBusinesses();
    }

    if (document.getElementById('book-form')) {
        setupBookingPage();
    }

    if (document.getElementById('user-prof-form')) {
        populateUserProfile();
        setupProfileForm();
    }

    // Landing page sections — fetch real data from API
    if (document.querySelector('.top-rate-cont') || document.querySelector('.recent-cont') || document.querySelector('.recommend-cont')) {
        await fetchLandingPageData();
    }
});

function checkAuth() {
    var token = localStorage.getItem('token');
    if (!token) return;

    var userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            currentUser = JSON.parse(userStr);
        } catch (e) {
            localStorage.removeItem('user');
            return;
        }
        updateProfileUI();
    }
}

function updateProfileUI() {
    if (!currentUser) return;

    var nameEls = document.querySelectorAll('.cust-name-summary');
    nameEls.forEach(function (el) {
        var firstName = currentUser.name ? currentUser.name.split(' ')[0] : 'User';
        el.textContent = 'Hi, ' + firstName;
    });

    var imgEls = document.querySelectorAll('.cust-img');
    imgEls.forEach(function (el) {
        if (currentUser.profileImg) {
            el.style.backgroundImage = "url('" + currentUser.profileImg + "')";
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
        }
    });
}

async function populateUserProfile() {
    if (!currentUser) return;

    var token = localStorage.getItem('token');
    if (!token) return;

    try {
        var freshUser = await ApiService.getCurrentUser();
        if (freshUser) {
            currentUser = freshUser;
            localStorage.setItem('user', JSON.stringify(freshUser));
        }
    } catch (e) {
        // fall back to stored data
    }

    var fields = {
        'user-name': currentUser.name || '',
        'user-email': currentUser.email || '',
        'user-phone': currentUser.phone || '',
        'user-addy': currentUser.address || ''
    };

    for (var id in fields) {
        var el = document.getElementById(id);
        if (el) el.value = fields[id];
    }
}

function setupProfileForm() {
    var form = document.getElementById('user-prof-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        var token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to update your profile.');
            return;
        }

        var uName = document.getElementById('user-name');
        var uEmail = document.getElementById('user-email');
        var uPhone = document.getElementById('user-phone');
        var uAddy = document.getElementById('user-addy');

        if (!uName.value || uName.value.trim().length < 2) {
            alert('Please enter a valid name.');
            return;
        }

        if (!uEmail.value || !uEmail.value.includes('@')) {
            alert('Please enter a valid email.');
            return;
        }

        var profileData = {
            name: uName.value.trim(),
            email: uEmail.value.trim(),
            phone: uPhone.value.trim(),
            address: uAddy.value.trim()
        };

        try {
            var updated = await ApiService.updateProfile(profileData);
            if (updated) {
                localStorage.setItem('user', JSON.stringify(updated));
                currentUser = updated;
                updateProfileUI();

                var modal = document.querySelector('.modal');
                var updCont = document.querySelector('.upd-suc-cont');
                if (updCont) {
                    updCont.classList.add('active');
                    if (modal) modal.classList.add('active');
                }
            }
        } catch (error) {
            alert('Failed to update profile. Please try again.');
        }
    });
}

async function fetchBusinesses() {
    try {
        businesses = await ApiService.getBusinesses();
        createCard();
    } catch (error) {
        var container = document.querySelector('.card-container');
        if (container) {
            container.textContent = 'Failed to load businesses. Please try again later.';
        }
    }
}

function setupUI() {
    // Desktop profile dropdown (inside .profile-block, not the mobile nav one)
    var profSummary = document.querySelector('.profile-block .prof-summary');
    if (profSummary) {
        profSummary.addEventListener('click', function (e) {
            e.stopPropagation();
            profSummary.classList.toggle('active');
        });
    }

    // Mobile profile dropdown
    var profSummary2 = document.querySelector('.prof-summary2');
    if (profSummary2) {
        profSummary2.addEventListener('click', function (e) {
            e.stopPropagation();
            profSummary2.classList.toggle('active');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
        if (profSummary) profSummary.classList.remove('active');
        if (profSummary2) profSummary2.classList.remove('active');
    });

    // Logout buttons (there can be multiple — desktop + mobile)
    var logOutBtns = document.querySelectorAll('.user-log-out-btn');
    logOutBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.assign('/index.html');
        });
    });

    // Notification bell — navigate to booking history
    var notiBell = document.querySelector('.noti-block-cont');
    if (notiBell) {
        notiBell.style.cursor = 'pointer';
        notiBell.addEventListener('click', function () {
            window.location.assign('/Customer/Dashboard/history.html');
        });
    }

    // Mobile nav toggle
    var bar = document.querySelector('.bar-tog');
    var nav = document.querySelector('nav');
    if (bar && nav) {
        bar.addEventListener('click', function () {
            nav.classList.toggle('active');
            bar.classList.toggle('fa-xmark');
            bar.classList.toggle('fa-bars');
        });
    }

    // Search filter for services page
    var searchInput = document.querySelector('.search-area input');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            var term = e.target.value.toLowerCase();
            var filtered = businesses.filter(function (b) {
                var name = (b.name || '').toLowerCase();
                var company = (b.companyName || '').toLowerCase();
                return name.includes(term) || company.includes(term);
            });
            createCard(filtered);
        });
    }
}

function safeText(str) {
    if (!str) return '';
    return String(str);
}

function createCard(data) {
    if (!data) data = businesses;
    var container = document.querySelector('.card-container');
    if (!container) return;

    container.textContent = '';

    if (data.length === 0) {
        var noMsg = document.createElement('p');
        noMsg.textContent = 'No businesses found.';
        container.appendChild(noMsg);
        return;
    }

    data.forEach(function (buss) {
        var card = document.createElement('div');
        card.className = 'card';

        var cardImg = document.createElement('div');
        cardImg.className = 'card-img';

        var img = document.createElement('img');
        img.src = buss.image || '/Images/img6.png';
        img.alt = safeText(buss.name);

        var loveIcon = document.createElement('div');
        loveIcon.className = 'love-icon';
        var heartI = document.createElement('i');
        heartI.className = 'fa-regular fa-heart';
        loveIcon.appendChild(heartI);

        cardImg.appendChild(img);
        cardImg.appendChild(loveIcon);

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var namePrice = document.createElement('div');
        namePrice.className = 'card-name-price';

        var companyH2 = document.createElement('h2');
        companyH2.className = 'business-name';
        companyH2.textContent = safeText(buss.companyName || buss.name + "'s Services");

        var priceH2 = document.createElement('h2');
        priceH2.className = 'price';
        priceH2.textContent = '$50/hr';

        namePrice.appendChild(companyH2);
        namePrice.appendChild(priceH2);

        var nameP = document.createElement('p');
        nameP.className = 'name';
        nameP.textContent = safeText(buss.name);

        var ratingDiv = document.createElement('div');
        ratingDiv.className = 'card-rating';
        var starI = document.createElement('i');
        starI.className = 'fa-solid fa-star';
        var ratingP = document.createElement('p');
        ratingP.textContent = (buss.rating || '5.0') + ' (' + (buss.reviewCount || '10') + ' reviews)';
        ratingDiv.appendChild(starI);
        ratingDiv.appendChild(ratingP);

        var btnCont = document.createElement('div');
        btnCont.className = 'card-btn-cont';
        var bookBtn = document.createElement('button');
        bookBtn.className = 'card-btn';
        bookBtn.textContent = 'Book Now';
        var bussId = buss._id || buss.id;
        bookBtn.addEventListener('click', function () {
            showBookPage(bussId);
        });
        btnCont.appendChild(bookBtn);

        cardBody.appendChild(namePrice);
        cardBody.appendChild(nameP);
        cardBody.appendChild(ratingDiv);
        cardBody.appendChild(btnCont);

        card.appendChild(cardImg);
        card.appendChild(cardBody);

        container.appendChild(card);
    });
}

function showBookPage(bussId, bizData) {
    // bizData can be passed directly (e.g. from landing page cards where global businesses[] is not populated)
    var selected = bizData || businesses.find(function (b) {
        return (b._id || b.id) === bussId;
    });
    if (selected) {
        localStorage.setItem('bookBuss', JSON.stringify(selected));
        window.location.assign('/Customer/Booking/booking.html');
    }
}

window.showBookPage = showBookPage;

function setupBookingPage() {
    var bookBuss = null;
    try {
        bookBuss = JSON.parse(localStorage.getItem('bookBuss'));
    } catch (e) {
        bookBuss = null;
    }

    var formContainer = document.querySelector('.buss-sum-view');

    if (!bookBuss) {
        alert('No business selected');
        window.location.assign('/Customer/index.html');
        return;
    }

    if (formContainer) {
        formContainer.textContent = '';

        var sumImg = document.createElement('div');
        sumImg.className = 'sum-img';
        var imgEl = document.createElement('img');
        imgEl.src = bookBuss.image || '/Images/img6.png';
        imgEl.alt = safeText(bookBuss.name);
        sumImg.appendChild(imgEl);

        var sumDet = document.createElement('div');
        sumDet.className = 'sum-det';

        var h2 = document.createElement('h2');
        h2.textContent = safeText(bookBuss.companyName || bookBuss.name);

        var addrP = document.createElement('p');
        addrP.textContent = safeText(bookBuss.address || 'Location varies');

        var ratingDiv = document.createElement('div');
        ratingDiv.className = 'sum-rating';
        var star = document.createElement('i');
        star.className = 'fa-solid fa-star';
        var rP = document.createElement('p');
        rP.textContent = '5.0 (20 reviews)';
        ratingDiv.appendChild(star);
        ratingDiv.appendChild(rP);

        sumDet.appendChild(h2);
        sumDet.appendChild(addrP);
        sumDet.appendChild(ratingDiv);

        formContainer.appendChild(sumImg);
        formContainer.appendChild(sumDet);
    }

    var businessId = bookBuss._id || bookBuss.id;

    // Initialize calendar, time picker, and upload preview
    setupCalendar(businessId);
    setupTimePicker();
    setupUploadPreview();

    var retBtn = document.querySelector('.ret-btn');
    if (retBtn) {
        retBtn.addEventListener('click', function () {
            window.history.back();
        });
    }

    var bookForm = document.getElementById('book-form');
    if (bookForm) {
        bookForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            var token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to book');
                window.location.assign('/index.html');
                return;
            }

            var dateVal = document.getElementById('date-value');
            var timeVal = document.getElementById('time-value');

            if (!dateVal || !dateVal.value) {
                alert('Please select a date.');
                return;
            }
            if (!timeVal || !timeVal.value) {
                alert('Please enter a time.');
                return;
            }

            var submitBtn = bookForm.querySelector('.book-form-btn');
            var originalText = submitBtn ? submitBtn.textContent : 'Book';
            if (submitBtn) {
                submitBtn.textContent = 'Booking...';
                submitBtn.disabled = true;
            }

            var noteEl = document.getElementById('short-note');
            var budgetEl = document.getElementById('budget-price');
            var serviceEl = document.getElementById('service-type');
            var addressEl = document.getElementById('house-loacation');

            // Convert "HH:MM AM/PM" → 24-hour "HH:MM" required by API
            function toTime24(timeStr) {
                if (!timeStr) return '';
                var parts = timeStr.trim().split(' ');
                var hm = parts[0].split(':');
                var h = parseInt(hm[0], 10);
                var m = hm[1] || '00';
                var ampm = (parts[1] || '').toUpperCase();
                if (ampm === 'PM' && h !== 12) h += 12;
                if (ampm === 'AM' && h === 12) h = 0;
                return String(h).padStart(2, '0') + ':' + m;
            }

            // Build extra context into notes
            var notesParts = [];
            if (noteEl && noteEl.value.trim()) notesParts.push(noteEl.value.trim());
            if (budgetEl && budgetEl.value.trim()) notesParts.push('Budget: ' + budgetEl.value.trim());
            if (serviceEl && serviceEl.value && serviceEl.value !== 'select') notesParts.push('Service type: ' + serviceEl.value.trim());
            if (addressEl && addressEl.value.trim()) notesParts.push('Address: ' + addressEl.value.trim());

            var payload = {
                business: businessId,
                date: dateVal.value,
                startTime: toTime24(timeVal.value),
                notes: notesParts.join(' | ')
            };

            try {
                await ApiService.createBooking(payload);

                var successModal = document.querySelector('.book-suc-cont');
                var modalOverlay = document.querySelector('.modal');
                if (successModal) {
                    successModal.style.display = 'flex';
                    successModal.classList.add('active');
                    if (modalOverlay) modalOverlay.classList.add('active');

                    var doneBtn = document.querySelector('.suc-done');
                    if (doneBtn) {
                        doneBtn.addEventListener('click', function () {
                            window.location.assign('/Customer/Dashboard/history.html');
                        });
                    }
                } else {
                    alert('Booking Successful!');
                    window.location.assign('/Customer/Dashboard/history.html');
                }
            } catch (error) {
                var msg = 'Booking failed. Please try again.';
                if (error && error.message) msg = error.message;
                alert(msg);
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
}

// =====================
// CALENDAR
// =====================
function setupCalendar(businessId) {
    var calContainer = document.querySelector('.week-date-cont');
    var monthYearLabel = document.querySelector('.month-year');
    var prevBtn = document.getElementById('prev-month');
    var nextBtn = document.querySelector('.next-month');
    var dateHidden = document.getElementById('date-value');

    if (!calContainer || !monthYearLabel) return;

    var today = new Date();
    var calMonth = today.getMonth();
    var calYear = today.getFullYear();
    var selectedDateStr = '';

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    function renderCalendar() {
        calContainer.textContent = '';
        monthYearLabel.textContent = monthNames[calMonth] + ' ' + calYear;

        var firstDay = new Date(calYear, calMonth, 1).getDay();
        var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

        // Empty cells for days before the 1st
        for (var e = 0; e < firstDay; e++) {
            var empty = document.createElement('div');
            calContainer.appendChild(empty);
        }

        for (var d = 1; d <= daysInMonth; d++) {
            var dateObj = new Date(calYear, calMonth, d);
            var dateStr = calYear + '-' +
                String(calMonth + 1).padStart(2, '0') + '-' +
                String(d).padStart(2, '0');

            var isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());

            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'cal-date';
            radio.id = 'date-' + dateStr;
            radio.value = dateStr;
            if (isPast) radio.disabled = true;
            if (dateStr === selectedDateStr) radio.checked = true;

            var label = document.createElement('label');
            label.htmlFor = 'date-' + dateStr;
            label.textContent = d;

            radio.addEventListener('change', (function (ds) {
                return function () {
                    selectedDateStr = ds;
                    if (dateHidden) dateHidden.value = ds;
                    fetchSlotsForDate(businessId, ds);
                };
            })(dateStr));

            calContainer.appendChild(radio);
            calContainer.appendChild(label);
        }
    }

    function fetchSlotsForDate(bId, dateStr) {
        var slotsContainer = document.querySelector('.time-slots-container');
        if (!slotsContainer) return;

        slotsContainer.textContent = 'Loading available slots...';

        if (typeof ApiService !== 'undefined' && ApiService.checkAvailability) {
            ApiService.checkAvailability(bId, dateStr)
                .then(function (slots) {
                    renderTimeSlots(slots, slotsContainer);
                })
                .catch(function () {
                    slotsContainer.textContent = 'Could not load available slots.';
                });
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            calMonth--;
            if (calMonth < 0) { calMonth = 11; calYear--; }
            renderCalendar();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            calMonth++;
            if (calMonth > 11) { calMonth = 0; calYear++; }
            renderCalendar();
        });
    }

    renderCalendar();
}

// =====================
// TIME PICKER
// =====================
function setupTimePicker() {
    var hourEl = document.getElementById('hour');
    var minuteEl = document.getElementById('minute');
    var timeHidden = document.getElementById('time-value');
    var amRadio = document.getElementById('am');
    var pmRadio = document.getElementById('pm');

    if (!hourEl || !minuteEl) return;

    function numericOnly(input, min, max) {
        input.addEventListener('input', function () {
            var val = input.value.replace(/[^0-9]/g, '');
            if (val.length > 2) val = val.slice(0, 2);
            var num = parseInt(val, 10);
            if (!isNaN(num)) {
                if (num > max) val = String(max);
                if (num < min && val.length === 2) val = String(min).padStart(2, '0');
            }
            input.value = val;
            updateTimeValue();
        });

        input.addEventListener('blur', function () {
            var num = parseInt(input.value, 10);
            if (isNaN(num) || num < min) {
                input.value = '';
            } else {
                input.value = String(num).padStart(2, '0');
            }
            updateTimeValue();
        });
    }

    function updateTimeValue() {
        if (!timeHidden) return;
        var h = hourEl.value;
        var m = minuteEl.value;
        if (!h || !m) { timeHidden.value = ''; return; }
        var ampm = (pmRadio && pmRadio.checked) ? 'PM' : 'AM';
        timeHidden.value = h.padStart(2, '0') + ':' + m.padStart(2, '0') + ' ' + ampm;
    }

    numericOnly(hourEl, 1, 12);
    numericOnly(minuteEl, 0, 59);

    if (amRadio) amRadio.addEventListener('change', updateTimeValue);
    if (pmRadio) pmRadio.addEventListener('change', updateTimeValue);
}

// =====================
// UPLOAD PREVIEW
// =====================
function setupUploadPreview() {
    var fileInput = document.getElementById('sample-upload');
    var uploadLabel = document.querySelector('.sample-upload');
    var uploadText = document.querySelector('.sample-up-text');

    if (!fileInput || !uploadLabel) return;

    fileInput.addEventListener('change', function () {
        var file = fileInput.files[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                uploadLabel.style.backgroundImage = "url('" + e.target.result + "')";
                if (uploadText) uploadText.classList.add('active');
            };
            reader.readAsDataURL(file);
        } else {
            // Non-image file — just show filename
            if (uploadText) {
                uploadText.textContent = file.name;
            }
        }
    });
}

function renderTimeSlots(slots, container) {
    if (!container) return;
    container.textContent = '';

    if (!slots || slots.length === 0) {
        var noSlots = document.createElement('p');
        noSlots.textContent = 'No available slots for this date.';
        container.appendChild(noSlots);
        return;
    }

    slots.forEach(function (slot) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot-btn';

        var slotTime = slot.time || slot.startTime || slot;
        btn.textContent = safeText(String(slotTime));

        if (slot.available === false) {
            btn.disabled = true;
            btn.classList.add('slot-unavailable');
        } else {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.time-slot-btn.selected').forEach(function (el) {
                    el.classList.remove('selected');
                });
                btn.classList.add('selected');
            });
        }

        container.appendChild(btn);
    });
}

// =====================
// LANDING PAGE DATA
// =====================
async function fetchLandingPageData() {
    var topCont = document.querySelector('.top-rate-cont');
    var recentCont = document.querySelector('.recent-cont');
    var recommendCont = document.querySelector('.recommend-cont');

    if (!topCont && !recentCont && !recommendCont) return;

    try {
        if (typeof ApiService === 'undefined' || !ApiService.getBusinesses) {
            return; // api-service.js not loaded, leave sections empty
        }

        var allBiz = await ApiService.getBusinesses();
        if (!allBiz || allBiz.length === 0) return;

        // Split businesses among the three sections
        var topRated = allBiz.slice(0, Math.min(4, allBiz.length));
        var recent = allBiz.slice(0, Math.min(4, allBiz.length)).reverse();
        var recommended = allBiz.slice(0, Math.min(4, allBiz.length));

        if (topCont) renderLandingCards(topRated, topCont);
        if (recentCont) renderLandingCards(recent, recentCont);
        if (recommendCont) renderLandingCards(recommended, recommendCont);
    } catch (err) {
        // Silently fail — sections just stay empty
    }
}

function renderLandingCards(items, container) {
    container.textContent = '';

    items.forEach(function (biz) {
        var card = document.createElement('div');
        card.className = 'top-rev-item';

        var imgSrc = biz.image || '/Images/img6.png';
        var name = safeText(biz.companyName || biz.name || 'Business');
        var address = safeText(biz.address || 'Location varies');
        var category = safeText(biz.category || biz.serviceType || 'General Services');
        var availability = safeText(biz.availability || 'Mon - Sat');
        var hours = safeText(biz.hours || '9:00 AM - 5:00 PM');
        var rating = biz.rating || '5.0';
        var minPrice = biz.minPrice || biz.price || '20';
        var maxPrice = biz.maxPrice || '100';
        var bussId = biz._id || biz.id;

        // Build card header
        var topHeader = document.createElement('div');
        topHeader.className = 'top-header';
        var img = document.createElement('img');
        img.src = imgSrc;
        img.alt = name;
        topHeader.appendChild(img);

        var heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 8.69C22 10.66 21.49 12.4 20.69 13.91C19.81 12.98 18.57 12.4 17.2 12.4C14.55 12.4 12.4 14.55 12.4 17.2C12.4 18.43 12.87 19.55 13.63 20.4C13.26 20.57 12.92 20.71 12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.37 3.1 10.99 3.98 12 5.33C13.01 3.98 14.63 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69Z" stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        topHeader.appendChild(heart);

        // Build card body
        var topBody = document.createElement('div');
        topBody.className = 'top-body';

        var nameH2 = document.createElement('h2');
        nameH2.className = 'bus-name';
        nameH2.textContent = name;

        var locDiv = document.createElement('div');
        locDiv.className = 'location';
        locDiv.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3.62 8.49C5.59 -0.17 18.42 -0.16 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39 20.54C5.63 17.88 2.47 13.57 3.62 8.49Z" stroke="#292D32" stroke-width="1.5"/><path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var locP = document.createElement('p');
        locP.className = 'top-rev-text';
        locP.textContent = address;
        locDiv.appendChild(locP);

        var workDiv = document.createElement('div');
        workDiv.className = 'work-note';
        workDiv.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 13H15" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 17H12" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var workP = document.createElement('p');
        workP.className = 'top-rev-text';
        workP.textContent = category;
        workDiv.appendChild(workP);

        var dayDiv = document.createElement('div');
        dayDiv.className = 'day-cal';
        dayDiv.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.75 17.6H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var dayP = document.createElement('p');
        dayP.className = 'top-rev-text';
        dayP.textContent = availability;
        dayDiv.appendChild(dayP);

        var btcDiv = document.createElement('div');
        btcDiv.className = 'book-time-cont';
        var btDiv = document.createElement('div');
        btDiv.className = 'book-time';
        btDiv.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var btP = document.createElement('p');
        btP.className = 'top-rev-text';
        btP.textContent = hours;
        btDiv.appendChild(btP);

        var rateDiv = document.createElement('div');
        rateDiv.className = 'rate-cont';
        rateDiv.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M10.3 2.63L11.62 5.27C11.8 5.64 12.28 5.99 12.68 6.06L15.08 6.46C16.61 6.71 16.97 7.82 15.86 8.92L14 10.78C13.69 11.09 13.52 11.7 13.61 12.14L14.15 14.44C14.57 16.26 13.6 16.97 11.99 16.01L9.74 14.69C9.34 14.45 8.67 14.45 8.26 14.69L6.02 16.01C4.41 16.97 3.44 16.25 3.86 14.44L4.39 12.14C4.49 11.7 4.31 11.09 4 10.78L2.14 8.92C1.04 7.82 1.4 6.71 2.93 6.46L5.32 6.06C5.72 5.99 6.2 5.64 6.38 5.27L7.7 2.63C8.42 1.2 9.59 1.2 10.3 2.63Z" fill="#FBC02D"/></svg>';
        var rateP = document.createElement('p');
        rateP.className = 'top-rev-text';
        rateP.textContent = rating;
        rateDiv.appendChild(rateP);

        btcDiv.appendChild(btDiv);
        btcDiv.appendChild(rateDiv);

        topBody.appendChild(nameH2);
        topBody.appendChild(locDiv);
        topBody.appendChild(workDiv);
        topBody.appendChild(dayDiv);
        topBody.appendChild(btcDiv);

        // Build card footer
        var topFooter = document.createElement('div');
        topFooter.className = 'top-footer';

        var fromP = document.createElement('p');
        fromP.className = 'rev-range';
        fromP.textContent = 'From';
        var priceDiv = document.createElement('div');
        priceDiv.className = 'price-range';
        priceDiv.textContent = '$' + minPrice + ' - $' + maxPrice;
        var perP = document.createElement('p');
        perP.className = 'rev-range';
        perP.textContent = 'Per Person';

        var exploreBtn = document.createElement('a');
        exploreBtn.className = 'log-rev';
        exploreBtn.textContent = 'Explore / Book';
        exploreBtn.href = '#';
        exploreBtn.addEventListener('click', (function(id, data) {
            return function (ev) {
                ev.preventDefault();
                showBookPage(id, data);
            };
        })(bussId, biz));

        topFooter.appendChild(fromP);
        topFooter.appendChild(priceDiv);
        topFooter.appendChild(perP);
        topFooter.appendChild(exploreBtn);

        card.appendChild(topHeader);
        card.appendChild(topBody);
        card.appendChild(topFooter);

        container.appendChild(card);
    });
}
