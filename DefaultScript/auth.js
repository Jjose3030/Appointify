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

            if (!data.token) throw { message: 'Registration failed: no token received.' };
            localStorage.setItem('token', data.token);

            var user = data.user || await ApiService.getCurrentUser();
            localStorage.setItem('user', JSON.stringify(user));

            if (loader) loader.style.display = 'none';

            var modal = document.querySelector('.modal');
            var verifyCont = document.querySelector('.verify-cont');

            if (modal && verifyCont) {
                modal.classList.add('active');
                verifyCont.classList.add('active');

                var verDoneBtn = document.querySelector('.ver-done-btn');
                if (verDoneBtn) {
                    verDoneBtn.addEventListener('click', function () {
                        window.location.assign('../Customer/index.html');
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

            if (!data.token) throw { message: 'Registration failed: no token received.' };
            localStorage.setItem('token', data.token);

            var user = data.user || await ApiService.getCurrentUser();
            localStorage.setItem('user', JSON.stringify(user));

            if (loader) loader.style.display = 'none';

            var modal = document.querySelector('.modal');
            var verifyCont = document.querySelector('.verify-cont');

            if (modal && verifyCont) {
                modal.classList.add('active');
                verifyCont.classList.add('active');

                var verDoneBtn = document.querySelector('.ver-done-btn');
                if (verDoneBtn) {
                    verDoneBtn.addEventListener('click', function () {
                        window.location.assign('../Business/index.html');
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
