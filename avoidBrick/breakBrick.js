let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

let ballX = 10;  //원의 중심 x 좌표
let ballY = canvas.height - canvas.height / 2;  //원의 중심 y 좌표

let ballRadius = 10;  //원의 반지름

let paddleHeight = 10;
let fixedPaddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth)/2;  //paddle의 시작 위치

let dx = 2;
let dy = -2;


let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;




let brickColCount = 3;
let brickRowCount = 2;

let brickPadding = 10;
let brickHeight = 40;
let brickWidth = 80;
let brickOffsetLeft = 60;
let brickOffsetTop = 50;

let brickX = 0;
let brickY = 0;

let brick = [];  //생성되는 brick의 정보(시작 좌표, stataus)를 저장하는 배열
for(var c = 0; c < brickColCount; c++) {
    brick[c] = [];
    for(var r = 0; r < brickRowCount; r++) {
        brick[c][r] = { setBrickX: 0, setBrickY: 0, status: 1 };  //status가 0이면 invisible, 1이면 visible 하다.
    }
}


function drawBrick() {
    for(var c = 0; c < brickColCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            if(brick[c][r].status == 1) {
                brickX = c*(brickWidth + brickPadding) + brickOffsetLeft;
                brickY = r*(brickHeight + brickPadding) + brickOffsetTop;

                brick[c][r].setBrickX = brickX;
                brick[c][r].setBrickY = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#EE53B5";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function collDec() {
    for(var c = 0; c < brickColCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            let curBrick = brick[c][r];
            if(curBrick.status == 1) {
                if(ballX > curBrick.setBrickX && ballX < curBrick.setBrickX+brickWidth && ballY > curBrick.setBrickY && ballY < curBrick.setBrickY+brickHeight) {
                    dy = -dy;
                    curBrick.status = 0;
                    statusCnt += 1;
                    if(statusCnt == brickColCount*brickRowCount) {
                        gameOver();
                    }
                }
            }
        }
    }
}


function paddleDec() {
    if(ballX > paddleX && ballX < paddleX+paddleWidth && ballY < canvas.height-paddleHeight && ballY > canvas.height-paddleHeight-fixedPaddleHeight) {
        dy = -dy;
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#D012EA";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, fixedPaddleHeight);
    ctx.fillStyle = "#460B44";
    ctx.fill();
    ctx.closePath();
}


let statusCnt = 0;
let groundTouch = 0;

function groundCnt() {
    if(ballY+ballRadius > canvas.height) {
        groundTouch += 1;
        if(groundTouch == 1) {
            alert("Touched Ground for " + groundTouch + " Time");
        }
        else {
            alert("Touched Ground for " + groundTouch + " Times");
        }

        if(groundTouch == 3) {
            gameOver();
        }
    }
}

function gameOver() {
    alert("Game Over");
    alert("Score: " + statusCnt);
    document.location.reload();
    clearInterval(interval);
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  //기존의 원 지우기

    drawPaddle();  //setInterval로 생성한 간격마다 paddle 생성
    paddleDec();  //paddle에 닿으면 원의 이동 방향이 바뀐다.

    drawBall();
    drawBrick();

    collDec();  //brick과의 충돌 감지

    //canvas의 네 면과의 충돌 감지
    if(ballX-ballRadius < 0 || ballX+ballRadius > canvas.width) {  //옆면
        dx = -dx;
    }
    if(ballY+ballRadius > canvas.height || ballY-ballRadius < 0) {  //아랫면, 윗면
        dy = -dy;
    }

    //밑면에 닿을 수 있는 횟수 제한
    groundCnt();

    //paddle 동작
    if(rightPressed) {
        paddleX += 5;
        if(paddleX+paddleWidth > canvas.width) {
            paddleX = canvas.width-paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 5;
        if(paddleX < 0) {
            paddleX = 0;
        }
    }
    else if(upPressed) {
        paddleHeight += 5;
        if(canvas.height - paddleHeight < 0) {
            paddleHeight = canvas.height;
        }
    }
    else if(downPressed) {
        paddleHeight -= 5;
        if(canvas.height - paddleHeight > canvas.height - fixedPaddleHeight) {  //y 좌표이므로 값이 커야 더 밑으로 내려간다.
            paddleHeight = fixedPaddleHeight;
        }
    }

    ballX += dx;
    ballY += dy;
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if(e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    } else if(e.key == 'Up' || e.key == 'ArrowUp') {
        upPressed = true;
    } else if(e.key == 'Down' || e.key == 'ArrowDown') {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if(e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    } else if(e.key == 'Up' || e.key == 'ArrowUp') {
        upPressed = false;
    } else if(e.key == 'Down' || e.key == 'ArrowDown') {
        downPressed = false;
    }
}

let interval = setInterval(draw, 10);