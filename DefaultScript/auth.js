'use strict';


//user sample data for testing user login & sign up (would be replaced when there's an end point)
const users = [
    {
        id : 1,
        name : 'Addeola',
        email : 'jjoseph@gmail.com',
        password : 'james123'
    },
    {
        id : 2,
        name : 'Addola',
        email : 'jose@gmail.com',
        password : 'james123'
    }
]
//business Owners sample data for testing login & sign up (replacement also needed when an end point is available)
const businessUsers = [
    {
        id : 1,
        name : 'James Powell',
        email: 'powell@gmail.com',
        password : 'powell123',
        companyName : 'powell Limited'
    },
    {
        id: 2,
        name : 'Ruth James',
        email : 'ruth@gmail.com',
        password : 'ruth123',
        companyName : 'ruth limited'
    }
]


//userlogin form validation
const userLogForm = document.getElementById('user-sign-in');
if(userLogForm) {
const userLogEmail = document.getElementById('user-email');
const userLogPassword = document.getElementById('user-password');

userLogForm.addEventListener('submit',  async (e)=>{
    e.preventDefault();
    clearError();

    try {
        const emailValue = userLogEmail.value;
        const passValue = userLogPassword.value;

        //end point that has the users data
        // const res = await fetch('');
        // const users = await res.JSON();

    const findUser = users.find(user => user.email === emailValue);

    if(emailValue === ''){
        showError(userLogEmail, 'Field can not be left empty');
        return;
    } else if(!emailValue.includes('@') || !emailValue.includes('.com')){
        showError(userLogEmail, 'Invalid Email Address');
        return;
    } else if(!findUser) {
        showError(userLogEmail, 'user email does not exist')
    }

    if(passValue === ''){
        showError(userLogPassword, 'Field can not be left empty');
        return;
    } else if(passValue.trim().length < 7) {
        showError(userLogPassword, 'Password must be at least 7 characters');
        return
    } else if(passValue !== findUser.password) {
        showError(userLogPassword, 'Incorrect password')
    }

    
    if(findUser && findUser.password === passValue) {
        const loader = document.querySelector('.loader')
        const show = setTimeout(() => {
            loader.style.display = 'flex';
            
        }, 30);

        setTimeout(() => {
            clearTimeout(show);
            userLogForm.reset();
            window.location.assign('../Customer/index.html');
        }, 4000);
    }
    

    } catch (error) {
        console.log('error occured');
    }  
})  

//reveal and hide password
const showPass = userLogForm.querySelector('.show-pass');
showPass.addEventListener('click', ()=>{
   revPass(userLogPassword, showPass)
})






//reset password for user login page

const resetCont = document.querySelector('.reset-cont');
const forgotBtn = document.querySelector('.forgot');

resetCont.addEventListener('keypress', (e)=>{
    let keyVal = e.key;

    if(keyVal === 'Enter') {
        resetCont.classList.remove('active')
    }
    
})

forgotBtn.addEventListener('click', ()=>{
    const modal = document.querySelector('.modal');
    modal.classList.add('active')
    resetCont.classList.add('active');
    modal.addEventListener('click', ()=>{
        modal.classList.remove('active');
        resetCont.classList.remove('active')
    })
})
}


//bussiness owner login form validation
const bussLogForm = document.getElementById('buss-sign-in');
if(bussLogForm) {  
    const bussLogEmail = document.getElementById('buss-email');
    const bussLogPassword = document.getElementById('buss-password');

    bussLogForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    clearError();

try {
//end point for business owners profile
// const res = await fetch('');
// const businessUsers = await res.JSON();

const emailValue = bussLogEmail.value;
const passValue = bussLogPassword.value;
const findUser = businessUsers.find(user => user.email === emailValue);

    //email validation
    if(emailValue === ''){
        showError(bussLogEmail, 'Field can not be left empty');
        return;
    } else if(!emailValue.includes('@') || !emailValue.includes('.com')){
        showError(bussLogEmail, 'Invalid Email Address');
        return;
    } else if(!findUser) {
        showError(bussLogEmail, 'User does not exist check your email again')
    }

    //password validaton
    if(passValue === ''){
        showError(bussLogPassword, 'Field can not be left empty');
        return;
    } else if(passValue.trim().length < 7) {
        showError(bussLogPassword, 'Password must be at least 7 characters');
        return
    } else if(findUser.password !== passValue) {
        showError(bussLogPassword, 'Incorect Password')
    }

     if(findUser && findUser.password === passValue) {
        const loader = document.querySelector('.loader')
        const show = setTimeout(() => {
            loader.style.display = 'flex';
            
        }, 30);

        setTimeout(() => {
            clearTimeout(show);
            bussLogForm.reset();
             window.location.assign('../Business/index.html')
        }, 4000);
    }
    } catch (error) {
        console.log('an error occured');
        
    }

    
})


