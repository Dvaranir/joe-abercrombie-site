'use-strict'

const navPanel = document.querySelector('.nav--panel');

const scrollToSection = function(btn, section) {
    btn.addEventListener('click', function(e) {
    e.preventDefault();
    section.scrollIntoView({behavior: 'smooth', block: "center"});
    })
};

navPanel.addEventListener('click', function(e){
    e.preventDefault();
    if(!e.target.classList.contains('nav--btn')) return;
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth', block: "center"})

})


