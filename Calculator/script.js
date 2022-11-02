const firstPart = document.getElementById('firstPart');                                 
const symbolPart = document.getElementById('symbolPart');
const secondPart = document.getElementById('secondPart');                                  //part of result

let resultFirstPart = 0;
let symbol = 0;
let commaUse = false;

const numberList = document.querySelectorAll('.number');
const comma = document.querySelector('.comma');
const symbolList = document.querySelectorAll('.symbol');

const AC = document.getElementById('AC');
const enter = document.getElementById('enter');

function textVisible() {
    for (let i=0; i<10; i++){
        numberList[i].style.color = '#EEEEEE';
    }
    comma.style.color = '#EEEEEE';
}

function eraseAll() {
    firstPart.textContent = "";
    symbolPart.textContent = "";                                                        
    resultFirstPart = 0;
    symbol = 0;
    commaUse = false;
    textVisible();
}


for (let i=0; i<10; i++){                           
    numberList[i].addEventListener('click', ()=>{                                            //create number key
        if (secondPart.textContent.length < 11){
            secondPart.textContent = secondPart.textContent + numberList[i].textContent;     //add key number in secondPart
        }
        else{
            for (let i=0; i<11; i++){
                numberList[i].style.color = '#393E46';                                       //hide number key
            }
        }
    })
}

comma.addEventListener('click', ()=>{
    if(commaUse === false){
        secondPart.textContent = secondPart.textContent + comma.textContent;                //add comma in secondPart
        commaUse = true;
        comma.style.color = '#393E46';
    }
})


for (let i=0; i<4; i++){
    symbolList[i].addEventListener('click', ()=>{                                        //create symbol key
        if (secondPart.textContent !== "" && secondPart.textContent !== "." && secondPart.textContent !== "-" && symbol === 0){
            textVisible();
            resultFirstPart = parseFloat(secondPart.textContent);                           
            firstPart.textContent = resultFirstPart;                                        //save secondPart's number in resultFirstPart
            symbol = symbolList[i].innerText;                                                //save symbol in symbol
            symbolPart.textContent = symbol;                                                //show symbol in symbolPart
            secondPart.textContent = "";
            commaUse = false;                                                    //erase secondPart
        }else if (symbolList[i].innerText == '-' && secondPart.textContent === "") {                             
            secondPart.textContent = symbolList[i].textContent;                              //add negative number 
        }
    })
}

AC.addEventListener('click', ()=>{
    eraseAll();
    secondPart.textContent = "";
})


enter.addEventListener('click', ()=>{
    if(secondPart.textContent !== "" && secondPart.textContent !== "-"){
        switch(symbol){
            case'+':                                                                                //for addition
                secondPart.textContent = resultFirstPart + parseFloat(secondPart.textContent);      //calculates resultFirstPart and resultSecondPart
                eraseAll();
            break;
            case'-':
                secondPart.textContent = resultFirstPart - parseFloat(secondPart.textContent);
                eraseAll();
            break;
            case'/':
                secondPart.textContent = resultFirstPart / parseFloat(secondPart.textContent);
                eraseAll();
            break;
            case'*':
                secondPart.textContent = resultFirstPart * parseFloat(secondPart.textContent);
                eraseAll();
            break;
        }   
    }
})