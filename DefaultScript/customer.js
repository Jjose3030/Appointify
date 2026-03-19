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
            el.textContent = '';
        } else {
            el.style.backgroundImage = 'none';
            var initial = currentUser.name ? currentUser.name.trim().charAt(0) : 'U';
            el.textContent = initial;
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
        var fetchedBusinesses = await ApiService.getBusinesses();
        businesses = sortBusinessesLatestToOldest(fetchedBusinesses);
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

function sortBusinessesLatestToOldest(items) {
    if (!Array.isArray(items)) return [];

    return items.slice().sort(function (a, b) {
        var aDate = new Date(a && a.createdAt ? a.createdAt : 0).getTime();
        var bDate = new Date(b && b.createdAt ? b.createdAt : 0).getTime();
        return bDate - aDate;
    });
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
        img.src = buss.image || (buss.images && buss.images[0] && buss.images[0].url) || '/Images/img6.png';
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
        if (buss.minPrice != null && buss.maxPrice != null) {
            priceH2.textContent = '$' + buss.minPrice + ' - $' + buss.maxPrice + '/hr';
        } else if (buss.minPrice != null) {
            priceH2.textContent = 'From $' + buss.minPrice + '/hr';
        } else {
            priceH2.textContent = 'Contact for pricing';
        }

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

function showBookPage(bussId) {
    if (!bussId) return;
    window.location.assign('/Customer/Booking/booking.html?businessId=' + encodeURIComponent(bussId));
}

window.showBookPage = showBookPage;

function setupBookingPage() {
    var params     = new URLSearchParams(window.location.search);
    var businessId = params.get('businessId');

    if (!businessId) {
        alert('No business selected');
        window.location.assign('/Customer/index.html');
        return;
    }

    var formContainer = document.querySelector('.buss-sum-view');
    var businessInput = document.getElementById('business-id');
    if (businessInput) businessInput.value = businessId;

    // Show a loading skeleton while we fetch
    if (formContainer) {
        formContainer.innerHTML = '<p style="padding:16px;color:#666">Loading business info…</p>';
    }

    // Fetch business data fresh from the API — no localStorage needed
    ApiService.getBusinessById(businessId).then(function (raw) {
        // Normalise: API may wrap the object in { business: {...} } or { data: {...} }
        var bookBuss = (raw && raw.business) ? raw.business
            : (raw && raw.data)     ? raw.data
            : raw;

        if (!bookBuss || !(bookBuss._id || bookBuss.id)) {
            if (formContainer) formContainer.innerHTML = '<p style="padding:16px;color:#c00">Business not found.</p>';
            return;
        }

        // ── Business banner + info ──────────────────────────────────────────
        if (formContainer) {
            formContainer.textContent = '';

            var imgSrc = bookBuss.image ||
                (bookBuss.images && bookBuss.images[0] && bookBuss.images[0].url) ||
                '/Images/img6.png';

            var bannerDiv = document.createElement('div');
            bannerDiv.className = 'buss-banner';
            bannerDiv.style.backgroundImage = "url('" + imgSrc + "')";
            var bannerOverlay = document.createElement('div');
            bannerOverlay.className = 'buss-banner-overlay';
            bannerDiv.appendChild(bannerOverlay);

            var infoDiv = document.createElement('div');
            infoDiv.className = 'buss-info-block';

            var h2 = document.createElement('h2');
            h2.className = 'buss-info-name';
            h2.textContent = safeText(bookBuss.companyName || bookBuss.name);

            var addrP = document.createElement('p');
            addrP.className = 'buss-info-addr';
            addrP.innerHTML = '<i class="fa-solid fa-location-dot"></i> ' + safeText(bookBuss.address || 'Location varies');

            var ratingDiv = document.createElement('div');
            ratingDiv.className = 'buss-info-rating';
            var star = document.createElement('i');
            star.className = 'fa-solid fa-star';
            var rP = document.createElement('span');
            rP.textContent = ' ' + (bookBuss.rating || '5.0') + ' (' + (bookBuss.reviewCount || '20') + ' reviews)';
            ratingDiv.appendChild(star);
            ratingDiv.appendChild(rP);

            var priceDiv = document.createElement('div');
            priceDiv.className = 'buss-info-price';
            if (bookBuss.minPrice != null && bookBuss.maxPrice != null) {
                priceDiv.innerHTML = '<i class="fa-solid fa-tag"></i> $' + bookBuss.minPrice + ' &ndash; $' + bookBuss.maxPrice + ' / hr';
            } else if (bookBuss.minPrice != null) {
                priceDiv.innerHTML = '<i class="fa-solid fa-tag"></i> From $' + bookBuss.minPrice + ' / hr';
            } else {
                priceDiv.innerHTML = '<i class="fa-solid fa-tag"></i> Contact for pricing';
            }

            infoDiv.appendChild(h2);
            infoDiv.appendChild(addrP);
            infoDiv.appendChild(ratingDiv);
            infoDiv.appendChild(priceDiv);
            formContainer.appendChild(bannerDiv);
            formContainer.appendChild(infoDiv);
        }

        // ── Gallery ─────────────────────────────────────────────────────────
        var galCont = document.querySelector('.gal-cont');
        if (galCont) {
            var bizImages = Array.isArray(bookBuss.images) ? bookBuss.images : [];
            if (bizImages.length > 0) {
                galCont.textContent = '';
                bizImages.forEach(function (item) {
                    var src = typeof item === 'string' ? item : item.url;
                    if (!src) return;
                    var div = document.createElement('div');
                    div.className = 'gal-cont-item';
                    var img = document.createElement('img');
                    img.src = src;
                    img.alt = 'Gallery photo';
                    div.appendChild(img);
                    galCont.appendChild(div);
                });
            }
        }

        // ── Wire up selectors, upload preview, back button, form ────────────
        setupBookingSelectors(businessId, bookBuss);
        setupUploadPreview();

        var retBtn = document.querySelector('.ret-btn');
        if (retBtn) {
            retBtn.removeEventListener('click', retBtn._handler || function(){});
            retBtn._handler = function () { window.history.back(); };
            retBtn.addEventListener('click', retBtn._handler);
        }

        wireBookingForm(businessId, bookBuss);

    }).catch(function (err) {
        if (formContainer) {
            formContainer.innerHTML = '<p style="padding:16px;color:#c00">Could not load business. Please go back and try again.</p>';
        }
    });
}

function wireBookingForm(businessId, bookBuss) {

    var bookForm = document.getElementById('book-form');
    if (!bookForm) return;

    bookForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            var token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to book');
                window.location.assign('/index.html');
                return;
            }

            var dateEl = document.getElementById('date-picker');
            var timeEl = document.getElementById('start-time');
            var selectedDate = dateEl ? dateEl.value : '';
            var selectedTime = timeEl ? normalizeTimeTo24(timeEl.value) : '';

            if (!selectedDate) {
                alert('Please select a booking date.');
                return;
            }
            if (!selectedTime) {
                alert('Please select a valid start time (HH:mm).');
                return;
            }

            if (!isBusinessDayAvailable(selectedDate, bookBuss)) {
                alert('Please choose a date that falls on the business available days.');
                return;
            }

            var submitBtn = bookForm.querySelector('.book-form-btn');
            var originalText = submitBtn ? submitBtn.textContent : 'Book';
            if (submitBtn) {
                submitBtn.textContent = 'Booking...';
                submitBtn.disabled = true;
            }

            var noteEl    = document.getElementById('short-note');
            var budgetEl  = document.getElementById('budget-price');
            var serviceEl = document.getElementById('service-type');
            var phoneEl   = document.getElementById('phone');
            var locationEl = document.getElementById('location');
            var addressEl = document.getElementById('house-loacation');
            var sampleEl  = document.getElementById('sample-upload');

            var note = noteEl ? noteEl.value.trim() : '';
            var budget = budgetEl ? budgetEl.value.trim() : '';
            var serviceType = (serviceEl && serviceEl.value && serviceEl.value !== 'select') ? serviceEl.value.trim() : '';
            var phone = phoneEl ? phoneEl.value.trim() : '';
            var location = locationEl ? locationEl.value.trim() : '';
            var addressDirection = addressEl ? addressEl.value.trim() : '';
            var sampleFile = (sampleEl && sampleEl.files && sampleEl.files[0]) ? sampleEl.files[0] : null;

            if (!serviceType) {
                alert('Please select a service type.');
                if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
                return;
            }
            if (!phone) {
                alert('Please enter your phone number.');
                if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
                return;
            }
            if (!location) {
                alert('Please enter your location.');
                if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
                return;
            }

            try {
                var payload = {
                    business: businessId,
                    date: selectedDate,
                    startTime: selectedTime,
                    note: note,
                    serviceType: serviceType,
                    phone: phone,
                    location: location,
                    addressDirection: addressDirection || '',
                    budget: budget || ''
                };
                if (sampleFile) payload.sample = sampleFile;

                var availableTimes = await getAvailableSlotsForDate(businessId, selectedDate);
                if (availableTimes.length > 0 && availableTimes.indexOf(selectedTime) === -1) {
                    alert('Selected time is not available for that date. Pick one of the available slots.');
                    if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
                    return;
                }

                var detailsText = 'Date: ' + selectedDate + ' \u2022 Time: ' + selectedTime;

                var bookingResult = await ApiService.createBooking(payload);
                var newBookingId  = bookingResult && (bookingResult.id || bookingResult._id
                    || (bookingResult.booking && (bookingResult.booking.id || bookingResult.booking._id)));

                var successModal  = document.querySelector('.book-suc-cont');
                var modalOverlay  = document.querySelector('.modal');
                var successDetails = document.getElementById('book-suc-details');
                if (successModal) {
                    successModal.style.display = 'flex';
                    successModal.classList.add('active');
                    if (modalOverlay) modalOverlay.classList.add('active');
                    if (successDetails) successDetails.textContent = detailsText;

                    var existingMsgBtn = successModal.querySelector('.suc-msg-btn');
                    if (existingMsgBtn) existingMsgBtn.remove();
                    if (newBookingId) {
                        var msgBtn = document.createElement('button');
                        msgBtn.className = 'suc-msg-btn';
                        msgBtn.textContent = '\uD83D\uDCAC Message Business';
                        msgBtn.onclick = function () {
                            window.location.assign('/Customer/Dashboard/message.html?bookingId=' + newBookingId);
                        };
                        var doneBtn2 = successModal.querySelector('.suc-done');
                        if (doneBtn2) successModal.insertBefore(msgBtn, doneBtn2);
                        else successModal.appendChild(msgBtn);
                    }

                    var doneBtn = document.querySelector('.suc-done');
                    if (doneBtn) {
                        doneBtn.onclick = function () {
                            window.location.assign('/Customer/Dashboard/history.html');
                        };
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


/**
 * Generate time slots client-side from a business's workingHours + slotDuration.
 * Used as a fallback when the availability API returns open:true but empty slots
 * (i.e., no bookings exist for that date yet — all slots are free).
 *
 * Returns an array like [{ startTime, endTime, available: true }, ...]
 * or null if the business is not open on that day.
 */
function generateSlotsFromBusinessData(dateStr, businessData) {
    if (!businessData || !dateStr) return null;

    var DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var d = new Date(dateStr + 'T00:00:00'); // parse as local date
    var dayKey = DAY_NAMES[d.getDay()];

    var wh = businessData.workingHours;
    var openTime  = null;
    var closeTime = null;

    if (wh && typeof wh === 'object' && !Array.isArray(wh)) {
        // Object format: { monday: { open, close, enabled }, ... }
        var dayEntry = wh[dayKey];
        if (!dayEntry || !dayEntry.enabled) return null; // not open
        openTime  = dayEntry.open  || '09:00';
        closeTime = dayEntry.close || '17:00';
    } else if (typeof wh === 'string' && wh.trim()) {
        // Legacy string like "09:00-17:00" — treat every day as open
        var parts = wh.trim().split('-');
        openTime  = (parts[0] || '09:00').trim();
        closeTime = (parts[1] || '17:00').trim();
    } else {
        return null;
    }

    var duration = (businessData.slotDuration && parseInt(businessData.slotDuration, 10)) || 30;

    // Convert HH:MM to total minutes
    function toMins(t) {
        var p = String(t || '').split(':');
        return parseInt(p[0] || 0, 10) * 60 + parseInt(p[1] || 0, 10);
    }
    function toTime(mins) {
        return String(Math.floor(mins / 60)).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
    }

    var start = toMins(openTime);
    var end   = toMins(closeTime);
    var slots = [];

    while (start + duration <= end) {
        slots.push({
            startTime: toTime(start),
            endTime:   toTime(start + duration),
            available: true
        });
        start += duration;
    }

    return slots.length > 0 ? slots : null;
}

function setupBookingSelectors(businessId, businessData) {
    var datePicker = document.getElementById('date-picker');
    var slotsContainer = document.querySelector('.time-slots-container');
    var timeInput = document.getElementById('start-time');
    var workingHoursHint = document.getElementById('working-hours-hint');

    if (workingHoursHint) {
        var wh = businessData && businessData.workingHours;
        var readableHours = '';
        if (wh && typeof wh === 'object' && !Array.isArray(wh)) {
            // New object format: { monday: { open, close, enabled }, ... }
            var enabledDays = Object.keys(wh).filter(function (k) { return wh[k] && wh[k].enabled; });
            if (enabledDays.length > 0) {
                var firstEntry = wh[enabledDays[0]];
                var lastEntry  = wh[enabledDays[enabledDays.length - 1]];
                var capitalize = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
                var dayPart = enabledDays.map(capitalize).join(', ');
                readableHours = dayPart + '  \u2022  ' +
                    (firstEntry.open || '?') + ' \u2013 ' + (lastEntry.close || '?');
            }
        } else if (typeof wh === 'string' && wh.trim()) {
            readableHours = wh.trim();
        }
        workingHoursHint.textContent = 'Working hours: ' + (readableHours || 'See business schedule');
    }

    if (datePicker) {
        var now = new Date();
        datePicker.min = now.toISOString().slice(0, 10);
    }

    setupInlineCalendar(datePicker, businessData);

    function clearSlotsHint(msg) {
        if (!slotsContainer) return;
        slotsContainer.textContent = '';
        if (!msg) return;
        var hint = document.createElement('p');
        hint.className = 'slot-hint';
        hint.textContent = msg;
        slotsContainer.appendChild(hint);
    }

    if (datePicker) {
        datePicker.addEventListener('change', async function () {
            if (!datePicker.value) {
                clearSlotsHint('');
                return;
            }

            clearSlotsHint('');
            try {
                var res = await ApiService.checkAvailability(businessId, datePicker.value);

                // Business explicitly closed on that day
                if (res && res.open === false) {
                    clearSlotsHint('');
                    return;
                }

                // Extract slots from whatever shape the API returns
                var slots;
                if (Array.isArray(res)) {
                    slots = res;
                } else if (res && Array.isArray(res.slots)) {
                    slots = res.slots;
                } else if (res && Array.isArray(res.availableSlots)) {
                    slots = res.availableSlots;
                } else if (res && Array.isArray(res.data)) {
                    slots = res.data;
                } else {
                    slots = [];
                }

                // If API returned open:true but no slots, the date likely has no
                // existing bookings yet — generate all slots client-side instead.
                if (slots.length === 0) {
                    var generated = generateSlotsFromBusinessData(datePicker.value, businessData);
                    if (generated && generated.length > 0) {
                        renderTimeSlots(generated, slotsContainer);
                        return;
                    }
                    // API said open:true but our local data also says closed — show message
                    clearSlotsHint('');
                    return;
                }

                renderTimeSlots(slots, slotsContainer);
            } catch (error) {
                // API failed — try generating slots locally as a graceful fallback
                var fallbackSlots = generateSlotsFromBusinessData(datePicker.value, businessData);
                if (fallbackSlots && fallbackSlots.length > 0) {
                    renderTimeSlots(fallbackSlots, slotsContainer);
                } else {
                    clearSlotsHint('');
                }
            }
        });
    }

    if (timeInput) {
        timeInput.addEventListener('input', function () {
            document.querySelectorAll('.time-slot-btn.selected').forEach(function (btn) {
                btn.classList.remove('selected');
            });
        });
    }
}

function setupInlineCalendar(datePicker, businessData) {
    if (!datePicker) return;

    var calContainer = document.querySelector('.week-date-cont');
    var monthYearLabel = document.querySelector('.month-year');
    var prevBtn = document.getElementById('prev-month');
    var nextBtn = document.getElementById('next-month');

    if (!calContainer || !monthYearLabel || !prevBtn || !nextBtn) return;

    var today = new Date();
    var calMonth = today.getMonth();
    var calYear = today.getFullYear();

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    function renderCalendar() {
        calContainer.textContent = '';
        monthYearLabel.textContent = monthNames[calMonth] + ' ' + calYear;

        var selectedDateStr = datePicker.value || '';
        var firstDay = new Date(calYear, calMonth, 1).getDay();
        var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

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
            var isOpenDay = isBusinessDayAvailable(dateStr, businessData);

            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'cal-date';
            radio.id = 'date-' + dateStr;
            radio.value = dateStr;
            radio.disabled = isPast || !isOpenDay;
            if (dateStr === selectedDateStr) radio.checked = true;

            var label = document.createElement('label');
            label.htmlFor = 'date-' + dateStr;
            label.textContent = d;
            label.className = isOpenDay ? 'available-day' : 'unavailable-day';

            radio.addEventListener('change', function (ev) {
                datePicker.value = ev.target.value;
                datePicker.dispatchEvent(new Event('change', { bubbles: true }));
            });

            calContainer.appendChild(radio);
            calContainer.appendChild(label);
        }
    }

    prevBtn.addEventListener('click', function () {
        calMonth--;
        if (calMonth < 0) { calMonth = 11; calYear--; }
        renderCalendar();
    });

    nextBtn.addEventListener('click', function () {
        calMonth++;
        if (calMonth > 11) { calMonth = 0; calYear++; }
        renderCalendar();
    });

    datePicker.addEventListener('change', renderCalendar);
    renderCalendar();
}

function getEnabledBusinessDays(businessData) {
    var wh = businessData && businessData.workingHours;
    var enabledDays = [];

    if (wh && typeof wh === 'object' && !Array.isArray(wh)) {
        Object.keys(wh).forEach(function (dayName) {
            if (wh[dayName] && wh[dayName].enabled) {
                enabledDays.push(dayName.toLowerCase());
            }
        });
    }

    return enabledDays;
}

function isBusinessDayAvailable(dateStr, businessData) {
    if (!dateStr) return false;

    var enabledDays = getEnabledBusinessDays(businessData);
    if (enabledDays.length === 0) {
        return true;
    }

    var dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var date = new Date(dateStr + 'T00:00:00');
    var dayName = dayNames[date.getDay()];

    return enabledDays.indexOf(dayName) !== -1;
}

function normalizeTimeTo24(timeStr) {
    if (!timeStr) return '';

    var clean = String(timeStr).trim();
    var hhmm24 = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (hhmm24.test(clean)) return clean;

    var match12 = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match12) return '';

    var hour = parseInt(match12[1], 10);
    var minute = match12[2];
    var ampm = match12[3].toUpperCase();
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return String(hour).padStart(2, '0') + ':' + minute;
}

async function getAvailableSlotsForDate(businessId, dateStr, rawResponse) {
    if (!ApiService || !ApiService.checkAvailability) return [];

    var res = await ApiService.checkAvailability(businessId, dateStr);

    // Backend returns { open: false, slots: [], msg: "..." } when business is closed that day
    if (res && res.open === false) {
        var closedMsg = (res.msg) || 'Business is not open on that day';
        if (rawResponse) return { open: false, slots: [], msg: closedMsg };
        throw new Error(closedMsg);
    }

    var slots = Array.isArray(res) ? res
        : Array.isArray(res && res.slots) ? res.slots
        : Array.isArray(res && res.availableSlots) ? res.availableSlots
        : Array.isArray(res && res.data) ? res.data
        : [];

    if (rawResponse) return slots;

    // Return only available slots (for conflict-check during submit)
    return slots
        .filter(function (slot) {
            return !(slot && (slot.isAvailable === false || slot.available === false));
        })
        .map(function (slot) {
            return normalizeTimeTo24(slot && (slot.time || slot.startTime || slot));
        })
        .filter(Boolean);
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
        return;
    }

    var hasAvailable = slots.some(function (s) {
        return !(s && (s.isAvailable === false || s.available === false));
    });
    if (!hasAvailable) return;

    slots.forEach(function (slot) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot-btn';

        // Support both slot objects and plain time strings
        var slotTime = (typeof slot === 'object' && slot)
            ? (slot.startTime || slot.time)
            : slot;
        var isAvailable = !(slot && (slot.isAvailable === false || slot.available === false));

        btn.textContent = safeText(String(slotTime || ''));

        if (!isAvailable) {
            btn.disabled = true;
            btn.classList.add('slot-unavailable');
            btn.title = 'Already booked';
        } else {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.time-slot-btn.selected').forEach(function (el) {
                    el.classList.remove('selected');
                });
                btn.classList.add('selected');
                var startTime = document.getElementById('start-time');
                if (startTime) startTime.value = normalizeTimeTo24(String(slotTime));
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

        var sortedBiz = sortBusinessesLatestToOldest(allBiz);

        // Split businesses among the three sections
        var topRated = sortedBiz.slice(0, Math.min(4, sortedBiz.length));
        var recent = sortedBiz.slice(0, Math.min(4, sortedBiz.length));
        var recommended = sortedBiz.slice(0, Math.min(4, sortedBiz.length));

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

        var imgSrc = biz.image || (biz.images && biz.images[0] && biz.images[0].url) || '/Images/img6.png';
        var name = safeText(biz.companyName || biz.name || 'Business');
        var address = safeText(biz.address || 'Location varies');
        var category = safeText(biz.category || biz.serviceType || 'General Services');

        // Parse workingHours object format or fall back to legacy string
        var availability = 'Mon - Sat';
        var hours = '9:00 AM - 5:00 PM';
        var wh = biz.workingHours;
        if (wh && typeof wh === 'object' && !Array.isArray(wh)) {
            var enabledKeys = Object.keys(wh).filter(function (k) { return wh[k] && wh[k].enabled; });
            if (enabledKeys.length > 0) {
                var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1, 3); };
                availability = enabledKeys.map(cap).join(', ');
                var first = wh[enabledKeys[0]];
                var last  = wh[enabledKeys[enabledKeys.length - 1]];
                hours = (first.open || '9:00') + ' - ' + (last.close || '5:00');
            }
        } else if (typeof wh === 'string' && wh.trim()) {
            availability = wh.trim();
        } else if (biz.availability) {
            availability = safeText(biz.availability);
        }
        var rating = biz.rating || '5.0';
        var minPrice = biz.minPrice != null ? biz.minPrice : null;
        var maxPrice = biz.maxPrice != null ? biz.maxPrice : null;
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
        if (minPrice != null && maxPrice != null) {
            priceDiv.textContent = '$' + minPrice + ' - $' + maxPrice;
        } else if (minPrice != null) {
            priceDiv.textContent = 'From $' + minPrice;
        } else {
            priceDiv.textContent = 'Contact for pricing';
        }
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
