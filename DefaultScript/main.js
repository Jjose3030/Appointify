

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
        }, 10000);
    }

    moveSlide(currentSlide);
    startmove();

// Card template for rendering a business card (used by landing page and service page)
function buildCardHTML(biz) {
    const name = biz.companyName || biz.name || 'Business';
    const image = biz.image || 'Images/img6.png';
    const address = biz.address || 'Location varies';
    const category = biz.category || biz.job || 'General Services';
    const workDays = biz.workingDays || biz.work || 'Mon - Sat';
    const availability = biz.workingHours || 'Booking Available';
    const rating = biz.rating || '5.0';
    const minPrice = biz.minPrice || biz.slotDuration || '20';
    const maxPrice = biz.maxPrice || '100';

    return `
        <div class="top-header">
            <img src="${image}" alt="business image">
            <div class="heart">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.0004 17.1999C22.0004 18.0999 21.7504 18.9499 21.3004 19.6699C20.4704 21.0599 18.9504 21.9999 17.2004 21.9999C15.4504 21.9999 13.9204 21.0599 13.1004 19.6699C12.6604 18.9499 12.4004 18.0999 12.4004 17.1999C12.4004 14.5499 14.5504 12.3999 17.2004 12.3999C19.8504 12.3999 22.0004 14.5499 22.0004 17.1999Z" stroke="" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.3301 17.2L16.5101 18.38L19.0701 16.02" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 8.69012C22 10.6601 21.49 12.4001 20.69 13.9101C19.81 12.9801 18.57 12.4001 17.2 12.4001C14.55 12.4001 12.4 14.5501 12.4 17.2001C12.4 18.4301 12.87 19.5501 13.63 20.4001C13.26 20.5701 12.92 20.7101 12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.69012C2 5.60012 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.98014 12 5.33014C13.01 3.98014 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.60012 22 8.69012Z" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div class="top-body">
            <h2 class="bus-name">${name}</h2>
            <div class="location">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke="#292D32" stroke-width="1.5"/>
                    <path d="M9.25 11.5L10.75 13L14.75 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="top-rev-text">${address}</p>
            </div>
            <div class="work-note">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 13H15" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 17H12" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="top-rev-text">${category}</p>
            </div>
            <div class="day-cal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 2V5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.75 17.6001H3.25" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z" fill="#292D32"/>
                </svg>
                <p class="top-rev-text">${workDays}</p>
            </div>
            <div class="book-time-cont">
                <div class="book-time">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="top-rev-text">${availability}</p>
                </div>
                <div class="rate-cont">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2977 2.63248L11.6177 5.27248C11.7977 5.63998 12.2777 5.99248 12.6827 6.05998L15.0752 6.45748C16.6052 6.71248 16.9652 7.82248 15.8627 8.91748L14.0027 10.7775C13.6877 11.0925 13.5152 11.7 13.6127 12.135L14.1452 14.4375C14.5652 16.26 13.5977 16.965 11.9852 16.0125L9.74268 14.685C9.33768 14.445 8.67018 14.445 8.25768 14.685L6.01518 16.0125C4.41018 16.965 3.43518 16.2525 3.85518 14.4375L4.38768 12.135C4.48518 11.7 4.31268 11.0925 3.99768 10.7775L2.13768 8.91748C1.04268 7.82248 1.39518 6.71248 2.92518 6.45748L5.31768 6.05998C5.71518 5.99248 6.19518 5.63998 6.37518 5.27248L7.69518 2.63248C8.41518 1.19998 9.58518 1.19998 10.2977 2.63248Z" fill="#FBC02D"/>
                    </svg>
                    <p class="top-rev-text">${rating}</p>
                </div>
            </div>
        </div>
        <div class="top-footer">
            <p class="rev-range">From</p>
            <div class="price-range">$${minPrice} - $${maxPrice}</div>
            <p class="rev-range">Per Person</p>
            <a href="./Auth/user-sign-in.html" class="log-rev">Explore / Book</a>
        </div>
    `;
}

// Render cards into a container from API data
function renderCardsToContainer(items, container) {
    if (!container || !items) return;
    items.forEach(function(biz) {
        const revCard = document.createElement('div');
        revCard.className = 'top-rev-item';
        revCard.innerHTML = buildCardHTML(biz);
        container.appendChild(revCard);
    });
}

// Fetch businesses from API and populate landing page sections
const rateCont = document.querySelector('.top-rate-cont');
const recommendCont = document.querySelector('.recommend-cont');
const recentCont = document.querySelector('.recent-cont');

if (rateCont || recentCont || recommendCont) {
    (async function () {
        try {
            if (typeof ApiService === 'undefined' || !ApiService.getBusinesses) return;

            const allBiz = await ApiService.getBusinesses();
            if (!allBiz || allBiz.length === 0) return;

            // Split businesses among the three sections
            const topRated = allBiz.slice(0, Math.min(4, allBiz.length));
            const recentAdd = allBiz.slice(4, Math.min(8, allBiz.length));
            const recommended = allBiz.slice(8, Math.min(12, allBiz.length));

            // If not enough businesses, reuse data for other sections
            if (rateCont) renderCardsToContainer(topRated, rateCont);
            if (recentCont) renderCardsToContainer(recentAdd.length > 0 ? recentAdd : topRated, recentCont);
            if (recommendCont) renderCardsToContainer(recommended.length > 0 ? recommended : topRated, recommendCont);

            // Re-attach heart toggle listeners after cards are rendered
            document.querySelectorAll('.heart').forEach(function(h) {
                h.addEventListener('click', function() { h.classList.toggle('active'); });
            });
        } catch (err) {
            // Silently fail — sections stay empty
        }
    })();
}


// Service landing page display cards — fetch from API
const serviceCont = document.querySelector('.service-cont');

if (serviceCont) {
    (async function () {
        try {
            if (typeof ApiService === 'undefined' || !ApiService.getBusinesses) return;

            const allBiz = await ApiService.getBusinesses();
            if (!allBiz || allBiz.length === 0) {
                serviceCont.textContent = 'No services found.';
                return;
            }

            renderCardsToContainer(allBiz, serviceCont);

            // Re-attach heart toggle listeners
            document.querySelectorAll('.heart').forEach(function(h) {
                h.addEventListener('click', function() { h.classList.toggle('active'); });
            });
        } catch (err) {
            serviceCont.textContent = 'Failed to load services. Please try again later.';
        }
    })();
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