const showPass = bussLogForm.querySelector('.show-pass');
showPass.addEventListener('click', ()=>{
    revPass(bussLogPassword, showPass)
})

//reset password for business login page
const resetCont = document.querySelector('.reset-cont');
const forgotBtn = document.querySelector('.forgot');
forgotBtn.addEventListener('click', ()=>{
    const modal = document.querySelector('.modal');
    modal.classList.add('active')
    resetCont.classList.add('active');
    modal.addEventListener('click', ()=>{
        modal.classList.remove('active');
        resetCont.classList.remove('active')
    })
})

}



//user signup form validation
const userSignForm = document.getElementById('user-sign-up');
if(userSignForm) {

const userSignName = document.getElementById('user-name'); 
const userSignEmail = document.getElementById('create-user-email');
const userSignPassword = document.getElementById('create-user-password');
const  userConfirmPassword = document.getElementById('confirm-user-password');


userSignForm.addEventListener('submit', async (e)=>{
 e.preventDefault();
clearError();
try {

    // const res = await fetch('');
    // const users = await res.JSON();

    const username = userSignName.value;
    const userEmail = userSignEmail.value;
    const userPassword = userSignPassword.value;
    const userConPassword = userConfirmPassword.value;

    //check if there is a user with existing profile
    const findUser = users.find(user => user.email === userEmail);

     //user name validation
    if(username === '') {
                showError(userSignName, 'Field can not be left empty');
                return;
        } else if(username.trim().length < 2 || !isNaN(username)) {
            showError(userSignName, 'Enter Your full name');
            return;
    }

    //user email validation
    if(userEmail === ''){
        showError(userSignEmail, 'Field can not be left empty');
        return;
    } else if(!userEmail.includes('@') || !userEmail.includes('.com')){
        showError(userSignEmail, 'Invalid Email Address, missing @ /.com');
        return;
    } else if(findUser) {
        showError(userSignEmail, 'A user already exist with this email, choose another');
        return;
    }

    //password validation
    if(userPassword === ''){
        showError(userSignPassword, 'Field can not be left empty');
        return;
    } else if(userPassword.trim().length < 7) {
        showError(userSignPassword, 'Password must be at least 7 characters');
        return
    } 

    //confirm password validation
    if(userConPassword === ''){
        showError(userConfirmPassword, 'Field can not be left empty');
        return;
    } else if(userPassword !== userConPassword ) {
                showError(userConfirmPassword, 'Password does not match');
                return
    } 

 //send new users data to an end point

if(!findUser) {
    const newUser = {
                        id : Date.now(),
                        name : username,
                        email : userEmail,
                        password : userPassword,
                        role : 'customer'
    };

    // try {
    //     const res = await fetch('url', {
    //         method : 'POST',
    //         headers : {
    //             "Content-type" : "application/json",
    //             "Accept" : "application/json"
    //         },
    //         body : JSON.stringify(newUser),  
    //     })
    //     console.log(newUser);
                        
    //      console.log('data submitted');
    // } catch (error) {
    //     alert('An error occured while creating your profile')
    // }
        users.push(newUser); // delete once there's an end point
        const loader = document.querySelector('.loader')
        loader.style.display = 'flex';
        setTimeout(() => {
                        userSignForm.reset();
                        loader.style.display = 'none';

                        const modal = document.querySelector('.modal');
                        const UserVerifyCont = document.querySelector('.verify-cont');

                        modal.classList.add('active')            
                        UserVerifyCont.classList.add('active');

                        modal.addEventListener('click', ()=>{
                            modal.classList.remove('active');
                            UserVerifyCont.classList.remove('active');
                        });

                        //display the user interface after account has been created successfully
                        const VerCompBtn = document.querySelector('.ver-done-btn');
                        VerCompBtn.addEventListener('click', ()=>{
                           window.location.assign('../Customer/index.html');
                        })
        }, 4000);
                
        }
    } catch (error) {
        console.log('an error occured while creating your account');            
    }
})

// show passwords
    const showPass = userSignForm.querySelector('.show-pass');
        showPass.addEventListener('click', ()=>{
                revPass(userSignPassword, showPass);
        })
    const passShow = userSignForm.querySelector('.show-pass-two');
        passShow.addEventListener('click', ()=>{
                revPass(userConfirmPassword, passShow)
        })
}


//bussiness user signup form validation
const bussSignForm = document.getElementById('buss-sign-up');

