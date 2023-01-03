background = document.querySelector('body');
h1 = document.querySelector('h1');

document.addEventListener('click', () => {
    let red = Math.floor(Math.random() * 250);
    let green = Math.floor(Math.random() * 250);
    let blue = Math.floor(Math.random() * 250);

    background.style.background = `rgb(${red}, ${green}, ${blue})`;
    h1.innerHTML = `rgb(${red}, ${green}, ${blue})`;
})