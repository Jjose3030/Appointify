'use strict';

// --- User Login ---
var userLogForm = document.getElementById('user-sign-in');
if (userLogForm) {
    var userLogEmail = document.getElementById('user-email');
    var userLogPassword = document.getElementById('user-password');

    userLogForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearError();

        var emailValue = userLogEmail.value;
        var passValue = userLogPassword.value;

        if (emailValue === '') {
            showError(userLogEmail, 'Field can not be left empty');
            return;
        }
        if (passValue === '') {
            showError(userLogPassword, 'Field can not be left empty');
            return;
        }

        try {
            var loader = document.querySelector('.loader');
            if (loader) loader.style.display = 'flex';

            var data = await ApiService.login({ email: emailValue, password: passValue });

            // Support server sending { requireOTP: true } or a message indicating OTP
            var msg = data.msg || data.message || '';
            if (data.requireOTP || data.requiresOTP || msg.toLowerCase().includes('otp')) {
                if (loader) loader.style.display = 'none';
                
                window.pendingOtpEmail = emailValue;
                window.pendingOtpRole = 'user';
                
                var modal = document.querySelector('.modal');
                var verifyCont = document.querySelector('.verify-cont');
                if (modal && verifyCont) {
                    modal.classList.add('active');
                    verifyCont.classList.add('active');
                    goToVerify('verify-item1');
                    var verContBtn = verifyCont.querySelector('.ver-cont');
                    if (verContBtn) {
                        verContBtn.onclick = function (e) { e.preventDefault(); goToVerify('verify-item2'); };
                    }
                }
                return;
            }

            if (!data.token) throw { message: 'Login failed: no token received.' };
            localStorage.setItem('token', data.token);

            var user = data.user || await ApiService.getCurrentUser();
            localStorage.setItem('user', JSON.stringify(user));

            if (loader) loader.style.display = 'none';

            if (user.role === 'business') {
                window.location.assign('../Business/index.html');
            } else {
                window.location.assign('../Customer/index.html');
            }

        } catch (error) {
            if (document.querySelector('.loader')) document.querySelector('.loader').style.display = 'none';
            var msg = 'Login failed. Please try again.';
            if (error && error.message) msg = error.message;
            showError(userLogPassword, msg);
        }
    });

    var showPass = userLogForm.querySelector('.show-pass');
    if (showPass) {
        showPass.addEventListener('click', function () {
            revPass(userLogPassword, showPass);
        });
    }
}

// --- Business Login ---
var bussLogForm = document.getElementById('buss-sign-in');
if (bussLogForm) {
    var bussLogEmail = document.getElementById('buss-email');
    var bussLogPassword = document.getElementById('buss-password');

    bussLogForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearError();

        var emailValue = bussLogEmail.value;
        var passValue = bussLogPassword.value;

        if (emailValue === '') {
            showError(bussLogEmail, 'Field can not be left empty');
            return;
        }
        if (passValue === '') {
            showError(bussLogPassword, 'Field can not be left empty');
            return;
        }

        try {
            var loader = document.querySelector('.loader');
            if (loader) loader.style.display = 'flex';

            var data = await ApiService.login({ email: emailValue, password: passValue });

            var msg = data.msg || data.message || '';
            if (data.requireOTP || data.requiresOTP || msg.toLowerCase().includes('otp')) {
                if (loader) loader.style.display = 'none';
                
                window.pendingOtpEmail = emailValue;
                window.pendingOtpRole = 'business';
                
                var modal = document.querySelector('.modal');
                var verifyCont = document.querySelector('.verify-cont');
                if (modal && verifyCont) {
                    modal.classList.add('active');
                    verifyCont.classList.add('active');
                    goToVerify('verify-item1');
                    var verContBtn = verifyCont.querySelector('.ver-cont');
                    if (verContBtn) {
                        verContBtn.onclick = function (e) { e.preventDefault(); goToVerify('verify-item2'); };
                    }
                }
                return;
            }

            if (!data.token) throw { message: 'Login failed: no token received.' };
            localStorage.setItem('token', data.token);

            var user = data.user || await ApiService.getCurrentUser();
            localStorage.setItem('user', JSON.stringify(user));

            if (loader) loader.style.display = 'none';

            if (user.role === 'user') {
                window.location.assign('../Customer/index.html');
            } else {
                window.location.assign('../Business/index.html');
            }

        } catch (error) {
            if (document.querySelector('.loader')) document.querySelector('.loader').style.display = 'none';
            var msg = 'Login failed. Please try again.';
            if (error && error.message) msg = error.message;
            showError(bussLogPassword, msg);
        }
    });

    var bShowPass = bussLogForm.querySelector('.show-pass');
    if (bShowPass) {
        bShowPass.addEventListener('click', function () {
            revPass(bussLogPassword, bShowPass);
        });
    }
}


