const buttons = document.querySelectorAll('.button');
const descriptions = document.querySelectorAll('.description');
const cards = document.querySelectorAll('.card');

for(let i=0; i < 2; i++){
    buttons[i].addEventListener ('click', () => {
        buttons[i].remove();
        cards[i].style.height = "100%";
        descriptions[i].style.transform = "translateY(0px)";
        descriptions[i].style.transition = "transform 0.5s";
    })
}