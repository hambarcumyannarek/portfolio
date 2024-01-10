const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('active', window.scrollY > 0);
})


const responsiveMenu = document.querySelector('.responsiveMenu');
const linkBg = responsiveMenu.querySelectorAll('.linkBg');
const menuBtn = navbar.querySelector('.menuBtn');
const closeBtn = responsiveMenu.querySelector('.closeBtn');

closeBtn.addEventListener('click', () => {
    responsiveMenu.classList.remove('active');
    document.body.style.overflowY = 'auto';
    document.body.style.marginRight = '0';
    navbar.style.paddingRight = '20px';
});

responsiveMenu.addEventListener('click', (e) => {
    if(e.target.className.search('responsiveMenu') !== -1) {
        responsiveMenu.classList.remove('active');
        document.body.style.overflowY = 'auto';
        document.body.style.marginRight = '0';
        navbar.style.paddingRight = '20px';
    }
})
menuBtn.addEventListener('click', () => {
    responsiveMenu.classList.add('active');
    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = '17px';
    navbar.style.paddingRight = '37px';
})

linkBg.forEach(val => {
    val.addEventListener('click', () => {
        val.classList.toggle('active');
    })
})
    


const darkBtn = document.querySelectorAll('.darkBtn');

darkBtn.forEach(btn => {
    btn.addEventListener('change', () => {
        document.body.classList.toggle('darkMode');
        darkBtn.forEach(btn => btn.classList.toggle('active'))
        const logo = document.querySelectorAll('.logo img');
        if(document.body.className.search('darkMode') !== -1) {
            return logo.forEach(img => {
                img.src = '/images/logo-white.png';
            })
        }
        logo.forEach(img => {
            img.src = '/images/logo-black.png';
        })
    })
})
    


// loading

const loadingContainer = document.querySelector('.circutSection');

window.addEventListener('load', function() {
    document.body.classList.add('loaded')
});
