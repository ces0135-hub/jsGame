//javascript keycode
//https://blog.outsider.ne.kr/322

let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

let jumpHeight = 20;
let dy = 5;

let objHeight = 100;
let objWidth = 50;
let startX = 100;  //시작 x 좌표
let startY = canvas.height - objHeight;  //시작 y 좌표

let keyEntered = false;

//점프할 물체 생성
function drawObj() {
    ctx.beginPath();
    ctx.rect(startX, startY, objWidth, objHeight);  //rect(x, y, width, height)
    ctx.fillStyle = "#20752B";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObj();

    if(keyEntered) {
        if(startY != jumpHeight) {  //점프
            startY -= dy;  //상승
        }
        if(startY == jumpHeight) {  //최대 높이일 때
            while(startY != canvas.width - objHeight) {  //바닥에 닿기 전까지
                startY += dy;  //하강
                if(startY == canvas.height - objHeight) {  //바닥에 닿을 때
                   keyEntered = false
                   break;
                }
            }
        }
    }
    
    requestAnimationFrame(draw);  //더 깔끔한 animation
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
function keyDownHandler(e) {  //keyUpHandler와 같이 존재해야 한다.
    if(e.keyCode === 32) {
        keyEntered = true;
    }
}
function keyUpHandler(e) {  //keyDownHandler와 같이 존재해야 한다.
    if(e.keyCode === 32) {
        keyEntered = true;
    }
}


//setInterval(draw, 1);
draw();