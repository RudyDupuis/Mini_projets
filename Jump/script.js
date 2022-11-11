const ball = document.getElementById('ball');
const gameWindow =document.getElementById('game-window');
const floors = document.querySelectorAll('.floor');
const scoreBox = document.getElementById('score');
const score = document.getElementById('score');
const hightScore = document.getElementById('hightScore');
let scoreCounter = 0;
let hightScoreNumber = 0;

const gameWindowWidth = ()=>{return parseInt(window.getComputedStyle(gameWindow).getPropertyValue("width"))};
const ballBottom = ()=>{return parseInt(window.getComputedStyle(ball).getPropertyValue("bottom"))};
const ballRight = ()=>{return parseInt(window.getComputedStyle(ball).getPropertyValue("right"))};
const floorHeight0 = ()=>{return parseInt(window.getComputedStyle(floors[0]).getPropertyValue("height"))};
const floorRight0 = ()=>{return parseInt(window.getComputedStyle(floors[0]).getPropertyValue("right"))};
const floorHeight1 = ()=>{return parseInt(window.getComputedStyle(floors[1]).getPropertyValue("height"))};
const floorRight1 = ()=>{return parseInt(window.getComputedStyle(floors[1]).getPropertyValue("right"))};
const floorHeight2 = ()=>{return parseInt(window.getComputedStyle(floors[2]).getPropertyValue("height"))};
const floorRight2 = ()=>{return parseInt(window.getComputedStyle(floors[2]).getPropertyValue("right"))};

let floorBall = 100;
let floorSpeed = 10;
let floorSpeedStart = 5;

let dontFall = false;
let dontClick = false;
let counter = true;
let speed = true;

/*** Fonctions ****/

floorCreation = () => {
    let limit = gameWindowWidth() -10;

    heightRandom = (mathRandom) => {
        let heightRandomNumber = 0;

        if(mathRandom < 0.3){
            heightRandomNumber = 100;
        }
        else if(mathRandom < 0.6){
            heightRandomNumber = 200;
        }
        else{
            heightRandomNumber = 300;
        }

        return heightRandomNumber;
    }

    for(let i = 0; i < 3; i++){
        let j = 0;

        switch(i){                                      //j is the second block after i
            case 0 : j = 2; break;
            case 1 : j = 0; break;
            case 2 : j = 1; break;
        }

        if(parseInt(window.getComputedStyle(floors[i]).getPropertyValue("right")) > limit){   //floor i right(css) >
            floors[j].style.height = heightRandom(Math.random()) + "px";           //The height of floor j is random
            floors[j].style.transition = "right " + floorSpeed + "s linear";           //Transition is 2 times greater because the distance is double
            floors[j].style.right = gameWindowWidth() + "px";              //floor j goes left of gameWindow
            floors[i].style.transition = "none";
            floors[i].style.right = -gameWindowWidth() + "px";             //floor i goes right of gameWindow
        }
    }
}

ballFloorInteraction = () => {
    if(dontFall == false){                                  //inactive if the jump is in progress
      ball.style.bottom = floorBall + "px";  
    }

    for(let i = 0; i < 3; i++){
        let j = 0;

        switch(i){                                      //j is the block after i
            case 0 : j = 1; break;
            case 1 : j = 2; break;
            case 2 : j = 0; break;
        }

        if(parseInt(window.getComputedStyle(floors[i]).getPropertyValue("right")) > ballRight() + 40){    //floor i right(css) >               
            if(ballBottom() < parseInt(window.getComputedStyle(floors[j]).getPropertyValue("height"))){                   
                lose();
            }
            //Take the value of the floor block if it is below the ball
            floorBall = parseInt(window.getComputedStyle(floors[j]).getPropertyValue("height"));         //floor j height(css)

            if(counter){
                scoreCounter++;
                scoreBox.innerHTML = "<h2>" + scoreCounter + "</h2>";
                counter = false;                                                            
                setTimeout(() => { counter = true; }, 1000);      //So that the counter only works once with var counter
            }
        }
    }
}

