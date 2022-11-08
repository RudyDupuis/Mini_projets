/*****  Menu Top *****/

const menuTop = document.querySelector('.menu-top');
const menuButton = document.querySelector('.menu-top-button');

menuButton.addEventListener('click', () => {
    menuTop.classList.toggle("menu-top-open");
    menuButton.classList.toggle("menu-top-button-open");
})

/***** Anchor ******/

const anchor = document.querySelector('.anchor');

document.addEventListener('scroll', ()=>{
    if(window.scrollY > 200){
        anchor.style.display = "flex";
    }else{
        anchor.style.display = "none";
    }
})

/***** Notification *****/

const notification = document.querySelector('.notification');
const notificationCross = document.querySelector('.notification span');

notificationCross.addEventListener('click', () => {
    notification.style.transform = "translateY(250px)";                     //the notification goes down
})

/*****  Accordion *****/
//nojs

/***** Carousel ******/
//nojs

/***** Modal ******/

const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal-button');
const modalCross = document.querySelector('.modal-cross');

modalButton.addEventListener('click', () => {
    modal.style.display = "block";
})
modalCross.addEventListener('click', () => {
    modal.style.display = "none";
})

/***** Loader ******/

const loader = document.querySelector('.loader');
const loaderButton = document.querySelector('.loader-button');

loaderButton.addEventListener('click', () => {
    loader.classList.add('loader-open');

    setTimeout( ()=> {
        loader.classList.add('loader-close');
    } , 5000 ) ;

    setTimeout( ()=> {
        loader.classList.remove('loader-open', 'loader-close');
    }, 8000) ;
})

/***** Card ******/

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.children[1].addEventListener('click', () => {
        card.classList.add("card-open");
    })
})

