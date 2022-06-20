//javascript keycode
//https://blog.outsider.ne.kr/322

let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

let objHeight = 20;
let objWidth = 10;

let spaceEntered = false;

function drawObj() {
    ctx.beginPath();
    ctx.rec(100, 0, objHeight, objWidth);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.close();
}

function draw() {
    drawObj();

    if(spaceEntered) {
        alert("Entered");
    }
}

let interval = setInterval(draw, 10);

document.addEventListener("spacebar", spacebarHandler, false);
function spacebarHandler(e) {
    if(e.keycode == 32) {  //spacebar 입력
        spaceEntered = true;
    }
}