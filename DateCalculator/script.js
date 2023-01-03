const form = document.querySelector('form');
const total = document.getElementById('total');

function dateFormatInput(date){
     return date.toISOString().split("T")[0];
}

function calcTomorrow(date){
    date.setDate(date.getDate() + 1);
    return date;
}

function calcPrice(){
    let diffTime = Math.abs(new Date(end.value) - new Date(start.value));
    let diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDay;
}


let today = dateFormatInput(new Date());

start.value = today;
start.min = today;

let tomorrow = dateFormatInput(calcTomorrow(new Date()));

end.value = tomorrow;
end.min = tomorrow;

start.addEventListener('change', (e) => {
    end.min = dateFormatInput(calcTomorrow(new Date(start.value)));

    if(end.value < start.value){
        let tomorrowdate = dateFormatInput(calcTomorrow(new Date(e.target.value)));
        end.value = tomorrowdate;
    }

    total.textContent = calcPrice() * 46
})

end.addEventListener('change', () => {
    total.textContent = calcPrice() * 46
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
})