if(bussSignForm) {
    const bussSignName = document.getElementById('buss-name');
    const companyName = document.getElementById('company-name');
    const bussSignEmail = document.getElementById('create-buss-email');
    const bussSignPassword = document.getElementById('create-buss-password')
    const bussConfirmPassword = document.getElementById('confirm-buss-password');


    bussSignForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        clearError();

        try {
        const bussname = bussSignName.value;
        const bussCompany = companyName.value;
        const bussEmail = bussSignEmail.value;
        const bussPassword = bussSignPassword.value;
        const bussConPassword = bussConfirmPassword.value;

        //find existing business users from existing end point
        // const res = await fetch('');
        // const businessUsers = res.json();

        const findUser = businessUsers.find(user => user.email === bussEmail);

        //user name validation
        if(bussname === '') {
            showError(bussSignName, 'Field can not be left empty');
            return;
        } else if(bussname.trim().length < 2 || !isNaN(bussname)) {
            showError(bussSignName, 'Enter Your full name');
            return;
            }

        //company name validation
        if(bussCompany === '') {
            showError(companyName, 'Field can not be left empty');
            return;
        } else if(bussCompany.trim().length < 2 || !isNaN(bussCompany)) {
            showError(companyName,  `Enter your company's full name`);
            return;
            }

        //user email validation
        if(bussEmail === ''){
            showError(bussSignEmail, 'Field can not be left empty');
            return;
        } else if(!bussEmail.includes('@') || !bussEmail.includes('.com')){
            showError(bussSignEmail, 'Invalid Email Address, missing @ /.com');
            return;
        } else if(findUser) {
            showError(bussSignEmail, 'An account exist with this email, try another email');
            return;
        }

            //password validation
            if(bussPassword === ''){
            showError(bussSignPassword, 'Field can not be left empty');
            return;
            } else if(bussPassword.trim().length < 7) {
                showError(bussSignPassword, 'Password must be at least 7 characters');
                return
            } 

            //confirm password validation
            if(bussConPassword === ''){
                showError(bussConfirmPassword, 'Field can not be left empty');
                return;
            } else if(bussPassword !== bussConPassword ) {
                showError(bussConfirmPassword, 'Password does not match');
                return
            } 

if(!findUser) {
    const newBussOwner = {
        id : Date.now(),
        name : bussname,
        email : bussEmail,
        password : bussPassword,
        companyName : bussCompany,
        role : 'business'
    };

            try {
                const res = await fetch('url', {
                    method : 'POST',
                    headers : {
                        "Content-type" : "application/json",
                        "Accept" : "application/json"
                    },
                    body : JSON.stringify(newBussOwner)
                })
                console.log(newBussOwner);
                console.log('data submitted');
            } catch (error) {
                alert('Can not create your account at the moment')
            }    
                businessUsers.push(newBussOwner);    //delete once there's an end point                    
                const loader = document.querySelector('.loader')
                loader.style.display = 'flex';
                setTimeout(() => {
                            bussSignForm.reset();
                            loader.style.display = 'none';

                    const modal = document.querySelector('.modal');
                    const UserVerifyCont = document.querySelector('.verify-cont');

                    modal.classList.add('active')            
                    UserVerifyCont.classList.add('active');

                    modal.addEventListener('click', ()=>{
                        modal.classList.remove('active');
                        UserVerifyCont.classList.remove('active');
                    });

                    //display the business dashboard interface after account has been created successfully
                    const VerCompBtn = document.querySelector('.ver-done-btn');
                    VerCompBtn.addEventListener('click', ()=>{
                        window.location.assign('../Business/index.html')
                    })
                }, 4000);
            }
        } catch (error) {
            console.log('an error occured while creating your account');
            
        }
    })

     const showPass = bussSignForm.querySelector('.show-pass');
        showPass.addEventListener('click', ()=>{
            revPass(bussSignPassword, showPass);
        })
      const passShow = bussSignForm.querySelector('.show-pass-two');
        passShow.addEventListener('click', ()=>{
            revPass(bussConfirmPassword, passShow)
        })
}


//password hide & reveal for all login/ signup pages
function revPass(space, option) {
    if(space.type === 'password') {
        space.type = 'text';
        option.classList.remove('fa-eye')
        option.classList.add('fa-eye-slash')
    } else {
        space.type = 'password';
        option.classList.remove('fa-eye-slash')
        option.classList.add('fa-eye')
    }
}



//function showing input errors
function showError(input, message){
    const errorDiv = document.getElementById(input.id + '-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    input.classList.add('input-error');
    return;
}
//function removing input errors
function clearError(){
    const error = document.querySelectorAll('.error');
    error.forEach(err=>{
        err.style.display = 'none';
    })
    const inputs = document.querySelectorAll('input');
    inputs.forEach(inp=>{
        inp.classList.remove('input-error')
    })
}














