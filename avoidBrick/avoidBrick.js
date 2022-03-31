//움직이는 물체
//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
//여러가지 canvas 속성
//http://tcpschool.com/html/html5_graphic_canvas

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
/*
ctx.beginPath();
ctx.rect(20, 40, 50, 50);  //직사각형 생성: rect(왼쪽, 위쪽, width, height);
ctx.fillStyle = "#FF0000";  //색 지정
ctx.fill();  //지정한 색으로 칠할 것인지 결정
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);  //원 생성: arc(중심의 x 좌표, 중심의 y좌표, 반지름, 시작 각도, 선택: counterclockwise);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";  //테두리 색 지정
ctx.stroke();  //테두리 나태내기
ctx.closePath();
*/
var x = canvas.width/2;  //시작할 x 좌표 지정
var y = canvas.height/2;  //시작할 y 좌표 지정

var dx = 2;
var dy = -2;  //y는 왼쪽 위부터 시작하므로, -2는 감소하는 것은 원의 중심을 위로 2만큼 이동하는 것이다.

var ballRadius = 10;  //생성할 원의 radius

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var fixedPaddleHeight = 10;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    //ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, fixedPaddleHeight);  //(시작 x 좌표, 시작 y 좌표, widt, height)
    //원과 충돌 감지는 되지 않는다.
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//x, y: 원의 중심 좌표
function draw() {
    //clearRect(top left 시작 x좌표, top left 시작 y좌표, bottom right x 좌표, bottom right y 좌표);
    ctx.clearRect(0, 0, canvas.width, canvas.height);  //canvas의 전체 영역을 지우는 코드

    drawPaddle();

    if(rightPressed) {
        paddleX += 2;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 2;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    else if(upPressed) {//올리기
        paddleHeight += 2;  //paddle 올리기(paddle의 왼쪽 위 y 좌표 = canvas.height - paddleHeight가 감소하므로 위로 올라간다.)
        //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, fixedPaddleHeight);
        if(paddleHeight >= canvas.height) {
            paddleHeight = canvas.height;  //paddleHeight = 0(맨 아래)
        }
    }
    else if(downPressed) {//내리기
        paddleHeight -= 2
        //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, fixedPaddleHeight);
        if(paddleHeight <= fixedPaddleHeight) {
            paddleHeight = fixedPaddleHeight;  //paddleHeight = canvas.height(맨 위)
        }
    }
    //key 입력에 따른 paddle 이동


    if(y + dy < 0 + ballRadius || y + dy > canvas.height - ballRadius) {  //coordinate system starts form the top left
        //y + dy < 0 means 위로 벗어난 경우
        //y + dy > canvas.hieght means 아래로 벗어난 경우
        //y + dy > canvas.height - ballRadius: 원래의 canvas 경계에서 ballRadius만큼 줄은 부분이 경계가 된다.
        //이렇게 하면 ball의 절반이 경계 속에 들어갔다가 방향을 바꾼다.
        //ballRadius를 이용해서 수정한다.
        dy = -dy;
        //ctx.fillStyle = "#" + Math.round(Math.random() * 0xffffff).toString(16);  //random으로 색 바꾸기
    } else if(x > paddleX - ballRadius && x < paddleX + paddleWidth - ballRadius && y > canvas.height-paddleHeight-fixedPaddleHeight && y < canvas.height-paddleHeight+ballRadius) {
        dy = -dy;
        //paddle에 부딪히면 방향이 바뀐다.
    }
    if(y + dy == canvas.height - ballRadius) {
        alert("Game Over");
        document.location.reload();
        clearInterval(interval);
    }
    
    if(x + dx < 0 + ballRadius || x + dx > canvas.width - ballRadius) {
        //x + dx < 0 means 왼쪽으로 벗어난 경우
        //x + dx > canvas.hieght means 오른쪽으로 벗어난 경우
        //이렇게 하면 ball의 절반이 경계 속에 들어갔다가 방향을 바꾼다.
        //ballRadius를 이용해서 수정한다.
        dx = -dx;
        //ctx.fillStyle = "#" + Math.round(Math.random() * 0xffffff).toString(16);
    }
    //원의 테두리가 canvas를 벗어나면 방향을 바꾸는 코드

    
    drawBall();
    //drawPaddle();

    //x += dx;
    //y += dy;
    //움직인 원의 중심

    //paddleHeight는 위에서부터 몇 픽셀
 /*   if(rightPressed) {
        paddleX += 2;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 2;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    else if(upPressed) {//올리기
        paddleHeight += 2;  //paddle 올리기(paddle의 왼쪽 위 y 좌표 = canvas.height - paddleHeight가 감소하므로 위로 올라간다.)
        //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, fixedPaddleHeight);
        if(paddleHeight >= canvas.height) {
            paddleHeight = canvas.height;  //paddleHeight = 0(맨 아래)
        }
    }
    else if(downPressed) {//내리기
        paddleHeight -= 2
        //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, fixedPaddleHeight);
        if(paddleHeight <= fixedPaddleHeight) {
            paddleHeight = fixedPaddleHeight;  //paddleHeight = canvas.height(맨 위)
        }
    }
*/
    //원과 paddle이 만나는 경우
    //원의 중심: (x, y), radius: ballRadius
    //paddleWidth, fixedPaddleHeight: paddle의 길이, 높이
    //rect(paddleX, canvas.height-paddleHeight, paddleWidth, fixedPaddleHeight);
    //원과 paddle이 만나는 경우
    

    x += dx;
    y += dy;
}

document.addEventListener('keydown', keyDownHandler, false);  //keydown: key is pressed
document.addEventListener('keyup', keyUpHandler, false);  //keup: done pressong key

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

var interval = setInterval(draw, 10);  //새로 고침할 때마다 10millSec 후에 호출 된다.