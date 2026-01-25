
const notiBell = document.querySelector('.noti-bell');
const notiCont = document.querySelector('.noti-cont');

notiBell.addEventListener('click', ()=>{
    notiCont.classList.toggle('active', !notiCont.classList.contains('active'))
})




//logout operation
const ownerSum = document.querySelectorAll('.owner-summary');
const logOutBtn = document.querySelectorAll('.log-out-btn');
const ownerDrop = document.querySelector('.owner-drop')

ownerSum.forEach(owner=>{
    owner.addEventListener('click', ()=>{
        owner.classList.toggle('active');
        logOutBtn.forEach(log=>{
            log.addEventListener('click', ()=>{
                window.location.replace('../Auth/bussiness-sign-in.html')
            })
        })
    })
})

//for page menu navigation

const pages = document.querySelectorAll('.page');
const navMenus = document.querySelectorAll('.nav-menu');

navMenus.forEach(menu=>{
    menu.addEventListener('click', ()=>{
        navMenus.forEach(n=>{n.classList.remove('active')})
        pages.forEach(p=>{p.classList.remove('active')});
        menu.classList.add('active');
        document.getElementById(menu.dataset.page).classList.add('active')
    })
  
    
})


//dashboard page dropdown 
const filt = document.querySelector('.filt-cont');
filt.addEventListener('click', ()=>{filt.classList.toggle('active'), !filt.classList.contains('active')});


//booking page details view


//sample data gotten from the booking form after it has been filled by a user and displaying it on the booking page

const bookingInfo = [
    {
        name : 'Kunle Daniel',
        phone : 10123456789,
        location : 'Akure, Ondo State, Nigeria',
        budget : 25,
        time : '10:25 AM',
        day : 'Jan-25-2026',
        userImg : '../Images/img29.png',
        sampleImg : '../Images/img34.jpg',
        shortNote : 'How long would it take you to get here',
        address : 'Opposite First school, Ogo 1 touch street',
        type : 'Home'
    },
    {
        name : 'Esther Olajided',
        phone : 382778678278,
        location : 'Ibadan, Oyo State, Nigeria',
        budget : 40,
        time : '3:30 PM',
        day : 'Jan-28-2026',
        userImg : '../Images/img20.png',
        sampleImg : '../Images/img35.jpg',
        shortNote : 'would be expecting your arrival',
        address : 'Jamila street opposit oke oluwa primary school',
        type : 'Home'
    },
    {
        name : 'Racheal Ayomide',
        phone : 234901212121,
        location : 'Ikole, Ekiti state',
        budget : 55,
        time : '12:45 PM',
        day : 'Feb-3-2026',
        userImg : '../Images/img28.png',
        sampleImg : '../Images/img36.jpg',
        shortNote : 'I could arrive earlier than said to try and get to your shop earlier',
        address : '',
        type : 'Shop'
    },
]



