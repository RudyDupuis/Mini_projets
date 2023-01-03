const addToDo = document.getElementById("addToDo");
const form = document.querySelector("form");
const listToDo = document.getElementById("listToDo");

if(window.localStorage.todolist != undefined){
    listToDo.innerHTML = window.localStorage.todolist;
}

function storeList() {
    window.localStorage.todolist = listToDo.innerHTML;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(addToDo.value != "" && listToDo.children.length < 20){
        listToDo.innerHTML += `<li>${addToDo.value}</li>`;
        addToDo.value = "";
        storeList();
    }
})

listToDo.addEventListener('click', (e) => {
    if(e.target.className == 'checked'){
        e.target.remove();
        storeList();
    }
    else{
        e.target.classList.add('checked');
    }
})   