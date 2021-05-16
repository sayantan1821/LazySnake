let inputDir = {x: 0, y: 0};
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio("./music/music.mp3");
musicSound.volume = 0.09;
moveSound.volume = 0.2
gameOverSound.volume = 0.2;
foodSound.volume = 0.2;

let speed = prompt("Please your snake's speed: ",7);
let userSpeed = speed;

let lastPrint = 0
let snakeArr = [
    {x: 13, y: 15}
];
let food = {
    x: 5,
    y: 7
};
let score = 0;
let subspeed = 0;

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPrint)/1000 < 1/speed){
        return;
    }
    lastPrint= ctime;
    gameEngine();
}
function isColide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}
function gameEngine () {
    if(isColide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press 'Space bar' to play again");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
        speed = userSpeed;
        subspeed = 0;
    }
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        score++;
        subspeed++;
        if(subspeed == 5) {
            speed++;
            subspeed = 0;
        }
        scoreBox.innerHTML = "Score : " + score;
        speedBox.innerHTML = "Speed : " + speed;
        if(score > hiscoreval) {
            let hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            
        }
        hiscoreBox.innerHTML = "High Score : " + hiscoreval;
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
    }
    for(let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    });
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
musicSound.play();
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}
    moveSound.play();
    switch (e.key) {
        case "ArrowUp" :
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown" :
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight" :
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})