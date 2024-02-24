//game constants and variables
let inputDir = {x:0, y:0};
const foodSound = new Audio('food.mp3');
const gameOversound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('muxic.mp3');
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let snakearr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

//game functioins
function main(ctime){
    window.requestAnimationFrame(main);
   // console.log(ctime)
    //dividing by 1000 coz it will be in mili seconds
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if snake bumps to itself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }     
    }
    //if snake bumps wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}

function gameEngine(){
    //Part 1 :updating the sanke array and food
    if(isCollide(snakearr)){
        gameOversound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game OVer. Press Ok to start again");
        snakearr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    /// if food has been eaten, increment the score and regenerate the food
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodSound.play();
    // Increment score (you might want to do something with it)
        score++;
        scoreBox.innerHTML = "Score: " + score;
    // Add a new segment to the snake
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
    // Regenerate the food
        let a = 2;
        let b = 16;
        food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random())
        };
    }



    //moving the snake by using reverse for loop
    for (let i = snakearr.length - 2; i>=0; i--) {
        snakearr[i+1] = {...snakearr[i]};
    }

    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;




    //PArt 2 :display the snake and food
    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
     //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);     

}



//Main logic starts here
musicSound.play();
window,requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0,y: 1} //game starts
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("Arrowup")
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown")
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft")
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight")
            break;

        default:
            break;
    }
});