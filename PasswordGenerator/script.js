const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lowercases = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const uppercases = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const specialCharacters = [".", ",", "!", "*", "_", "-", "?", "#"];

const characters = [numbers, lowercases, uppercases, specialCharacters];

function newPassword(){
    let password = "";
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/gm;

    for (let i = 0; i < 14; i++) {
        let characterType = Math.floor(Math.random() * 4);
        password += characters[characterType][Math.floor(Math.random() * characters[characterType].length)];
    }

    if(regex.test(password) == false){
        newPassword();
    }
    else{
       display.value = password;

       display.select();
       document.execCommand('copy');
       
       create.value = "Mot de passe copié";
       create.setAttribute("disabled", "");
       setTimeout(() => {
            create.value = "Nouveau mot de passe";
            create.removeAttribute("disabled", "");
       }, 1000);
    }
}

create.addEventListener('click', newPassword); 