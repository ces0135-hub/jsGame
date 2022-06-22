//javascript keycode
//https://blog.outsider.ne.kr/322

let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

let canvasHeight = 250;
let canvasWidth = 1000;

let objHeight = 100;
let objWidth = 50;
let objX = 100;
let objY = canvasHeight - objHeight;

let jumpHeight = 30;

let spaceEntered = false;

//점프할 물체 생성
function drawObj() {
    ctx.beginPath();
    ctx.rect(objX, objY, objWidth, objHeight);  //rect(x, y, width, height)
    ctx.fillStyle = "#20752B";
    ctx.fill();
    ctx.close();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObj();

    /*if(spaceEntered) {
        objY += jumpHeight;
    }*/
    objY += jumpHeight;
    objX += 10;

    //requestAnimationFrame(draw);  //더 깔끔한 애니메이션
}

/*
document.addEventListener('keydown', spacebarOn, false);
function spacebarOn(e) {
    if(e.keyCode === 32) {  //spacebar 입력
        spaceEntered = true;
    }
}*/

setInterval(draw, 10);
//draw();