countdown = document.querySelector('h1');
time = document.querySelector('form');
let minute = 0;
let seconde = 1;

time.addEventListener("submit", (e) => {
    e.preventDefault();
    minute = e.target[0].value;
    seconde = 1;
    e.target[0].value = "";
})

setInterval(() => {
    if(minute > -1){
        seconde --;
        seconde = seconde < 10 ? "0" + seconde : seconde; 
        if(seconde == 0){
            seconde = 59;
            minute --;
        }
        countdown.innerHTML = `${minute} : ${seconde}`;
    }
    else{
        countdown.innerHTML = `0 : 00`;
    }
}, 1000);