// --- User Registration ---
var userSignForm = document.getElementById('user-sign-up');
if (userSignForm) {
    var userSignName = document.getElementById('user-name');
    var userSignEmail = document.getElementById('create-user-email');
    var userSignPassword = document.getElementById('create-user-password');
    var userConfirmPassword = document.getElementById('confirm-user-password');

    userSignForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearError();

        var username = userSignName.value;
        var userEmail = userSignEmail.value;
        var userPassword = userSignPassword.value;
        var userConPassword = userConfirmPassword.value;

        if (username.trim().length < 2) {
            showError(userSignName, 'Enter your full name');
            return;
        }
        if (!userEmail.includes('@')) {
            showError(userSignEmail, 'Invalid Email Address');
            return;
        }
        if (userPassword.length < 6) {
            showError(userSignPassword, 'Password must be at least 6 characters');
            return;
        }
        if (userPassword !== userConPassword) {
            showError(userConfirmPassword, 'Passwords do not match');
            return;
        }

        try {
            var loader = document.querySelector('.loader');
            if (loader) loader.style.display = 'flex';

            var data = await ApiService.register({
                name: username,
                email: userEmail,
                password: userPassword,
                role: 'user'
            });

            if (!data.token && !data.msg) throw { message: 'Registration failed: no successful response.' };

            // Wait until OTP is verified to store token
            // Store email for verification
            window.pendingOtpEmail = userEmail;
            window.pendingOtpRole = 'user';

            if (loader) loader.style.display = 'none';

            var modal = document.querySelector('.modal');
            var verifyCont = document.querySelector('.verify-cont');

            if (modal && verifyCont) {
                modal.classList.add('active');
                verifyCont.classList.add('active');
                
                if (typeof goToVerify === 'function') goToVerify('verify-item1'); // Start at first step

                // Bind continue button to go to next OTP entry step
                var verContBtn = document.querySelector('.ver-cont');
                if (verContBtn) {
                    verContBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        goToVerify('verify-item2');
                    });
                }
            } else {
                window.location.assign('../Customer/index.html');
            }

        } catch (error) {
            if (document.querySelector('.loader')) document.querySelector('.loader').style.display = 'none';
            var msg = 'Registration failed. Please try again.';
            if (error && error.message) msg = error.message;
            showError(userSignEmail, msg);
        }
    });

    var uShowPass = userSignForm.querySelector('.show-pass');
    if (uShowPass) uShowPass.addEventListener('click', function () { revPass(userSignPassword, uShowPass); });
    var uPassShow = userSignForm.querySelector('.show-pass-two');
    if (uPassShow) uPassShow.addEventListener('click', function () { revPass(userConfirmPassword, uPassShow); });
}


