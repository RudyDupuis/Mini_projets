const suggestion = [" une page web.", " une suite de ligne de code.", " un peu inutile."];
const typingPlace = document.querySelector('h1');
let suggestionNumber = 0;
let finish = 0;

function textTyping (suggestionNumber){
    for(let i = 0; i < suggestion[suggestionNumber].length; i++){
        setTimeout(() => {
            typingPlace.innerHTML += `<span id = "textTyping${i}">${suggestion[suggestionNumber][i]}</span>`;
            finish ++;
        }, i*100);
    }
}

setInterval(() => {
    if (finish == suggestion[suggestionNumber].length) {
        suggestionNumber ++;
        let id = finish-1;
        let time = finish*50;

        for(let i = 0; i < finish; i++){
            setTimeout(() => {
                document.getElementById(`textTyping${id}`).remove();
                id --;
            }, i*50);
            
        }

        setTimeout(() => {
            finish = 0;
            // typingPlace.textContent = "";
            
            if(suggestionNumber == suggestion.length){
                suggestionNumber = 0;
            }
    
            textTyping (suggestionNumber); 
        }, time);
    } 
}, 5000);

textTyping (suggestionNumber);

