let direction = {x: 0, y: 0};
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio("../music/music.mp3");

let speed = 2;
let lastPrint = 0
let snakeArr = [
    {x: 13, y: 15}
];
food = {
    x: 5,
    y: 7
};
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPrint)/1000 < 1/speed){
        return;
    }
    lastPrint= ctime;
    gameEngine();
}
function gameEngine () {
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index == 0) {
            snakeElement.classList.add('head');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);