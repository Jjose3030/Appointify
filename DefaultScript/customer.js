const custDrop = document.querySelectorAll('.prof-summary');
custDrop.forEach(drop=>{
    drop.addEventListener('click', ()=>{
    drop.classList.toggle('active', !drop.classList.contains('active'))
})
})

//For the hero page slider
    const slideCont = document.querySelector('.slide-cont')
    const slides = document.querySelectorAll('.slide-item');
    let currentSlide = 0;
    function moveSlide(index){
        slides.forEach(slide =>{
            slide.classList.remove('active');
            slides[index].classList.add('active');
            
        })
    }
    function startmove(){
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            moveSlide(currentSlide)
        }, 3000);
    }
    moveSlide(currentSlide);
    startmove();


//this would be replaced with and end point that contains all available bussinesses 
const businesses = [
    {
        id : 1,
        name : 'Abiodun Adegbola',
        role : 'business',
        ownerData : {
            email : 'abiodun@gmail.com',
            phone : '0303591042002',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'Ologo three touch street',
            image : '../Images/img32.png'
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Adex Barbing Salon',
            email : 'adex@gmail.com',
            phone : '03034130435',
            job : 'Barbing | Hair Branding | Training',
            work : 'Monday - Sunday',
            address : 'Ikeja Lagos, Nigeria',
            minPrice : 10,
            maxPrice : 60,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.
        
Hygiene, comfort and customer satisfaction are at the core of everything we do. Our tools are properly sterilized after use and we maintain a calm, friendly enviroment where clients can relax while getting quality service. Every haircut is done with attention to detail, ensuring sharp finishing and long-lasting style`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            image : '../Images/img1.jpg',
            rating : 4.5
        }
    },
    {
        id : 2,
        name : 'Desola Ayomikun',
        role : 'business',
        ownerData : {
            email : 'desola@gmail.com',
            phone : '0301042002',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'escobar avenue',
            image : '../Images/img32.png'
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Desxy Makeup Artist',
            email : 'desxy@gmail.com',
            phone : '02034130435',
            job : 'Makeup | Auto Gele',
            work : 'Monday - Sunday',
            address : 'Victoria Island, Lagos, Nigeria',
            minPrice : 20,
            maxPrice : 40,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img2.jpg',
            rating : 4.5
        }
    },
    {
        id : 3,
        name : 'Dickson Davies',
        role : 'business',
        ownerData : {
            email : 'dickson@gmail.com',
            phone : '01010429802',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'dragola street',
            image : '../Images/img32.png',
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Dic Spas & Massage Centers',
            email : 'dics@gmail.com',
            phone : '05034292435',
            job : 'Spas | Massage',
            work : 'Monday - Friday',
            address : 'Magodo Estate Lagos, Nigeria',
            minPrice : 10,
            maxPrice : 80,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img3.jpg',
            rating : 4.5
        }
    },
    {
        id : 4,
        name : 'James Ruther',
        role : 'business',
        ownerData : {
            email : 'ruther@gmail.com',
            phone : '0310104292',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'heritage avenue',
            image : '../Images/img32.png',
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'SDB Tattoo & Piercing Studio',
            email : 'sdb@gmail.com',
            phone : '05034292435',
            job : 'Tatto',
            work : 'Monday - Sunday',
            address : 'Ikeja Lagos, Nigeria',
            minPrice : 10,
            maxPrice : 60,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img4.jpg',
            rating : 4.5
        }
    },
    {
        id : 5,
        name : 'Daniel John',
        role : 'business',
        ownerData : {
            email : 'john@gmail.com',
            phone : '0910106292',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'ikeja lagos',
            image : '../Images/img32.png',
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Daniel Psychologist & Counseling',
            email : 'danpc@gmail.com',
            phone : '05034292435',
            job : 'Psychologist & Counselors',
            work : 'Monday - Sunday',
            address : 'Magodo Estate Lagos, Nigeria',
            minPrice : 5,
            maxPrice : 600,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img5.jpg',
            rating : 4.5
        }
    },
    {
        id : 6,
        name : 'Chi Yun',
        role : 'business',
        ownerData : {
            email : 'chi@gmail.com',
            phone : '0210106262',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'ikeja lagos',
            image : '../Images/img32.png',
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Chi-Yun Martial Arts',
            email : 'danpc@gmail.com',
            phone : '01034292435',
            job : 'Martial Arts Coaches',
            work : 'Monday - Sunday',
            address : 'Victoria Island Lagos, Nigeria',
            minPrice : 20,
            maxPrice : 500,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img6.jpg',
            rating : 4.5
        }
    },
    {
        id : 7,
        name : 'Ben Davis',
        role : 'business',
        ownerData : {
            email : 'davies@gmail.com',
            phone : '0710106262',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'aston avenue Ibadan',
            image : '../Images/img32.png',
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Tecnor Music Coach',
            email : 'tecnor@gmail.com',
            phone : '01034292435',
            job : 'Music Teachers',
            work : 'Monday - Friday',
            address : 'Victoria Island Lagos, Nigeria',
            minPrice : 10,
            maxPrice : 80,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img7.jpg',
            rating : 4.5
        }
    },
    {
        id : 8,
        name : 'Fido George',
        role : 'business',
        ownerData : {
            email : 'george@gmail.com',
            phone : '0910106262',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'signature avenue Ibadan',
            image : '../Images/img32.png',
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Fido Business Consultants',
            email : 'fido@gmail.com',
            phone : '61034292435',
            job : 'Business Consultants',
            work : 'Monday - Sunday',
            address : 'Ikeja Lagos, Nigeria',
            minPrice : 100,
            maxPrice : 500,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img8.jpg',
            rating : 4.5
        }
    },
    {
        id : 9,
        name : 'Mobayo Demilade',
        role : 'business',
        ownerData : {
            email : 'demi@gmail.com',
            phone : '0541010262',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail`,
            address : 'ijomu junction',
            image : '../Images/img32.png',
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Mobayo Photography Studio',
            email : 'moba@gmail.com',
            phone : '234034292435',
            job : 'Photography',
            work : 'Monday - Sunday',
            address : 'Ikeja Lagos, Nigeria',
            minPrice : 10,
            maxPrice : 50,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img9.jpg',
            rating : 4.5
        }
    },
    {
        id : 10,
        name : 'Desola Ayomikun',
        role : 'business',
        ownerData : {
            email : 'desola@gmail.com',
            phone : '0301042002',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'escobar avenue',
            image : '../Images/img32.png'
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Desxy Makeup Artist',
            email : 'desxy@gmail.com',
            phone : '02034130435',
            job : 'Makeup | Auto Gele',
            work : 'Monday - Sunday',
            address : 'Victoria Island, Lagos, Nigeria',
            minPrice : 20,
            maxPrice : 40,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img2.jpg',
            rating : 4.5
        }
    },
    {
        id : 11,
        name : 'James Adam',
        role : 'business',
        ownerData : {
            email : 'james@gmail.com',
            phone : '0801042002',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'escobar avenue',
            image : '../Images/img32.png'
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Blossen Skincare & Facial Clinic',
            email : 'bloseen@gmail.com',
            phone : '02098480435',
            job : 'Skincare & Facial Clinics',
            work : 'Monday - Friday',
            address : 'Magodo Estate Lagos, Nigeria',
            minPrice : 10,
            maxPrice : 80,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img10.jpg',
            rating : 4.5
        }
    },
    {
        id : 12,
        name : 'Simi Bolaji',
        role : 'business',
        ownerData : {
            email : 'bolaji@gmail.com',
            phone : '09010823002',
            bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
            address : 'palace street avenue',
            image : '../Images/img32.png'
        }, 
        companyData : {
            availability: 'Booking Available',
            name : 'Simi Dental Clinics',
            email : 'simdent@gmail.com',
            phone : '0609360435',
            job : 'Dental Clinics',
            work : 'Monday - Sunday',
            address : 'Ikeja Lagos, Nigeria',
            minPrice : 10,
            maxPrice : 60,
            descriptiption : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming.`,
            direction : `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages.`,
            image : '../Images/img11.jpg',
            rating : 4.5
        }
    },

]

const rateCont = document.querySelector('.top-rate-cont');
const recommendCont = document.querySelector('.recommend-cont');
const recentCont = document.querySelector('.recent-cont');

if(rateCont || recentCont|| recommendCont) {
    const topRated = businesses.slice(0,4);
    const recentAdd = businesses.slice(4, 8);
    const recommended = businesses.slice(8, 12);

//Generating each section dynamically(rated recommended, trending and also the service page)

function createCard(){
//99% identical with that of the landing page before login but this time the anchor tag is replaced with a button that when it gets clicked it leads to the booking page interface displaying the clicked business card
    topRated.forEach(card=>{
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
                        <button class="show-book-btn" onclick="showBook()">Explore / Book</button>
                    </div>
 `
       rateCont.appendChild(revCard);    
    })

    recommended.forEach(card=>{
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
                        <button class="show-book-btn" onclick="showBook()">Explore / Book</button>
                    </div>
 `
       recommendCont.appendChild(revCard);    
    })

    recentAdd.forEach(card=>{
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
                        <button class="show-book-btn" onclick="showBook()">Explore / Book</button>
                    </div>
 `
       recentCont.appendChild(revCard);    
    })

}