function showBooking(){
    const bookCont = document.querySelector('.book-cont');
    bookCont.innerHTML = ''
    bookingInfo.forEach((info)=>{
     
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    bookItem.innerHTML = `
                            <div class="book-left">
                                <div class="book-left-header">
                                    <div class="book-det">
                                        <div class="book-img">
                                            <img src="${info.userImg}" alt="profile image" class="book-prof-img">
                                        </div>
                                        <div class="book-prof">
                                            <p>${info.name}</p>
                                            <div class="book-call">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"/>
                                                </svg> ${info.phone}
                                            </div>
                                            <div class="book-location">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                                                    <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg> ${info.location}
                                            </div>
                                        </div>
                                    </div>
                                    <i class="fa-solid fa-chevron-down spin"></i>
                                </div>
                                <div class="book-budget">
                                    <h2>Budget</h2>
                                    <p class="budget-text">$${info.budget}</p>
                                </div>
                                <div class="book-serv-cont">
                                    <div class="book-serv-header">
                                        <div class="serv-type">
                                            <p>Service type: <span class="type-text">${info.type}</span></p>
                                        </div>
                                        <div class="book-time">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg> <span class="book-time-text">${info.time}</span>
                                        </div>
                                    </div>
                                    <div class="book-serv-mid">
                                        <div class="book-date">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M20.75 17.6001H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z" fill="#292D32"/>
                                            </svg>
                                            <span class="book-date-text">${info.day}</span>
                                        </div>
                                    </div>
                                    <div class="book-serv-foot">
                                        <p>Uploaded a sample</p>
                                        <div class="book-samp-img">
                                            <img src="${info.sampleImg}" alt="sample image" class="sample-img">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="book-right">
                                <div class="book-short-note">
                                    <h2>Wrote a short note</h2>
                                    <p class="short-note-text">${info.shortNote}</p>
                                </div>
                                <div class="book-addy">
                                    <h2>Address Direction (home service was selected)</h2>
                                    <p class="address">${info.address}</p>
                                </div>

                                <button class="message-cust">Message Customer</button>
                            </div>`


    bookCont.appendChild(bookItem);

})

    const bookIt = document.querySelectorAll('.book-item');
    const spins = document.querySelectorAll('.spin');
  
 bookIt.forEach(book => {
  book.addEventListener('click', (e) => {
    if (e.target.closest('.spin')) return; 
    book.classList.add('active');
  });
  
});

spins.forEach(spin => {
  spin.addEventListener('click', () => {
    const book = spin.closest('.book-item');
    book.classList.remove('active');
  });
});

//displays message page when the bussiness owner clicks on message customer button
const messageCust = document.querySelectorAll('.message-cust');
messageCust.forEach(message=>{
    message.addEventListener('click', ()=>{
        const pages = document.querySelectorAll('.page');
        const navLink = document.querySelectorAll('.nav-menu')
        navLink.forEach(nav=>{nav.classList.remove('active')
        if(nav.dataset.page === 'message') {
            nav.classList.add('active')
            
        }
    })
        pages.forEach(p=>{
            p.classList.remove('active');
            if(p.classList.contains('message')) {
                 p.classList.add('active');
            }
        })
        
        
    })
})  

}

document.addEventListener('DOMContentLoaded', showBooking)


//company form 

const companyForm = document.getElementById('company-form');
companyForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    clearError();
    validateInputs();
})

//display uploaded image for the company
const revImg = document.getElementById('rev-img');
const imgText = document.querySelector('.prof-img-text');
const showImg = document.querySelector('.show-comp-img')
const compImg = document.getElementById('comp-img');
 compImg.addEventListener('input', ()=>{
        clearError();
        getImage(compImg, showImg, imgText)
    })

//controls the display of uploaded image
function getImage(input, image, text) {
        const getImg = URL.createObjectURL(input.files[0]);
        image.style.display = 'flex';
        image.src = getImg;
        text.style.display = 'none';
    }
   