floorSpeedFunction = () => {
    floorSpeedFunctionBase = () => {
        speed = false;
        floorBall = 100;
        floorStart();
        setTimeout(() => {                                      //delay for it to work with var speed
            speed = true;
            "<h2>" + scoreCounter + "</h2>"
        }, 5000);
    }

    switch (scoreCounter){
        case 5 :
            if(speed){
                floorSpeed = 6;
                floorSpeedStart = 3;
                scoreBox.innerHTML = "<h2>" + scoreCounter + "</h2> <h3>On accélère !</h3>";
                floorSpeedFunctionBase();
                ball.style.animation = "rotate 1s linear infinite";
            }
            
        break;
        case 10 :
            if(speed){
                floorSpeed = 4;
                floorSpeedStart = 2;
                scoreBox.innerHTML = "<h2>" + scoreCounter + "</h2> <h3>Encore plus vite !</h3>";
                floorSpeedFunctionBase();
                ball.style.animation = "rotate 0.5s linear infinite";
            }
        break;
        case 20 :
            if(speed){
                floorSpeed = 2;
                floorSpeedStart = 1;
                scoreBox.innerHTML = "<h2>" + scoreCounter + "</h2> <h3>Bonne chance !</h3>";
                floorSpeedFunctionBase();
                ball.style.animation = "rotate 0.3s linear infinite";
            }
        break;
    }
}

floorStart = () => {
    ball.style.animation = "rotate 2s linear infinite";
    floors[0].style.transition = "none";
    floors[1].style.transition = "none";
    floors[2].style.transition = "none";
    floors[0].style.right = "0px";                        //floor0 take the width of gameWindow
    floors[0].style.height = "100px";
    floors[1].style.right = -gameWindowWidth() + "px";    
    floors[2].style.right = -gameWindowWidth() + "px";    //floor1 and floor2 are to the right of gameWindow
    floors[0].style.transition = "right " + floorSpeedStart + "s linear"
    
    setTimeout(() => {
        floors[0].style.right = gameWindowWidth() + "px";              //After 100ms floor0 goes left of gameWindow
        floors[1].style.height = "200px";
        floors[1].style.transition = "right " + floorSpeed + "s linear"                //Transition is 2 times greater because the distance is double
        floors[1].style.right = gameWindowWidth() + "px";              //floor1 goes left of gameWindow
    }, 100);
}

lose = () => {
    dontClick = true;
    clearInterval(currentGameInt);
    ball.style.animation = "scaleX03 0.2s linear forwards";
    ball.style.bottom = ballBottom() + "px";
    counter = false;
    speed = false;                                                   
    floors[0].style.right = floorRight0() + "px";                           //to stop floors and that it does not move
    floors[1].style.right = floorRight1() + "px";
    floors[2].style.right = floorRight2() + "px";
    scoreBox.innerHTML = "<h1>Perdu !</h1> <h2>" + scoreCounter + "</h2>";
}

currentGame = () => {
    if(document.hasFocus() == false){                               //Lose if document is not in focus
        lose();
    }

    floorCreation();
    ballFloorInteraction();
    floorSpeedFunction();
}

/*** Restart ***/

restart.addEventListener('click', () => {
    lose();

    if(hightScoreNumber < scoreCounter){
        hightScoreNumber = scoreCounter;
        hightScore.innerText = "Meilleur score : " + hightScoreNumber;
    }

    scoreNumber = 0;
    score.innerHTML = "";                               //erase the texte in the middle
    scoreCounter = 0;
    counter = true;
    dontClick = false;
    speed = true;
    floorBall = 100;
    floorSpeed = 10;
    floorSpeedStart = 5;
    floorStart();

    const currentGameInt = setInterval(currentGame, 1);   
})


/***** GAME *****/

/*** Jump ***/

document.addEventListener('click', () => {
    if(dontClick == false){
        ball.style.bottom = floorBall + 300 + "px";         //The ball takes the height of the floor and rises 300px higher
        dontFall = true;
        dontClick = true;                                   //dontFall and dontClick are true during the animation                  
      
        setTimeout(() => {
            ball.style.bottom = floorBall + "px";           //The ball returns to the floor
            dontFall = false;
        }, 700);
      
        setTimeout(() => {
            dontClick = false;
        }, 1200);
    }
})

/*** Current Game ***/

floorStart();
const currentGameInt = setInterval(currentGame, 1);