createCard();
}




//nav toggle
const bar = document.querySelector('.bar-tog');
const nav = document.querySelector('nav');
const modal = document.querySelector('.modal')
function navToggle(){
    if(nav.classList.contains('active')){
        bar.classList.remove("fa-bars");
        bar.classList.add('fa-xmark');
        modal.classList.add('active')
    } else {
        bar.classList.add("fa-bars");
        bar.classList.remove('fa-xmark');
        modal.classList.remove('active')
    }
}
bar.addEventListener('click', ()=>{
    nav.classList.toggle('active', !nav.classList.contains('active'));
    navToggle()
    
    modal.addEventListener('click', ()=>{
        nav.classList.remove('active')
        bar.classList.add("fa-bars");
        bar.classList.remove('fa-xmark');
        modal.classList.remove('active')
    })
})




//service landing page display cards

const serviceCont = document.querySelector('.service-cont');
if(serviceCont){
    const allService = document.querySelector('.service-cont')
    function serviceCard(){
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
                        <a href="./Auth/user-sign-in.html" class="log-rev">Explore / Book</a>
                    </div>
 `
       allService.appendChild(revCard);    
    })
}
serviceCard();
}


const heart = document.querySelectorAll('.heart');
heart.forEach(h=>{
    h.addEventListener('click', ()=>{
        h.classList.toggle('active')
    })
})




//booking form 
const dateValue = document.getElementById('date-value')
const timeValue = document.getElementById('time-value');
const weekDateCont = document.querySelector('.week-date-cont');
const prevMonthBtn = document.querySelector('.prev-month');
const nextMonthBtn = document.querySelector('.next-month');
const monthYear = document.querySelector('.month-year')
let currentDate = new Date();

let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'JUL', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function showDates(){
    weekDateCont.innerHTML ='';
    let monthIndex = currentDate.getMonth();
    let year = currentDate.getFullYear();
    monthYear.textContent = `${month[monthIndex]} ${year}`;

    let dayInMonth = new Date(year, monthIndex + 1, 0).getDate();
    //get the first day in the month, would help allign the dates to it's respective days
    let firstDay = new Date(year, monthIndex, 1).getDay();
    for(let day = 0; day < firstDay; day++){
        const empty = document.createElement('div');
        weekDateCont.appendChild(empty)
    }
    



    //generate the dates in the month and display it inform of an input so that a day can get selected by using a label assigned to an input.
    const today = new Date();
    today.setHours(0,0,0,0);

    for(let day = 1; day <= dayInMonth; day++){
        const input = document.createElement('input');
        const label = document.createElement('label');
        const id = `${day}-${monthIndex}-${year}`;
        input.type = 'radio';
        input.id = id;
        input.value =  `${day}-${month[monthIndex]}-${year}`;
        input.name = 'day'        
        label.htmlFor = id;
        label.textContent = day;

    //disable past dates  
    const dateToCheck = new Date(year, monthIndex, day);
    dateToCheck.setHours(0,0,0,0);
    if (dateToCheck < today) {
        input.disabled = true;
     }

    //using the inputs with the type of hidden, setting it's value to be the value of the input gotten when a date gets checked and that can then be used
    input.addEventListener('click', ()=>{
        dateValue.value = input.value;
         updateSummary()
    });

        weekDateCont.appendChild(input);
        weekDateCont.appendChild(label);
         
    }
}



    //moving to the next and previous months
  prevMonthBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    showDates()
  };
  nextMonthBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    showDates()
  };


function updateSummary(){
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const period = document.querySelector("input[name='ampm']:checked")?.value;
    

    if(dateValue.value && hour && minute && period) {
        timeValue.value = `${hour}:${minute} ${period}`;

        const bookDate = `Your booking date is scheduled for ${dateValue.value} at ${timeValue.value}. Do make sure to contact who you booked an appointment with`;
        console.log(bookDate);
        
        
    }
    
  }

    document.getElementById("hour").addEventListener("input", updateSummary);
    document.getElementById("minute").addEventListener("input", updateSummary);
    document.querySelectorAll('input[name=ampm]').forEach(per=>{per.addEventListener('change', updateSummary)})




const bookForm = document.getElementById('book-form');
    bookForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const shortNote = document.getElementById('short-note').value;
        const budget = document.getElementById('budget-price').value;
        const serviceType = document.getElementById('service-type').value;
        const phone = document.getElementById('phone').value;
        const location = document.getElementById('location').value;
        const houseAddress = document.getElementById('house-loacation').value
        
        // this would be the information displayed on the booking page in the business owner interface. simulated that using the bookingInfo[{},{}]
        const bookingData = {
            name : `username`,
            phone : phone,
            location : location,
            budget : 25,
            time : timeValue.value,
            day : dateValue.value,
            userImg : '../Images/img29.png',
            sampleImg : '../Images/img34.jpg' ?? null, //haven't worked this out here on the booking page
            shortNote : shortNote,
            address : houseAddress,
            type : serviceType
        }


        try {
            const res = await fetch('url', {
                method : 'POST',
                header : {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body : JSON.stringify(bookingData)
            });
            const data = await res.json();
            alert('booking successful')
        } catch (error) {
            alert('booking failed');
            console.log(error);   
        } 
    })

showDates()

