//display uploaded images for the gallery
const galleryUpload = document.getElementById('work-img-up');
const galleryCont = document.querySelector('.up-img-cont');
galleryUpload.addEventListener('input', ()=>{
    const gallStock = galleryUpload.files;
    galleryCont.innerHTML = '';

    for(let i = 0; i < gallStock.length; i++) {
        const galleryImage = document.createElement('div');
        galleryImage.classList.add('up-img');
        const  disImg = document.createElement('img');
        let url = URL.createObjectURL(gallStock[i]);
        disImg.src = url;
        galleryImage.appendChild(disImg);
        galleryCont.appendChild(galleryImage);
    } 
})

  
//function controlling the  companys form info validation and also sending it to an end point
function validateInputs(){
    const cName = document.getElementById('comp-name');
    const cEmail = document.getElementById('comp-email');
    const cPhone = document.getElementById('comp-phone');
    const cJob = document.getElementById('comp-job');
    const cWorkDay = document.getElementById('comp-work-day');
    const cAddy = document.getElementById('comp-address');
    const cMinPrice = document.getElementById('comp-min-price');
    const cMaxPrice = document.getElementById('comp-max-price');
    const cDesc = document.getElementById('comp-description');
    const cDir = document.getElementById('comp-direction');

    const compImg = document.getElementById('comp-img');
    if(compImg.files[0] === undefined || compImg.files[0] === null) {
       showError(compImg, 'Upload an image for your company profile') 
    }
   
  

    if(cName.value === '') {
        showError(cName, 'Field can not be left empty');
        return;
    } else if(cName.value.trim().length < 5 || !isNaN(cName.value)) {
        showError(cName, `Kindly input your company's full name`);
        return;
    }

    if(cEmail.value === '') {
        showError(cEmail, 'Field can not be left empty');
        return;
    } else if(!cEmail.value.includes('@') || !cEmail.value.includes('.com')) {
        showError(cEmail, `Input your company's email address`);
        return;
    }

    if(cPhone.value === '') {
        showError(cPhone, 'Field can not be left empty');
        return;
    } else if(cPhone.value.trim().length < 11 || cPhone.value.trim().length > 14 || isNaN(cPhone.value)) {
        showError(cPhone, 'Enter a valid phone number for your company');
        return;
    }


    if(cJob.value === ''){
        showError(cJob, 'Field can not be left empty');
        return;
    } else if(cJob.value.trim().length < 3 || !isNaN(cJob.value)) {
        showError(cJob, 'Input the job title your company offers');
        return;
    }


    if(cWorkDay.value === "") {
        showError(cWorkDay, 'Field can not be left empty');
        return;
        }  else if(cWorkDay.value.trim().length < 5 || !isNaN(cWorkDay.value)) {
        showError(cWorkDay, 'Input the work days your company operates on');
        return;
    }




    if(cAddy.value === "") {
        showError(cAddy, 'Field can not be left empty');
        return;
        }  else if(cAddy.value.trim().length < 30 || !isNaN(cAddy.value)) {
        showError(cAddy, 'Fill in a well detailed location about where your company is located');
        return;
    }


    if(cMinPrice.value === "") {
        showError(cMinPrice, 'Field can not be left empty');
        return;
        }  else if(cMinPrice.value.trim().length < 1 || isNaN(cMinPrice.value)) {
        showError(cMinPrice, 'Enter the minimum amount your company charges for a service session');
        return;
    }

    if(cMaxPrice.value === "") {
        showError(cMaxPrice, 'Field can not be left empty');
        return;
        }  else if(cMaxPrice.value.trim().length < 1 || isNaN(cMaxPrice.value)) {
        showError(cMaxPrice, 'Enter the maximum amount your company charges for a service session');
        return;
    }


    if(cDesc.value === "") {
        showError(cDesc, 'Field can not be left empty');
        return;
        }  else if(cDesc.value.trim().length < 200 || !isNaN(cDesc.value)) {
        showError(cDesc, 'Input a well detailed information about your company so it gives customers a sense of trust. At least 200 characters');
        return;
    }



    if(cDir.value === "") {
        showError(cDir, 'Field can not be left empty');
        return;
        }  else if(cDir.value.trim().length < 80 || !isNaN(cDir.value)) {
        showError(cDir, 'Input a well detailed information about where your company is located, so as to help customer in locating your company physically. At least 80 characters');
        return;
    }


    const companyProfile = {
        companyImage : compImg.files[0],
        companyName : cName.value,
        companyEmail : cEmail.value,
        companyPhone : cPhone.value,
        companyJob : cJob.value,
        companyWorkDay : cWorkDay.value,
        companyAddress : cAddy.value,
        companyMinPrice : cMinPrice.value,
        companyMaxPrice : cMaxPrice.value,
        companyDescription : cDesc.value,
        companyDirection : cDir.value,
    }

 

  async function sendData(){
     try {
        const res = await fetch('url in here',{
            method : 'PATCH',
            headers : {
               "Content-type" : 'application/json',
               "Accept" : 'application/json'
            },
            body : JSON.stringify(companyProfile)
        });        
        console.log('data sent');     
  } catch (error) {
        alert(`Failed to upload your company's profile, try again later`)
  }
  }
  sendData()
}


//Bussiness Profile page form validation

//displaying business owner selected image
const busImg = document.getElementById('bus-form-img');
const revBusImg = document.querySelector('.rev-form-img');
const busImgText = document.querySelector('.bus-span-text');
const showBusImg = document.querySelector('.buss-img')

busImg.addEventListener('input', ()=>{
    getImage(busImg, showBusImg, busImgText)
})


const bussForm = document.getElementById('bus-prof-form');
bussForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    clearError();
    validateBuss()

})

