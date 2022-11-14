/*** Register Form ***/

const registerForm = document.getElementById('registerForm');
const registerInputs = [registerForm.userId, registerForm.email, registerForm.password];
const registerMessage = {
    userId : "Doit contenir au moins 5 caractères.",
    email : "Format d'email non valide.",
    password : "Doit contenir une minuscule, une majuscule, un chiffre et au moins 8 caractères.",
}

registerInputs.forEach((input) => {
    input.addEventListener("change", () => {
        if(! input.validity.patternMismatch){
            input.style.borderBottom = "2px solid green";
            input.setCustomValidity("");
        }
        else{
            input.style.borderBottom = "2px solid red";
            input.setCustomValidity(registerMessage[input.name]);
        }
    })
})

/*** Contact Form ***/

const contactForm = document.getElementById('contactForm');

contactForm.email.addEventListener("change", () => {
    if(! contactForm.email.validity.patternMismatch){
        contactForm.email.style.borderBottom = "2px solid green";
        contactForm.email.setCustomValidity("");
    }
    else{
        contactForm.email.style.borderBottom = "2px solid red";
        contactForm.email.setCustomValidity("Format d'email non valide.");
    }
})

/*** Sales Form ***/

const salesForm = document.getElementById('salesForm');
const salesInputs = [salesForm.firstName, salesForm.lastName, salesForm.street, salesForm.postal, salesForm.town, salesForm.email, salesForm.phone,];
const salesMessage = {
    firstName : "Ne doit pas contenir de chiffre, d'espace ni de caractères spéciaux. (3 caractères minimun)",
    lastName : "Ne doit pas contenir de chiffre, d'espace ni de caractères spéciaux. (2 caractères minimun)",
    street : "Ne doit pas contenir de caractères spéciaux. (3 caractères minimun)",
    postal : "Doit contenir 5 chiffres.",
    town : "Ne doit pas contenir de chiffre ni de caractères spéciaux. (3 caractères minimun)",
    email : "Format d'email non valide.",
    phone : "Numéro français uniquement.",
}

salesInputs.forEach((input) => {
    input.addEventListener("change", () => {
        if(! input.validity.patternMismatch){
            input.style.borderBottom = "2px solid green";
            input.setCustomValidity("");
        }
        else{
            input.style.borderBottom = "2px solid red";
            input.setCustomValidity(salesMessage[input.name]);
        }
    })
})

/*** Comment Form ***/

const commentForm = document.getElementById('commentForm');

commentForm.pseudo.addEventListener("change", () => {
    if(! commentForm.pseudo.validity.patternMismatch){
        commentForm.pseudo.style.borderBottom = "2px solid green";
        commentForm.pseudo.setCustomValidity("");
    }
    else{
        commentForm.pseudo.style.borderBottom = "2px solid red";
        commentForm.pseudo.setCustomValidity("Doit contenir au moins 5 caractères.");
    }
})

