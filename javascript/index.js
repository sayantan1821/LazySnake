let direction = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio("music.mp3");

function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime);
}

window.requestAnimationFrame(main);