//controls the validation of the bussiness owner profile form
function validateBuss(){
    const bName = document.getElementById('bus-name');
    const bEmail = document.getElementById('bus-email');
    const bPhone = document.getElementById('bus-phone');
    const bAddy = document.getElementById('bus-addy');
    const bBio = document.getElementById('bus-bio');





     const busImg = document.getElementById('bus-form-img');
    if(busImg.files[0] === undefined || busImg.files[0] === null) {
       showError(busImg, 'Upload an image for your profile picture') 
    }
   
  

    if(bName.value === '') {
        showError(bName, 'Field can not be left empty');
        return;
    } else if(bName.value.trim().length < 5 || !isNaN(bName.value)) {
        showError(bName, `Kindly input your full name`);
        return;
    }

    if(bEmail.value === '') {
        showError(bEmail, 'Field can not be left empty');
        return;
    } else if(!bEmail.value.includes('@') || !bEmail.value.includes('.com')) {
        showError(bEmail, `Input a valid email address`);
        return;
    }

    if(bPhone.value === '') {
        showError(bPhone, 'Field can not be left empty');
        return;
    } else if(bPhone.value.trim().length < 11 || bPhone.value.trim().length > 14 || isNaN(bPhone.value)) {
        showError(bPhone, 'Enter a valid phone number');
        return;
    }

    if(bAddy.value === "") {
        showError(bAddy, 'Field can not be left empty');
        return;
        }  else if(bAddy.value.trim().length < 30 || !isNaN(bAddy.value)) {
        showError(bAddy, 'Input your residential  address');
        return;
    }


    if(bBio.value === "") {
        showError(bBio, 'Field can not be left empty');
        return;
        }  else if(bBio.value.trim().length < 80 || !isNaN(bBio.value)) {
        showError(bBio, 'Tell us more about yourself, it would help customers understand you better. At least 80 characters');
        return;
    }



    const busProfile = {
        ownerImage : busImg.files[0],
        ownerName : bName.value,
        ownerEmail : bEmail.value,
        ownerPhone : bPhone.value,
        ownerAddress : bAddy.value,
        ownerBio : bBio.value
    }

async function sendData(){
     try {
        const res = await fetch('url in here',{
            method : 'PATCH',
            headers : {
               "Content-type" : 'application/json',
               "Accept" : 'application/json'
            },
            body : JSON.stringify(busProfile)
        });        
        console.log('profile data sent');     
  } catch (error) {
        alert(`Failed to upload your profile, try again later`)
  }
  }
  sendData()
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


const setup = [
    {
        id : 1,
        role : 'business',
        name : 'santi jose',
        ownerData : {
            email : 'santi@gmail.com',
            phone : '0303539839302',
            bio : 'just a cool and chill guy thats all',
            address : 'Ologo one touch street',
            image : '../Image/img23.png'
        },
        companyInfo : {
            name : 'runira ltd',
            email : 'efejion@gmail.com',
            phone : '030349038545',
            job : 'welder',
            work : 'Friday - saturday',
            address : 'kwdnk wepfuhef n we;fiwu wefn;we f;',
            minPrice : 20,
            maxPrice : 40,
            descriptiption : "ekefk efnkwnfknewkfnienwf ekwfl wef lwenf",
            direction : 'ksf ekfke inwifn weinfinn enf knwfonwe',
            image : '../Image/img12.png'
        }
    },
    {
        id : 2,
        role : 'business',
        name : 'rose mary',
        ownerData : {
            email : 'rose@gmail.com',
            phone : '0303591042002',
            bio : 'just a cool and chill girl thats all',
            address : 'Ologo three touch street',
            image : '../Image/img18.png'
        },
        companyInfo : {
            name : 'nail, tech ltd',
            email : 'lerg;on@gmail.com',
            phone : '03034130435',
            job : 'nail',
            work : 'monday - saturday',
            address : 'kwdnk kejfkjqk;fe foiwefo mweffiwu wefn;we f;',
            minPrice : 15,
            maxPrice : 100,
            descriptiption : "ekefk efnkwn;ls' ewf wef  efhbhbslcacx wfl wef lwenf",
            direction : 'ksf oqficd we f;wefh  frjewf enrjf ;ew fnwfonwe',
            image : '../Image/img15.png'
        }
    },
]




console.log(setup);


setup.forEach(set=>{
    console.log(set.companyInfo.minPrice);
    
})
