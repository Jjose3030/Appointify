

//For the hero page slider
// const slideCont = document.querySelector('.slide-cont')
//     const slides = document.querySelectorAll('.slide-item');
//     let currentSlide = 0;

//     function moveSlide(index){
//         slides.forEach(slide =>{
//             slide.classList.remove('active');
//             slides[index].classList.add('active');
            
//         })
//     }

//     function startmove(){
//         setInterval(() => {
//             currentSlide = (currentSlide + 1) % slides.length;
//             moveSlide(currentSlide)
//         }, 10000);
//     }

//     moveSlide(currentSlide);
//     startmove();

//Json objects for the various business display cards on the landing pages, will also be used for the booking page template

let businesses = [
    {
        name: 'Abiodun Adegbola',
        businessName: 'Adex Barbing Salon',
        location: 'Ikeja Lagos, Nigeria',
        work: 'Barbing | Hair Branding | Training',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 10.00,
        maxPrice: 60.00,
        rating: 4.5,
        shopImage : 'Images/img1.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.
        
Hygiene, comfort and customer satisfaction are at the core of everything we do. Our tools are properly sterilized after use and we maintain a calm, friendly enviroment where clients can relax while getting quality service. Every haircut is done with attention to detail, ensuring sharp finishing and long-lasting style`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
        
    },
    {
        name: 'Desola Ayomikun',
        businessName: 'Desxy Makeup Artist',
        location: 'Victoria Island, Lagos, Nigeria',
        work: 'Makeup | Auto Gele',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 20.00,
        maxPrice: 40.00,
        rating: 4.5,
        shopImage : 'Images/img2.jpg',
         bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.
        
Hygiene, comfort and customer satisfaction are at the core of everything we do. Our tools are properly sterilized after use and we maintain a calm, friendly enviroment where clients can relax while getting quality service. Every haircut is done with attention to detail, ensuring sharp finishing and long-lasting style`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'Dickson Davies',
        businessName: 'Dic Spas & Massage Centers',
        location: 'Magodo Estate Lagos, Nigeria',
        work: 'Spas | Massage',
        workDays: 'Monday - Friday',
        availability: 'Booking Available',
        minPrice: 10.00,
        maxPrice: 80.00,
        rating: 4.5,
        shopImage : 'Images/img3.jpg',
         bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'James Ruther',
        businessName: 'SDB Tattoo & Piercing Studio',
        location: 'Ikeja Lagos, Nigeria',
        work: 'Tattoo',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 10.00,
        maxPrice: 60.00,
        rating: 4.5,
        shopImage : 'Images/img4.jpg',
         bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'Daniel John',
        businessName: 'Daniel Psychologist & Counseling',
        location: 'Magodo Estate Lagos, Nigeria',
        work: 'Psychologist & Counselors',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 5.00,
        maxPrice: 600.00,
        rating: 4.5,
        shopImage : 'Images/img5.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'Chi Yun',
        businessName: 'Chi-Yun Martial Arts',
        location: 'Victoria Island Lagos, Nigeria',
        work: 'Martial Arts Coaches',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 20.00,
        maxPrice: 500.00,
        rating: 4.5,
        shopImage : 'Images/img6.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'Ben Davies',
        businessName: 'Tecnor Music Coach',
        location: 'Magodo Estate Lagos, Nigeria',
        work: 'Music Teachers',
        workDays: 'Monday - Friday',
        availability: 'Booking Available',
        minPrice: 10.00,
        maxPrice: 80.00,
        rating: 4.5,
        shopImage : 'Images/img7.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'Fido George',
        businessName: 'Fido Business Consultants',
        location: 'Ikeja Lagos, Nigeria',
        work: 'Business Consultants',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 100.00,
        maxPrice: 900.00,
        rating: 4.5,
        shopImage : 'Images/img8.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'Mobayo Demilade',
        businessName: 'Mobayo Photography Studio',
        location: 'Ikeja Lagos, Nigeria',
        work: 'Photography',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 10.00,
        maxPrice: 60.00,
        rating: 4.5,
        shopImage : 'Images/img9.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
     {
        name: 'Desola Ayomikun',
        businessName: 'Desxy Makeup Artist',
        location: 'Victoria Island, Lagos, Nigeria',
        work: 'Makeup | Auto Gele',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 20.00,
        maxPrice: 40.00,
        rating: 4.5,
        shopImage : 'Images/img2.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'James Adam',
        businessName: 'Blossen Skincare & Facial Clinic',
        location: 'Magodo Estate Lagos, Nigeria',
        work: 'Skincare & Facial Clinics',
        workDays: 'Monday - Friday',
        availability: 'Booking Available',
        minPrice: 10.00,
        maxPrice: 80.00,
        rating: 4.5,
        shopImage: 'Images/img10.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    },
    {
        name: 'Simi Bolaji',
        businessName: 'Simi Dental Clinics',
        location: 'Ikeja Lagos, Nigeria',
        work: 'Dental Clinics',
        workDays: 'Monday - Sunday',
        availability: 'Booking Available',
        minPrice: 10.00,
        maxPrice: 60.00,
        rating: 4.5,
        shopImage: 'Images/img11.jpg',
        bio : `Abiodun is a skilled barber with over 6 years of experience, specializing in clean fades, modern styles and classic cuts. He is known for his attention to detail, puntuality and excellent customer service`,
        description:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        direction:  `Our barbing salon is a modern and welcoming space dedicated to delivering clean, stylish and confidence-boosting haircuts for men and boys of all ages. We specialize in a wide range of services including classic cuts, modern fades, low cuts, beard grooming and custom styles tailored to each client's prefrence.`,
        ceoImage: 'Images/img32.png'
    }
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

    topRated.forEach(card=>{
        const revCard = document.createElement('div');
        revCard.className = 'top-rev-item';
        revCard.innerHTML = `
            <div class="top-header">
                        <img src="${card.shopImage}" alt="business image">
                        <div class="heart">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.0004 17.1999C22.0004 18.0999 21.7504 18.9499 21.3004 19.6699C20.4704 21.0599 18.9504 21.9999 17.2004 21.9999C15.4504 21.9999 13.9204 21.0599 13.1004 19.6699C12.6604 18.9499 12.4004 18.0999 12.4004 17.1999C12.4004 14.5499 14.5504 12.3999 17.2004 12.3999C19.8504 12.3999 22.0004 14.5499 22.0004 17.1999Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 8.69012C22 10.6601 21.49 12.4001 20.69 13.9101C19.81 12.9801 18.57 12.4001 17.2 12.4001C14.55 12.4001 12.4 14.5501 12.4 17.2001C12.4 18.4301 12.87 19.5501 13.63 20.4001C13.26 20.5701 12.92 20.7101 12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.69012C2 5.60012 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.98014 12 5.33014C13.01 3.98014 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.60012 22 8.69012Z" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="top-body">
                        <h2 class="bus-name">${card.businessName}</h2>
                        <div class="location">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                                <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.location}</p>
                        </div>
                        <div class="work-note">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 13H15" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 17H12" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.work}</p>
                        </div>
                        <div class="day-cal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.75 17.6001H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z" fill="#292D32"/>
                            </svg>
                            <p class="top-rev-text">${card.workDays}</p>
                        </div>
                        <div class="book-time-cont">
                            <div class="book-time">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p class="top-rev-text">${card.availability}</p>
                            </div>
                            <div class="rate-cont">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2977 2.63248L11.6177 5.27248C11.7977 5.63998 12.2777 5.99248 12.6827 6.05998L15.0752 6.45748C16.6052 6.71248 16.9652 7.82248 15.8627 8.91748L14.0027 10.7775C13.6877 11.0925 13.5152 11.7 13.6127 12.135L14.1452 14.4375C14.5652 16.26 13.5977 16.965 11.9852 16.0125L9.74268 14.685C9.33768 14.445 8.67018 14.445 8.25768 14.685L6.01518 16.0125C4.41018 16.965 3.43518 16.2525 3.85518 14.4375L4.38768 12.135C4.48518 11.7 4.31268 11.0925 3.99768 10.7775L2.13768 8.91748C1.04268 7.82248 1.39518 6.71248 2.92518 6.45748L5.31768 6.05998C5.71518 5.99248 6.19518 5.63998 6.37518 5.27248L7.69518 2.63248C8.41518 1.19998 9.58518 1.19998 10.2977 2.63248Z" fill="#FBC02D"/>
                                </svg>
                                <p class="top-rev-text">${card.rating}</p>
                            </div>
                        </div>
                    </div>
                    <div class="top-footer">
                        <p class="rev-range">From</p>
                        <div class="price-range">$${card.minPrice} - $${card.maxPrice}</div>
                        <p class="rev-range">Per Person</p>
                        <a href="./Auth/user-sign-in.html" class="log-rev">Explore / Book</a>
                    </div>
 `
       rateCont.appendChild(revCard);    
    })

    recommended.forEach(card=>{
        const revCard = document.createElement('div');
        revCard.className = 'top-rev-item';
        revCard.innerHTML = `
            <div class="top-header">
                        <img src="${card.shopImage}" alt="business image">
                        <div class="heart">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.0004 17.1999C22.0004 18.0999 21.7504 18.9499 21.3004 19.6699C20.4704 21.0599 18.9504 21.9999 17.2004 21.9999C15.4504 21.9999 13.9204 21.0599 13.1004 19.6699C12.6604 18.9499 12.4004 18.0999 12.4004 17.1999C12.4004 14.5499 14.5504 12.3999 17.2004 12.3999C19.8504 12.3999 22.0004 14.5499 22.0004 17.1999Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 8.69012C22 10.6601 21.49 12.4001 20.69 13.9101C19.81 12.9801 18.57 12.4001 17.2 12.4001C14.55 12.4001 12.4 14.5501 12.4 17.2001C12.4 18.4301 12.87 19.5501 13.63 20.4001C13.26 20.5701 12.92 20.7101 12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.69012C2 5.60012 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.98014 12 5.33014C13.01 3.98014 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.60012 22 8.69012Z" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="top-body">
                        <h2 class="bus-name">${card.businessName}</h2>
                        <div class="location">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                                <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.location}</p>
                        </div>
                        <div class="work-note">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 13H15" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 17H12" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.work}</p>
                        </div>
                        <div class="day-cal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.75 17.6001H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z" fill="#292D32"/>
                            </svg>
                            <p class="top-rev-text">${card.workDays}</p>
                        </div>
                        <div class="book-time-cont">
                            <div class="book-time">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p class="top-rev-text">${card.availability}</p>
                            </div>
                            <div class="rate-cont">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2977 2.63248L11.6177 5.27248C11.7977 5.63998 12.2777 5.99248 12.6827 6.05998L15.0752 6.45748C16.6052 6.71248 16.9652 7.82248 15.8627 8.91748L14.0027 10.7775C13.6877 11.0925 13.5152 11.7 13.6127 12.135L14.1452 14.4375C14.5652 16.26 13.5977 16.965 11.9852 16.0125L9.74268 14.685C9.33768 14.445 8.67018 14.445 8.25768 14.685L6.01518 16.0125C4.41018 16.965 3.43518 16.2525 3.85518 14.4375L4.38768 12.135C4.48518 11.7 4.31268 11.0925 3.99768 10.7775L2.13768 8.91748C1.04268 7.82248 1.39518 6.71248 2.92518 6.45748L5.31768 6.05998C5.71518 5.99248 6.19518 5.63998 6.37518 5.27248L7.69518 2.63248C8.41518 1.19998 9.58518 1.19998 10.2977 2.63248Z" fill="#FBC02D"/>
                                </svg>
                                <p class="top-rev-text">${card.rating}</p>
                            </div>
                        </div>
                    </div>
                    <div class="top-footer">
                        <p class="rev-range">From</p>
                        <div class="price-range">$${card.minPrice} - $${card.maxPrice}</div>
                        <p class="rev-range">Per Person</p>
                        <a href="./Auth/user-sign-in.html" class="log-rev">Explore / Book</a>
                    </div>
 `
       recommendCont.appendChild(revCard);    
    })

    recentAdd.forEach(card=>{
        const revCard = document.createElement('div');
        revCard.className = 'top-rev-item';
        revCard.innerHTML = `
            <div class="top-header">
                        <img src="${card.shopImage}" alt="business image">
                        <div class="heart">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.0004 17.1999C22.0004 18.0999 21.7504 18.9499 21.3004 19.6699C20.4704 21.0599 18.9504 21.9999 17.2004 21.9999C15.4504 21.9999 13.9204 21.0599 13.1004 19.6699C12.6604 18.9499 12.4004 18.0999 12.4004 17.1999C12.4004 14.5499 14.5504 12.3999 17.2004 12.3999C19.8504 12.3999 22.0004 14.5499 22.0004 17.1999Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 8.69012C22 10.6601 21.49 12.4001 20.69 13.9101C19.81 12.9801 18.57 12.4001 17.2 12.4001C14.55 12.4001 12.4 14.5501 12.4 17.2001C12.4 18.4301 12.87 19.5501 13.63 20.4001C13.26 20.5701 12.92 20.7101 12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.69012C2 5.60012 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.98014 12 5.33014C13.01 3.98014 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.60012 22 8.69012Z" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="top-body">
                        <h2 class="bus-name">${card.businessName}</h2>
                        <div class="location">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                                <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.location}</p>
                        </div>
                        <div class="work-note">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 13H15" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 17H12" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.work}</p>
                        </div>
                        <div class="day-cal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.75 17.6001H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z" fill="#292D32"/>
                            </svg>
                            <p class="top-rev-text">${card.workDays}</p>
                        </div>
                        <div class="book-time-cont">
                            <div class="book-time">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p class="top-rev-text">${card.availability}</p>
                            </div>
                            <div class="rate-cont">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2977 2.63248L11.6177 5.27248C11.7977 5.63998 12.2777 5.99248 12.6827 6.05998L15.0752 6.45748C16.6052 6.71248 16.9652 7.82248 15.8627 8.91748L14.0027 10.7775C13.6877 11.0925 13.5152 11.7 13.6127 12.135L14.1452 14.4375C14.5652 16.26 13.5977 16.965 11.9852 16.0125L9.74268 14.685C9.33768 14.445 8.67018 14.445 8.25768 14.685L6.01518 16.0125C4.41018 16.965 3.43518 16.2525 3.85518 14.4375L4.38768 12.135C4.48518 11.7 4.31268 11.0925 3.99768 10.7775L2.13768 8.91748C1.04268 7.82248 1.39518 6.71248 2.92518 6.45748L5.31768 6.05998C5.71518 5.99248 6.19518 5.63998 6.37518 5.27248L7.69518 2.63248C8.41518 1.19998 9.58518 1.19998 10.2977 2.63248Z" fill="#FBC02D"/>
                                </svg>
                                <p class="top-rev-text">${card.rating}</p>
                            </div>
                        </div>
                    </div>
                    <div class="top-footer">
                        <p class="rev-range">From</p>
                        <div class="price-range">$${card.minPrice} - $${card.maxPrice}</div>
                        <p class="rev-range">Per Person</p>
                        <a href="./Auth/user-sign-in.html" class="log-rev">Explore / Book</a>
                    </div>
 `
       recentCont.appendChild(revCard);    
    })

}

createCard();


}





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
                        <img src="${card.shopImage}" alt="business image">
                        <div class="heart">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.0004 17.1999C22.0004 18.0999 21.7504 18.9499 21.3004 19.6699C20.4704 21.0599 18.9504 21.9999 17.2004 21.9999C15.4504 21.9999 13.9204 21.0599 13.1004 19.6699C12.6604 18.9499 12.4004 18.0999 12.4004 17.1999C12.4004 14.5499 14.5504 12.3999 17.2004 12.3999C19.8504 12.3999 22.0004 14.5499 22.0004 17.1999Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 8.69012C22 10.6601 21.49 12.4001 20.69 13.9101C19.81 12.9801 18.57 12.4001 17.2 12.4001C14.55 12.4001 12.4 14.5501 12.4 17.2001C12.4 18.4301 12.87 19.5501 13.63 20.4001C13.26 20.5701 12.92 20.7101 12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.69012C2 5.60012 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.98014 12 5.33014C13.01 3.98014 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.60012 22 8.69012Z" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="top-body">
                        <h2 class="bus-name">${card.businessName}</h2>
                        <div class="location">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                                <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.location}</p>
                        </div>
                        <div class="work-note">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 13H15" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 17H12" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p class="top-rev-text">${card.work}</p>
                        </div>
                        <div class="day-cal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.75 17.6001H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z" fill="#292D32"/>
                            </svg>
                            <p class="top-rev-text">${card.workDays}</p>
                        </div>
                        <div class="book-time-cont">
                            <div class="book-time">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p class="top-rev-text">${card.availability}</p>
                            </div>
                            <div class="rate-cont">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.2977 2.63248L11.6177 5.27248C11.7977 5.63998 12.2777 5.99248 12.6827 6.05998L15.0752 6.45748C16.6052 6.71248 16.9652 7.82248 15.8627 8.91748L14.0027 10.7775C13.6877 11.0925 13.5152 11.7 13.6127 12.135L14.1452 14.4375C14.5652 16.26 13.5977 16.965 11.9852 16.0125L9.74268 14.685C9.33768 14.445 8.67018 14.445 8.25768 14.685L6.01518 16.0125C4.41018 16.965 3.43518 16.2525 3.85518 14.4375L4.38768 12.135C4.48518 11.7 4.31268 11.0925 3.99768 10.7775L2.13768 8.91748C1.04268 7.82248 1.39518 6.71248 2.92518 6.45748L5.31768 6.05998C5.71518 5.99248 6.19518 5.63998 6.37518 5.27248L7.69518 2.63248C8.41518 1.19998 9.58518 1.19998 10.2977 2.63248Z" fill="#FBC02D"/>
                                </svg>
                                <p class="top-rev-text">${card.rating}</p>
                            </div>
                        </div>
                    </div>
                    <div class="top-footer">
                        <p class="rev-range">From</p>
                        <div class="price-range">$${card.minPrice} - $${card.maxPrice}</div>
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






