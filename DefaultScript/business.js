

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