// --- Business Registration ---
var bussSignForm = document.getElementById('buss-sign-up');
if (bussSignForm) {
    var bussSignName = document.getElementById('buss-name');
    var companyName = document.getElementById('company-name');
    var bussSignEmail = document.getElementById('create-buss-email');
    var bussSignPassword = document.getElementById('create-buss-password');
    var bussConfirmPassword = document.getElementById('confirm-buss-password');

    bussSignForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearError();

        var bussname = bussSignName.value;
        var bussCompany = companyName.value;
        var bussEmail = bussSignEmail.value;
        var bussPassword = bussSignPassword.value;
        var bussConPassword = bussConfirmPassword.value;

        if (bussname.trim().length < 2) {
            showError(bussSignName, 'Enter full name');
            return;
        }
        if (bussCompany.trim().length < 2) {
            showError(companyName, 'Enter company name');
            return;
        }
        if (!bussEmail.includes('@')) {
            showError(bussSignEmail, 'Invalid Email');
            return;
        }
        if (bussPassword.length < 6) {
            showError(bussSignPassword, 'Password must be at least 6 characters');
            return;
        }
        if (bussPassword !== bussConPassword) {
            showError(bussConfirmPassword, 'Passwords do not match');
            return;
        }

        try {
            var loader = document.querySelector('.loader');
            if (loader) loader.style.display = 'flex';

            var data = await ApiService.register({
                name: bussname,
                email: bussEmail,
                password: bussPassword,
                role: 'business',
                companyName: bussCompany
            });

            if (!data.token && !data.msg) throw { message: 'Registration failed: no successful response.' };

            window.pendingOtpEmail = bussEmail;
            window.pendingOtpRole = 'business';

            if (loader) loader.style.display = 'none';

            var modal = document.querySelector('.modal');
            var verifyCont = document.querySelector('.verify-cont');

            if (modal && verifyCont) {
                modal.classList.add('active');
                verifyCont.classList.add('active');
                
                if (typeof goToVerify === 'function') goToVerify('verify-item1'); 

                var verContBtn = document.querySelector('.ver-cont');
                if (verContBtn) {
                    verContBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        goToVerify('verify-item2');
                    });
                }
            } else {
                window.location.assign('../Business/index.html');
            }

        } catch (error) {
            if (document.querySelector('.loader')) document.querySelector('.loader').style.display = 'none';
            var msg = 'Registration failed. Please try again.';
            if (error && error.message) msg = error.message;
            showError(bussSignEmail, msg);
        }
    });

    var bRegShowPass = bussSignForm.querySelector('.show-pass');
    if (bRegShowPass) bRegShowPass.addEventListener('click', function () { revPass(bussSignPassword, bRegShowPass); });
    var bRegPassShow = bussSignForm.querySelector('.show-pass-two');
    if (bRegPassShow) bRegPassShow.addEventListener('click', function () { revPass(bussConfirmPassword, bRegPassShow); });
}

// --- Common Functions ---

function revPass(input, icon) {
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showError(input, message) {
    var errorDiv = document.getElementById(input.id + '-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    input.classList.add('input-error');
}

function clearError() {
    var errors = document.querySelectorAll('.error');
    errors.forEach(function (err) { err.style.display = 'none'; });
    var inputs = document.querySelectorAll('input');
    inputs.forEach(function (inp) { inp.classList.remove('input-error'); });
}

// Reset Password Modal Logic
var resetCont = document.querySelector('.reset-cont');
var forgotBtns = document.querySelectorAll('.forgot');

forgotBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        var modal = document.querySelector('.modal');
        if (modal && resetCont) {
            modal.classList.add('active');
            resetCont.classList.add('active');
            modal.addEventListener('click', function () {
                modal.classList.remove('active');
                resetCont.classList.remove('active');
            });
        }
    });
});

// Missing goTo function used in HTML inline handlers (Login/Reset Logic)
window.goTo = function (targetId) {
    var items = document.querySelectorAll('.reset-item');
    items.forEach(function (item) {
        item.classList.remove('active');
    });
    var target = document.getElementById(targetId) || document.querySelector('.' + targetId);
    if (target) {
        target.classList.add('active');
    }
};

// Function for traversing registration modal steps
window.goToVerify = function (targetClass) {
    var items = document.querySelectorAll('.verify-item');
    items.forEach(function (item) {
        item.classList.remove('active');
    });
    var target = document.querySelector('.' + targetClass);
    if (target) {
        target.classList.add('active');
    }
};

