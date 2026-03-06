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
});

//service landing page display cards
const serviceCont = document.querySelector('.service-cont');
if(serviceCont){
    const allService = document.querySelector('.service-cont');


async function serviceCard(){
//gets all the availble business cards that already exist when a business owner creates an account but would leave it like this so that cards can be displayed on the landing pages and when there's enough businessses it can then be changed
        // const res = await fetch('');
        // const businesses = await res.JSON();
        businesses.forEach(card=>{
        const revCard = document.createElement('div');
        revCard.className = 'top-rev-item';
        revCard.innerHTML = `
            <div class="top-header">
                        <img src="${card.companyData.image}" alt="business image">
                        <div class="heart">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.0004 17.1999C22.0004 18.0999 21.7504 18.9499 21.3004 19.6699C20.4704 21.0599 18.9504 21.9999 17.2004 21.9999C15.4504 21.9999 13.9204 21.0599 13.1004 19.6699C12.6604 18.9499 12.4004 18.0999 12.4004 17.1999C12.4004 14.5499 14.5504 12.3999 17.2004 12.3999C19.8504 12.3999 22.0004 14.5499 22.0004 17.1999Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 8.69012C22 10.6601 21.49 12.4001 20.69 13.9101C19.81 12.9801 18.57 12.4001 17.2 12.4001C14.55 12.4001 12.4 14.5501 12.4 17.2001C12.4 18.4301 12.87 19.5501 13.63 20.4001C13.26 20.5701 12.92 20.7101 12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.69012C2 5.60012 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.98014 12 5.33014C13.01 3.98014 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.60012 22 8.69012Z" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="top-body">
                        <h2 class="bus-name">${card.companyData.name}</h2>
                        <div class="location">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                                <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.companyData.address}</p>
                        </div>
                        <div class="work-note">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 13H15" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 17H12" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.companyData.job}</p>
                        </div>
                        <div class="day-cal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.75 17.6001H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z" fill="#292D32"/>
                            </svg>
                            <p class="top-rev-text">${card.companyData.work}</p>
                        </div>
                        <div class="book-time-cont">
                            <div class="book-time">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p class="top-rev-text">${card.companyData.availability}</p>
                            </div>
                            <div class="rate-cont">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2977 2.63248L11.6177 5.27248C11.7977 5.63998 12.2777 5.99248 12.6827 6.05998L15.0752 6.45748C16.6052 6.71248 16.9652 7.82248 15.8627 8.91748L14.0027 10.7775C13.6877 11.0925 13.5152 11.7 13.6127 12.135L14.1452 14.4375C14.5652 16.26 13.5977 16.965 11.9852 16.0125L9.74268 14.685C9.33768 14.445 8.67018 14.445 8.25768 14.685L6.01518 16.0125C4.41018 16.965 3.43518 16.2525 3.85518 14.4375L4.38768 12.135C4.48518 11.7 4.31268 11.0925 3.99768 10.7775L2.13768 8.91748C1.04268 7.82248 1.39518 6.71248 2.92518 6.45748L5.31768 6.05998C5.71518 5.99248 6.19518 5.63998 6.37518 5.27248L7.69518 2.63248C8.41518 1.19998 9.58518 1.19998 10.2977 2.63248Z" fill="#FBC02D"/>
                                </svg>
                                <p class="top-rev-text">${card.companyData.rating}</p>
                            </div>
                        </div>
                    </div>
                    <div class="top-footer">
                        <p class="rev-range">From</p>
                        <div class="price-range">$${card.companyData.minPrice} - $${card.companyData.maxPrice}</div>
                        <p class="rev-range">Per Person</p>
                        <button class="explore-btn" onclick="showBookPage(${card.id})">Explore / Book</button>
                    </div>
 `
       allService.appendChild(revCard);    
    })
}
serviceCard();
}


//this function displays the booking interface of the bussiness book button that got clicked and storing it to the local storage which would later be used to display the full details on the booking page
function showBookPage(bussId){
    const selectedBussiness = businesses.find(b => b.id === bussId);
    localStorage.setItem('bookBuss', JSON.stringify(selectedBussiness));
    window.location.assign('/Customer/Booking/booking.html')
}

