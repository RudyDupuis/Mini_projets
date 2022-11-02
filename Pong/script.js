const racket = document.getElementById('racket');
const ball = document.getElementById('ball');
const score = document.getElementById('score');
const hightScore = document.getElementById('hightScore');
let scoreNumber = 0;
let hightScoreNumber = 0;

/*** Border ***/

function sideHit(){
    if(ball.offsetLeft < 15){
        ball.style.left = "100vw";                  //if the ball hits the left side it goes from the right                 
    }
    else if(ball.offsetLeft > ball.parentElement.clientWidth - 15){
        ball.style.left = "0vw";                    //if the ball hits the right side it goes from the left
    }
}

function TopBottomHit(){
    if(ball.offsetTop < 10){
        ball.style.bottom = "0vh";                  //if the ball hits the top side it goes from the bottom
        scoreNumber ++;
        score.textContent = scoreNumber; 
    }
    else if (ball.offsetTop > racket.offsetTop + 40){
        ball.style.bottom = "0vh";                  //if the ball goes under the racket
        score.innerHTML = "Perdu  ! <br> Votre score : " + scoreNumber; 
    }
}

/*** Racket ***/

function racketHitDesktop(){
    if(ball.offsetTop > racket.offsetTop - 10 && ball.offsetTop < racket.offsetTop + 40 && ball.offsetLeft < racket.offsetLeft + 100 && ball.offsetLeft > racket.offsetLeft - 100  ){

        ball.style.bottom = "100vh";               //the ball goes up
        
        if(ball.offsetLeft > racket.offsetLeft + 10){
            ball.style.left = "100vw";             //if the ball hits the right of racket side it goes from the left
        }
        else if(ball.offsetLeft < racket.offsetLeft - 10){
            ball.style.left = "0vw";               //if the ball hits the left side of racket it goes from the right
        }
    }
}

function racketHitMobile(){
    if(ball.offsetTop > racket.offsetTop - 10 && ball.offsetTop < racket.offsetTop + 40 && ball.offsetLeft < racket.offsetLeft + 50 && ball.offsetLeft > racket.offsetLeft - 50  ){

        ball.style.bottom = "100vh";               
        
        if(ball.offsetLeft > racket.offsetLeft + 2){
            ball.style.left = "100vw";             
        }
        else if(ball.offsetLeft < racket.offsetLeft - 2){
            ball.style.left = "0vw";               
        }
    }
}

function racketMovingDesktop(){
    document.addEventListener('mousemove', (e) => {
        if(e.pageX < 100){                              //avoid overflowing the window                                 
            racket.style.left = 100 + "px";
        }
        else if(e.pageX > window.innerWidth - 100){     //avoid overflowing the window
            racket.style.left = window.innerWidth -100 + "px";
        }
        else{
           racket.style.left = e.pageX + "px"; 
        }       
    });
}

function racketMovingMobile(){
    document.addEventListener('touchmove', (e) => {                                     
        if(e.touches.item(0).clientX < 50){                                                               
            racket.style.left = 50 + "px";
        }
        else if(e.touches.item(0).clientX > window.innerWidth - 50){    
            racket.style.left = window.innerWidth -50 + "px";
        }
        else{
           racket.style.left = e.touches.item(0).clientX + "px"; 
        }       
    });
}

/*** Ball ***/

function ballSpeed(){
    switch (scoreNumber){
        case 5:
            ball.style.transition = "4s ease-out";
            ball.style.background = "gray"
            
        break;
        case 10:
            ball.style.transition = "3s ease-out";
            ball.style.background = "#b85042"
            
        break;
        case 15:
            ball.style.transition = "2s ease-out";
            ball.style.background = "#811709"
            
        break;
        case 20:
            ball.style.transition = "1s ease-out";
            ball.style.background = "black"
        break;
    }
}

function ballInvisible(){
    if (scoreNumber == 9 || scoreNumber == 14 ){
        ball.style.background = "transparent";
    }
}

function ballStart() {
    ball.style.bottom = "0vh";                          //the ball goes down
    ball.style.left = "53vw";                           //to counter the dont moving start
}

/*** Restart ***/

restart.addEventListener('click', () => {               //button retart
    ball.style.transition = "none";
    ball.style.background = "#007FA9";
    ball.style.bottom = "50vh";
    ball.style.left = "50vw";                           //replace the ball at center

    if(hightScoreNumber < scoreNumber){
        hightScoreNumber = scoreNumber;
        hightScore.innerText = "Meilleur score : " + hightScoreNumber;
    }

    scoreNumber = 0;
    score.innerHTML = "";                               //erase the texte in the middle

    setTimeout( ()=> {
        ball.style.transition = "5s ease-out";
        ballStart();
    } , 1000 ); 
    
})

/***** GAME *****/

ballStart();

setInterval( ()=> {
    sideHit();
    TopBottomHit();
    ballSpeed();
    ballInvisible();
} , 50 );

if (window.matchMedia('(min-width: 800px) and (orientation: landscape)').matches){
    racketMovingDesktop();

    setInterval( ()=> {
        racketHitDesktop();
    } , 50 );  

}else{
    racketMovingMobile();

    setInterval( ()=> {
        racketHitMobile();
    } , 50 );

}

   
   



      