// Login OTP Verification Logic (From password reset / login UI)
var resVerBtn = document.querySelector('.res-ver-btn');
if (resVerBtn) {
    // Override the generic goTo('ver-new') so it verifies OTP FIRST
    resVerBtn.removeAttribute('onclick');
    resVerBtn.addEventListener('click', async function (e) {
        e.preventDefault();
        
        var optInput = document.querySelector('.code-box-cont input');
        var otpCode = optInput ? optInput.value : '';
        
        if (otpCode.length < 6) {
            alert('Please enter the full 6 digit OTP code');
            return;
        }
        
        var emailForOtp = window.pendingOtpEmail;
        if (!emailForOtp) {
            var resEmailInput = document.getElementById('res-email');
            if (resEmailInput) emailForOtp = resEmailInput.value;
        }

        if (!emailForOtp) {
            alert('Email is missing for validation. Please restart the process.');
            return;
        }

        try {
            var loader = document.querySelector('.loader');
            if (loader) loader.style.display = 'flex';

            var data = await ApiService.verifyOTP(emailForOtp, otpCode);
            
            if (data.token) {
                // Successful verification returns a login token
                localStorage.setItem('token', data.token);
                var user = data.user || await ApiService.getCurrentUser();
                localStorage.setItem('user', JSON.stringify(user));
                
                if (loader) loader.style.display = 'none';
                
                // Check where to route
                var role = window.pendingOtpRole || user.role;
                if (role === 'business' || user.role === 'business') {
                    window.location.assign('../Business/index.html');
                } else {
                    window.location.assign('../Customer/index.html');
                }
            } else {
                // Not a login token, maybe just password reset verification success
                if (loader) loader.style.display = 'none';
                goTo('ver-new');
            }
            
        } catch (error) {
            if (document.querySelector('.loader')) document.querySelector('.loader').style.display = 'none';
            alert(error.message || 'OTP verification failed. Invalid or expired code.');
        }
    });
}

// Resend OTP (login / reset flow — .resend inside .reset-cont)
var resendLinks = document.querySelectorAll('.reset-cont .resend, .verify-cont .resend');
resendLinks.forEach(function (link) {
    link.addEventListener('click', async function (e) {
        e.preventDefault();

        var email = window.pendingOtpEmail;
        if (!email) {
            var resEmailInput = document.getElementById('res-email');
            if (resEmailInput) email = resEmailInput.value.trim();
        }

        if (!email) {
            alert('Could not determine your email. Please restart the process.');
            return;
        }

        link.textContent = 'Sending...';
        link.style.pointerEvents = 'none';

        try {
            await ApiService.resendOTP(email);
            link.textContent = 'Code sent!';
            setTimeout(function () {
                link.textContent = 'Resend code';
                link.style.pointerEvents = '';
            }, 30000);
        } catch (error) {
            link.textContent = 'Resend code';
            link.style.pointerEvents = '';
            alert(error.message || 'Failed to resend code. Please try again.');
        }
    });
});

// Registration OTP Verification Logic
var regVerBtn = document.querySelector('.ver-btn');
if (regVerBtn) {
    regVerBtn.addEventListener('click', async function (e) {
        e.preventDefault();
        
        var optInput = document.querySelector('.verify-item2 .code-box-cont input');
        var otpCode = optInput ? optInput.value : '';
        
        if (otpCode.length < 6) {
            alert('Please enter the full 6 digit OTP code');
            return;
        }
        
        var emailForOtp = window.pendingOtpEmail;

        if (!emailForOtp) {
            alert('Email is missing for validation. Please restart registration.');
            return;
        }

        try {
            var loader = document.querySelector('.loader');
            if (loader) loader.style.display = 'flex';

            var data = await ApiService.verifyOTP(emailForOtp, otpCode);
            
            if (data.token) {
                localStorage.setItem('token', data.token);
                var user = data.user || await ApiService.getCurrentUser();
                localStorage.setItem('user', JSON.stringify(user));
                
                if (loader) loader.style.display = 'none';
                
                // Show success screen
                goToVerify('verify-item3');

                var verDoneBtn = document.querySelector('.ver-done-btn');
                if (verDoneBtn) {
                    verDoneBtn.addEventListener('click', function () {
                        var role = window.pendingOtpRole || user.role;
                        if (role === 'business' || user.role === 'business') {
                            window.location.assign('../Business/index.html');
                        } else {
                            window.location.assign('../Customer/index.html');
                        }
                    });
                }
            } else {
                throw new Error("No token returned from verify.");
            }
            
        } catch (error) {
            if (document.querySelector('.loader')) document.querySelector('.loader').style.display = 'none';
            alert(error.message || 'OTP verification failed. Invalid or expired code.');
        }
    });
}