const bookForm = document.getElementById('book-form');
if(bookForm) {
    const returnBtn = document.querySelector('.ret-btn');
    returnBtn.addEventListener('click', ()=>{
        window.history.back()
    })

    //displaying the information of the bussiness card that got clicked from either the service page or from the home page by getting the stored item it the local storage and displaying it dynamically
    const selectedBussiness = JSON.parse(localStorage.getItem('bookBuss'));
    
    //display in book area for showing the bussiness details or summary
    const BussShowCont = document.querySelector('.buss-sum-view');

    BussShowCont.innerHTML = `
        <div class="buss-book-header">
                <div class="book-head-item">
                    <img src="${selectedBussiness.companyData.image}" alt="business image">
                    <div class="heart">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.0004 17.1999C22.0004 18.0999 21.7504 18.9499 21.3004 19.6699C20.4704 21.0599 18.9504 21.9999 17.2004 21.9999C15.4504 21.9999 13.9204 21.0599 13.1004 19.6699C12.6604 18.9499 12.4004 18.0999 12.4004 17.1999C12.4004 14.5499 14.5504 12.3999 17.2004 12.3999C19.8504 12.3999 22.0004 14.5499 22.0004 17.1999Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 8.69012C22 10.6601 21.49 12.4001 20.69 13.9101C19.81 12.9801 18.57 12.4001 17.2 12.4001C14.55 12.4001 12.4 14.5501 12.4 17.2001C12.4 18.4301 12.87 19.5501 13.63 20.4001C13.26 20.5701 12.92 20.7101 12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.69012C2 5.60012 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.98014 12 5.33014C13.01 3.98014 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.60012 22 8.69012Z" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                    </div>
                </div>
                <div class="book-head-item buss-book-sum">
                    <div class="top-body">
                        <h2 class="bus-name">${selectedBussiness.companyData.name}</h2>
                        <div class="location">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                                <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text addre">${selectedBussiness.companyData.address}</p>
                        </div>
                        <div class="work-note">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 13H12" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 17H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${selectedBussiness.companyData.job} </p>
                        </div>
                        <div class="day-cal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.75 17.6001H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z" fill="#292D32"/>
                            </svg>
                            <p class="top-rev-text">${selectedBussiness.companyData.work}</p>
                        </div>
                        <div class="phone-cal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"/>
                            </svg>
                            <p class="top-rev-text">${selectedBussiness.companyData.phone}</p>
                        </div>
                        <div class="email-cal">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5H7" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 16.5H8" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 12.5H5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${selectedBussiness.companyData.email}</p>
                        </div>
                        <div class="book-time-cont">
                            <div class="book-time">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p class="top-rev-text">${selectedBussiness.companyData.availability}</p>
                            </div>
                            <div class="rate-cont">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2977 2.63248L11.6177 5.27248C11.7977 5.63998 12.2777 5.99248 12.6827 6.05998L15.0752 6.45748C16.6052 6.71248 16.9652 7.82248 15.8627 8.91748L14.0027 10.7775C13.6877 11.0925 13.5152 11.7 13.6127 12.135L14.1452 14.4375C14.5652 16.26 13.5977 16.965 11.9852 16.0125L9.74268 14.685C9.33768 14.445 8.67018 14.445 8.25768 14.685L6.01518 16.0125C4.41018 16.965 3.43518 16.2525 3.85518 14.4375L4.38768 12.135C4.48518 11.7 4.31268 11.0925 3.99768 10.7775L2.13768 8.91748C1.04268 7.82248 1.39518 6.71248 2.92518 6.45748L5.31768 6.05998C5.71518 5.99248 6.19518 5.63998 6.37518 5.27248L7.69518 2.63248C8.41518 1.19998 9.58518 1.19998 10.2977 2.63248Z" fill="#FBC02D"/>
                                </svg>
                                <p class="top-rev-text">${selectedBussiness.companyData.rating}</p>
                            </div>
                        </div>
                        <div class="top-footer">
                            <p class="rev-range">From</p>
                            <div class="price-range">$${selectedBussiness.companyData.minPrice} - $${selectedBussiness.companyData.maxPrice}</div>
                            <p class="rev-range">Per Person</p>
                         </div>
                    </div>
                </div>
                <div class="book-head-item buss-ceo-sum">
                    <div class="ceo-header">
                        <div class="ceo-img"><img src="${selectedBussiness.ownerData.image}" alt="ceo image"></div>
                        <div class="ceo-det">
                            <h2>${selectedBussiness.name}</h2>
                            <p>C.E.O</p>
                        </div>
                    </div>
                    <div class="ceo-bio">
                        <h2>Bio</h2>
                        <p>${selectedBussiness.ownerData.bio}"</p>
                    </div>
                </div>
                </div>
                <div class="buss-book-body">
                <div class="book-desc-item">
                    <h2>Descriptions</h2>
                    <p>${selectedBussiness.companyData.descriptiption}"</p>
                </div>
                <div class="book-desc-item">
                    <h2>Shop Direction</h2>
                    <p>${selectedBussiness.companyData.direction}"</p>
                </div>
                </div>   
    
    `




//booking form 
const sampleUpload = document.getElementById('sample-upload');
const sampleShow = document.querySelector('.sample-upload');
const sampText = document.querySelector('.sample-up-text');
let mand;

//for displaying the uploaded  sample image
sampleUpload.addEventListener('change', ()=>{
    if(sampleUpload.files) {
     sampText.classList.add('active')

        const imgUrl = URL.createObjectURL(sampleUpload.files[0]);
        mand = imgUrl
        sampleShow.style.backgroundImage = `url(${mand})`;
        
        return mand;
}
});


}
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
        
       setTimeout(() => {
        //  bookForm.reset();
         mand = 'unset'       
         sampleShow.style.backgroundImage = `url(${mand})`;
         sampText.classList.remove('active')
       }, 1500);

    }

// showDates();
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
