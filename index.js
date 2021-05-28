let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
let highScoreVal;
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let snakeElement, foodElement;
let food = { x: 12, y: 14 };
const scoreBoard = document.getElementById("score");
const highScoreBox = document.getElementById("hi-score");

function main(ctime) {
    requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed)
        return;
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}

function isCollide(sarr) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; ++i) {
        if (sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y)
            return true;
    }
    if (snakeArr[0].x <= 0 || snakeArr[0].x >= 19 || snakeArr[0].y >= 19 || snakeArr[0].y <= 0)
        return true;
    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array and food 
    scoreBoard.innerHTML = "Score : " + score;
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "Hi Score : " + highScoreVal;
            alert("New High Score : " + highScoreVal);
        }
        alert("Game Over!! Press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }
    // If you have eaten the food increment the score and regenerate the food 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        ++score;
        scoreBoard.innerHTML = "Score : " + score;
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 18 + 1) };
    }

    // Moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; --i) {
        snakeArr[i + 1].x = snakeArr[i].x;
        snakeArr[i + 1].y = snakeArr[i].y
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // Part 2: Display the snake and Food
    // Display the snake 
    let board = document.getElementById("board");
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0)
            snakeElement.classList.add("snake-head");
        else
            snakeElement.classList.add("snake-body");
        board.appendChild(snakeElement);
    });
    // Display the food 
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
    highScoreVal = 0
    localStorage.setItem("hiScore", JSON.stringify(highScoreVal));
}
else {
    highScoreVal = JSON.parse(hiScore);
    highScoreBox.innerHTML = "Hi Score : " + highScoreVal;
}
requestAnimationFrame(main);
document.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 };//Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("UP");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("DOWN");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("LEFT");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("RIGHT");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});