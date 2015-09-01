//Created by Jake Mandell - 2015

//countdown timer credit to Robbmj at http://stackoverflow.com/a/20618517

//see HTML doc for image credits


var canvas = document.getElementById("rink");

var ctx = canvas.getContext("2d");

//position of puck
var x = canvas.width/2;
var y = canvas.height/2;

//puck speed
var dx = 0;
var dy = 0;

var puckRadius = 5;

var scoreA = 0;
var scoreB = 0;

var pause = 0;

var playerWidth = 55;
var playerHeight = 50;

var goalieWidth = 60;
var goalieHeight = 50;


var netWidth = 1;
var netHeight = 80;

//Left Goal
var netVerticalPositionA = (canvas.height - netHeight)/2;
var netHorizontalPositionA = 0;

//Right Goal
var netVerticalPositionB = (canvas.height - netHeight)/2;
var netHorizontalPositionB = canvas.width - 1;

//first puck drop
var complete = false

//Left Team: "Team A"

//goalie
var goalieVerticalPositionA = (canvas.height - goalieHeight)/2;
var goalieHorizontalPositionA = 1;

//defenders

var leftDefenseVerticalPositionA = (canvas.height - playerHeight)/3;
var leftDefenseHorizontalPositionA = (canvas.width - playerWidth)/5;

var rightDefenseVerticalPositionA = 2*(canvas.height - playerHeight)/3;
var rightDefenseHorizontalPositionA = (canvas.width - playerWidth)/5;

//forwards
var leftWingVerticalPositionA =  (canvas.height - playerHeight)/5;
var leftWingHorizontalPositionA = 2*(canvas.width - playerWidth)/5;

var centerVerticalPositionA = (canvas.height - playerHeight)/2;
var centerHorizontalPositionA = 2*(canvas.width - playerWidth)/5;

var rightWingVerticalPositionA = 4*(canvas.height - playerHeight)/5;
var rightWingHorizontalPositionA = 2*(canvas.width - playerWidth)/5;

//Right Team: "Team B"

//goalie
var goalieVerticalPositionB = (canvas.height - goalieHeight)/2;
var goalieHorizontalPositionB = canvas.width - goalieWidth - 1;

//defenders
var leftDefenseVerticalPositionB = 2*(canvas.height - playerHeight)/3;
var leftDefenseHorizontalPositionB = 4*(canvas.width - playerWidth)/5;

var rightDefenseVerticalPositionB = (canvas.height - playerHeight)/3;
var rightDefenseHorizontalPositionB = 4*(canvas.width - playerWidth)/5;

//forwards
var leftWingVerticalPositionB =  4*(canvas.height - playerHeight)/5;
var leftWingHorizontalPositionB = 3*(canvas.width - playerWidth)/5;

var centerVerticalPositionB = (canvas.height - playerHeight)/2;
var centerHorizontalPositionB = 3*(canvas.width - playerWidth)/5;

var rightWingVerticalPositionB = (canvas.height - playerHeight)/5;
var rightWingHorizontalPositionB = 3*(canvas.width - playerWidth)/5;

//load images before main draw function to avoid flickering

var loadSkaterImgA = false;
var loadGoalieImgA = false;
var loadSkaterImgB = false;
var loadGoalieImgB = false;

var skaterImgA = new Image();
skaterImgA.onload = function() {
    completeSkaterImgA();
    return;
}
skaterImgA.src = 'skaterAmin.png';

var goalieImgA = new Image();
goalieImgA.onload = function() {
    completeGoalieImgA();
    return;
}
goalieImgA.src = 'goalieAmin.png';

var goalieImgB = new Image();
goalieImgB.onload = function() {
    completeGoalieImgB();
    return;
}
goalieImgB.src = 'goalieBmin.png';

var skaterImgB = new Image();
skaterImgB.onload = function() {
    completeSkaterImgB();
    return;
}
skaterImgB.src = 'skaterBmin.png';

function completeSkaterImgA(){
    loadSkaterImgA = true;
    return loadSkaterImgA;
}

function completeGoalieImgA(){
    loadGoalieImgA = true;
    return loadGoalieImgA;
}

function completeSkaterImgB(){
    loadSkaterImgB = true;
    return loadSkaterImgB;
}

function completeGoalieImgB(){
    loadGoalieImgB = true;
    return loadGoalieImgB;
}


//key listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var wPressed = false;
var aPressed = false;
var dPressed = false;
var sPressed = false;
var upPressed = false;
var leftPressed = false;
var rightPressed = false;
var downPressed = false;

function keyDownHandler(e) {
    if(e.keyCode == 68) {
        dPressed = true;
        return dPressed;
    }
    else if(e.keyCode == 65) {
        aPressed = true;
        return aPressed;
    }
    else if(e.keyCode == 87) {
        wPressed = true;
        return wPressed;
    }
    else if(e.keyCode == 83) {
        sPressed = true;
        return sPressed;
    }
    else if(e.keyCode == 39) {
        rightPressed = true;
        return rightPressed;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
        return leftPressed;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
        return upPressed;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
        return downPressed;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 68) {
        dPressed = false;
        return dPressed;
    }
    else if(e.keyCode == 65) {
        aPressed = false;
        return aPressed;
    }
    else if(e.keyCode == 87) {
        wPressed = false;
        return wPressed;
    }
    else if(e.keyCode == 83) {
        sPressed = false;
        return sPressed;
    }
    else if(e.keyCode == 39) {
        rightPressed = false;
        return rightPressed;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
        return leftPressed;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
        return upPressed;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
        return downPressed;
    }
}

function drawPuck() {
    ctx.beginPath();
    ctx.arc(x, y, puckRadius, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function drawNetA() {
    ctx.beginPath();
    ctx.rect(netHorizontalPositionA, netVerticalPositionA, netWidth, netHeight);
    ctx.fillStyle = "#B1282F";
    ctx.fill();
    ctx.closePath();
}

function drawGoalieA() {
    ctx.drawImage(goalieImgA, goalieHorizontalPositionA, goalieVerticalPositionA, goalieWidth, goalieHeight);
}

function drawLeftDefenseA() {
    ctx.drawImage(skaterImgA, leftDefenseHorizontalPositionA, leftDefenseVerticalPositionA, playerWidth, playerHeight);
}

function drawRightDefenseA() {
    ctx.drawImage(skaterImgA, rightDefenseHorizontalPositionA, rightDefenseVerticalPositionA, playerWidth, playerHeight);
}

function drawLeftWingA() {
    ctx.drawImage(skaterImgA, leftWingHorizontalPositionA, leftWingVerticalPositionA, playerWidth, playerHeight);
}

function drawRightWingA() {
    ctx.drawImage(skaterImgA, rightWingHorizontalPositionA, rightWingVerticalPositionA, playerWidth, playerHeight);
}

function drawCenterA() {
    ctx.drawImage(skaterImgA, centerHorizontalPositionA, centerVerticalPositionA, playerWidth, playerHeight);
}

function drawNetB() {
    ctx.beginPath();
    ctx.rect(netHorizontalPositionB, netVerticalPositionB, netWidth, netHeight);
    ctx.fillStyle = "#B1282F";
    ctx.fill();
    ctx.closePath();
}

function drawGoalieB() {
    ctx.drawImage(goalieImgB, goalieHorizontalPositionB, goalieVerticalPositionB, goalieWidth, goalieHeight);
}

function drawLeftDefenseB() {
    ctx.drawImage(skaterImgB, leftDefenseHorizontalPositionB, leftDefenseVerticalPositionB, playerWidth, playerHeight);
}

function drawRightDefenseB() {
    ctx.drawImage(skaterImgB, rightDefenseHorizontalPositionB, rightDefenseVerticalPositionB, playerWidth, playerHeight);
}

function drawLeftWingB() {
        ctx.drawImage(skaterImgB, leftWingHorizontalPositionB, leftWingVerticalPositionB, playerWidth, playerHeight);
}

function drawRightWingB() {
    ctx.drawImage(skaterImgB, rightWingHorizontalPositionB, rightWingVerticalPositionB, playerWidth, playerHeight);
}

function drawCenterB() {
    ctx.drawImage(skaterImgB, centerHorizontalPositionB, centerVerticalPositionB, playerWidth, playerHeight);
}

function leftTeamA() {
    if (x + 2*dx < canvas.width/2 && 
        leftDefenseHorizontalPositionA > goalieHorizontalPositionA + goalieWidth &&
        rightDefenseHorizontalPositionA > goalieHorizontalPositionA + goalieWidth) {
            leftDefenseHorizontalPositionA -= Math.floor((Math.random() * 6) + 4);
            rightDefenseHorizontalPositionA -= Math.floor((Math.random() * 6) + 4);
            leftWingHorizontalPositionA -= Math.floor((Math.random() * 8) + 6);
            rightWingHorizontalPositionA -= Math.floor((Math.random() * 8) + 6);
            centerHorizontalPositionA -= Math.floor((Math.random() * 8) + 6);
    }
}

function rightTeamA() {
    if (x + 2*dx > canvas.width/2 && 
        centerHorizontalPositionA < canvas.width/2 - playerWidth &&
        leftWingHorizontalPositionA < canvas.width/2 - playerWidth &&
        rightWingHorizontalPositionA < canvas.width/2 - playerWidth) {
            leftDefenseHorizontalPositionA += Math.floor((Math.random() * 6) + 4);
            rightDefenseHorizontalPositionA += Math.floor((Math.random() * 6) + 4);
            leftWingHorizontalPositionA += Math.floor((Math.random() * 8) + 6);
            rightWingHorizontalPositionA += Math.floor((Math.random() * 8) + 6);
            centerHorizontalPositionA += Math.floor((Math.random() * 8) + 6);
    }
}

function upTeamA() {
    if (y + 2*dy < canvas.height/2 && 
        leftWingVerticalPositionA > 0 &&
        leftDefenseVerticalPositionA > 0) {
        leftDefenseVerticalPositionA -= Math.floor((Math.random() * 8) + 6);
        rightDefenseVerticalPositionA -= Math.floor((Math.random() * 8) + 6);
        leftWingVerticalPositionA -= Math.floor((Math.random() * 6) + 4);
        rightWingVerticalPositionA -= Math.floor((Math.random() * 6) + 4);
        centerVerticalPositionA -= Math.floor((Math.random() * 6) + 4);
        goalieVerticalPositionA -= 1.5;
    }
}

function downTeamA() {
    if (y + 2*dy > canvas.height/2 && 
        rightWingVerticalPositionA < canvas.height - playerHeight &&
        rightDefenseVerticalPositionA < canvas.height - playerHeight) {
            leftDefenseVerticalPositionA += Math.floor((Math.random() * 8) + 6);
            rightDefenseVerticalPositionA += Math.floor((Math.random() * 8) + 6);
            leftWingVerticalPositionA += Math.floor((Math.random() * 6) + 4);
            rightWingVerticalPositionA += Math.floor((Math.random() * 6) + 4);
            centerVerticalPositionA += Math.floor((Math.random() * 6) + 4);
            goalieVerticalPositionA += 1.5;
    }
}

function leftTeamB() {
        if (x + 2*dx < canvas.width/2 && 
        centerHorizontalPositionB > canvas.width/2 &&
        leftWingHorizontalPositionB > canvas.width/2 &&
        rightWingHorizontalPositionB > canvas.width/2) {
            leftDefenseHorizontalPositionB -= Math.floor((Math.random() * 6) + 4);
            rightDefenseHorizontalPositionB -= Math.floor((Math.random() * 6) + 4);
            leftWingHorizontalPositionB -= Math.floor((Math.random() * 8) + 6);
            rightWingHorizontalPositionB -= Math.floor((Math.random() * 8) + 6);
            centerHorizontalPositionB -= Math.floor((Math.random() * 8) + 6);
    }
}

function rightTeamB() {
        if (x + 2*dx > canvas.width/2 && 
        leftDefenseHorizontalPositionB < goalieHorizontalPositionB - playerWidth &&
        rightDefenseHorizontalPositionB < goalieHorizontalPositionB - playerWidth) {
            leftDefenseHorizontalPositionB += Math.floor((Math.random() * 6) + 4);
            rightDefenseHorizontalPositionB += Math.floor((Math.random() * 6) + 4);
            leftWingHorizontalPositionB += Math.floor((Math.random() * 8) + 6);
            rightWingHorizontalPositionB += Math.floor((Math.random() * 8) + 6);
            centerHorizontalPositionB += Math.floor((Math.random() * 8) + 6);
    }
}

function upTeamB() {
        if (y + 2*dy < canvas.height/2 && 
        rightWingVerticalPositionB > 0 &&
        rightDefenseVerticalPositionB > 0) {
            leftDefenseVerticalPositionB -= Math.floor((Math.random() * 8) + 6);
            rightDefenseVerticalPositionB -= Math.floor((Math.random() * 8) + 6);
            leftWingVerticalPositionB -= Math.floor((Math.random() * 6) + 4);
            rightWingVerticalPositionB -= Math.floor((Math.random() * 6) + 4);
            centerVerticalPositionB -= Math.floor((Math.random() * 6) + 4);
            goalieVerticalPositionB -= 1.5;
    }
}

function downTeamB() {
        if (y + 2*dy > canvas.height/2 && 
        leftWingVerticalPositionB < canvas.height - playerHeight &&
        leftDefenseVerticalPositionB < canvas.height - playerHeight) {
            leftDefenseVerticalPositionB += Math.floor((Math.random() * 8) + 6);
            rightDefenseVerticalPositionB += Math.floor((Math.random() * 8) + 6);
            leftWingVerticalPositionB += Math.floor((Math.random() * 6) + 4);
            rightWingVerticalPositionB += Math.floor((Math.random() * 6) + 4);
            centerVerticalPositionB += Math.floor((Math.random() * 6) + 4);
            goalieVerticalPositionB += 1.5;
    }
}


function displayScore(){
    document.getElementById("score").innerHTML = scoreA + " - " + scoreB;
}


function draw() {

    if (!loadSkaterImgA || !loadGoalieImgA || !loadSkaterImgB || !loadGoalieImgB) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPuck();
    drawNetA();
    drawNetB();
    drawGoalieA();
    drawGoalieB();
    drawLeftDefenseA();
    drawLeftDefenseB();
    drawRightDefenseA();
    drawRightDefenseB();
    drawLeftWingA();
    drawLeftWingB();
    drawRightWingA();
    drawRightWingB();
    drawCenterA();
    drawCenterB();
    upTeamA();
    upTeamB();
    leftTeamA();
    leftTeamB();
    rightTeamA();
    rightTeamB();
    downTeamA();
    downTeamB();
    displayScore();
    countdown3(); 

    x += dx;
    y += dy;

    //first puck drop
    function countdown3(){
        if (!complete){
        document.getElementById("countdown").innerHTML = "3";
        setTimeout(countdown2, 1000);
        complete = true;
        }
        else {
            //do nothing
        }
    }

    function countdown2(){
        document.getElementById("countdown").innerHTML = "2";
        setTimeout(countdown1, 1000);
    }

    function countdown1(){
        document.getElementById("countdown").innerHTML = "1";
        setTimeout(endCountdown, 1000);
    }

    function endCountdown(){
        document.getElementById("countdown").innerHTML = "";
        dxDefaultRight();
        dyDefault();
    }


    //COLLISIONS***************

    //goal scored

    if (x + dx < puckRadius &&
        y > netVerticalPositionA &&
        y < netVerticalPositionA + netHeight) {
        scoreB++;
        displayScore();
        x = canvas.width/2;
        y = canvas.height/2;
        countdown3Left();
        pause += 3;
        goalieVerticalPositionA = (canvas.height - goalieHeight)/2;
        goalieHorizontalPositionA = 1;
        leftDefenseVerticalPositionA = (canvas.height - playerHeight)/3;
        leftDefenseHorizontalPositionA = (canvas.width - playerWidth)/5;
        rightDefenseVerticalPositionA = 2*(canvas.height - playerHeight)/3;
        rightDefenseHorizontalPositionA = (canvas.width - playerWidth)/5;
        leftWingVerticalPositionA =  (canvas.height - playerHeight)/5;
        leftWingHorizontalPositionA = 2*(canvas.width - playerWidth)/5;
        centerVerticalPositionA = (canvas.height - playerHeight)/2;
        centerHorizontalPositionA = 2*(canvas.width - playerWidth)/5;
        rightWingVerticalPositionA = 4*(canvas.height - playerHeight)/5;
        rightWingHorizontalPositionA = 2*(canvas.width - playerWidth)/5;
        goalieVerticalPositionB = (canvas.height - goalieHeight)/2;
        goalieHorizontalPositionB = canvas.width - goalieWidth - 1;
        leftDefenseVerticalPositionB = 2*(canvas.height - playerHeight)/3;
        leftDefenseHorizontalPositionB = 4*(canvas.width - playerWidth)/5;
        rightDefenseVerticalPositionB = (canvas.height - playerHeight)/3;
        rightDefenseHorizontalPositionB = 4*(canvas.width - playerWidth)/5;
        leftWingVerticalPositionB =  4*(canvas.height - playerHeight)/5;
        leftWingHorizontalPositionB = 3*(canvas.width - playerWidth)/5;
        centerVerticalPositionB = (canvas.height - playerHeight)/2;
        centerHorizontalPositionB = 3*(canvas.width - playerWidth)/5;
        rightWingVerticalPositionB = (canvas.height - playerHeight)/5;
        rightWingHorizontalPositionB = 3*(canvas.width - playerWidth)/5;
    }

    if (x + dx > canvas.width-puckRadius &&
        y > netVerticalPositionB &&
        y < netVerticalPositionB + netHeight) {
        scoreA++;
        displayScore();
        x = canvas.width/2;
        y = canvas.height/2;
        countdown3Right(); 
        pause += 3;
        goalieVerticalPositionA = (canvas.height - goalieHeight)/2;
        goalieHorizontalPositionA = 1;
        leftDefenseVerticalPositionA = (canvas.height - playerHeight)/3;
        leftDefenseHorizontalPositionA = (canvas.width - playerWidth)/5;
        rightDefenseVerticalPositionA = 2*(canvas.height - playerHeight)/3;
        rightDefenseHorizontalPositionA = (canvas.width - playerWidth)/5;
        leftWingVerticalPositionA =  (canvas.height - playerHeight)/5;
        leftWingHorizontalPositionA = 2*(canvas.width - playerWidth)/5;
        centerVerticalPositionA = (canvas.height - playerHeight)/2;
        centerHorizontalPositionA = 2*(canvas.width - playerWidth)/5;
        rightWingVerticalPositionA = 4*(canvas.height - playerHeight)/5;
        rightWingHorizontalPositionA = 2*(canvas.width - playerWidth)/5;
        goalieVerticalPositionB = (canvas.height - goalieHeight)/2;
        goalieHorizontalPositionB = canvas.width - goalieWidth - 1;
        leftDefenseVerticalPositionB = 2*(canvas.height - playerHeight)/3;
        leftDefenseHorizontalPositionB = 4*(canvas.width - playerWidth)/5;
        rightDefenseVerticalPositionB = (canvas.height - playerHeight)/3;
        rightDefenseHorizontalPositionB = 4*(canvas.width - playerWidth)/5;
        leftWingVerticalPositionB =  4*(canvas.height - playerHeight)/5;
        leftWingHorizontalPositionB = 3*(canvas.width - playerWidth)/5;
        centerVerticalPositionB = (canvas.height - playerHeight)/2;
        centerHorizontalPositionB = 3*(canvas.width - playerWidth)/5;
        rightWingVerticalPositionB = (canvas.height - playerHeight)/5;
        rightWingHorizontalPositionB = 3*(canvas.width - playerWidth)/5;
    }

    //on goal score
    function dxZero(){
        dx = 0;
        return dx;
    }

    function dyZero(){
        dy = 0;
        return dy;
    }

    function dxDefaultLeft(){  
        dx = 12;
        return dx;
    }

    function dxDefaultRight(){  
        dx = -12;
        return dx;
    }

    function dyDefault(){
        dy = 5;
        return dy;
    }
//-------------------------------------------------------------------
    this.countdown3Left = function(){
        document.getElementById("countdown").innerHTML = "3";
        dxZero();
        dyZero();
        setTimeout(this.countdown2Left, 1000);
    }

    this.countdown2Left = function(){
        document.getElementById("countdown").innerHTML = "2";
        setTimeout(this.countdown1Left, 1000);
    }

    this.countdown1Left = function(){
        document.getElementById("countdown").innerHTML = "1";
        setTimeout(this.endCountdownLeft, 1000);
    }

    this.endCountdownLeft = function(){
        document.getElementById("countdown").innerHTML = "";
        dxDefaultLeft();
        dyDefault();
    }
 //------------------------------------------------------------------
    this.countdown3Right = function(){
        document.getElementById("countdown").innerHTML = "3";
        dxZero();
        dyZero();
        setTimeout(this.countdown2Right, 1000);

    }

    this.countdown2Right = function(){
        document.getElementById("countdown").innerHTML = "2";
        setTimeout(this.countdown1Right, 1000);
    }

    this.countdown1Right = function(){
        document.getElementById("countdown").innerHTML = "1";
        setTimeout(this.endCountdownRight, 1000);
    }

    this.endCountdownRight = function(){
        document.getElementById("countdown").innerHTML = "";
        dxDefaultRight();
        dyDefault();
    }


    //puck bounces off walls
    if (y + dy < puckRadius) {
    	dy = -dy;
    }
    if (y + dy > canvas.height-puckRadius) {
    	dy = -dy;
    }
    if (x + dx < puckRadius) {
    	dx = -dx;
    }
    if (x + dx > canvas.width-puckRadius) {
    	dx = -dx;
    }

    //--------------------------------------------
    //Speeds up when player touches puck
    var accel = true;

    function speedUp(){
        if (dx < 0){
            dx = -1*(Math.floor((Math.random() * 12) + 12));
        }
        else if (dx > 0){
            dx = Math.floor((Math.random() * 12) + 12);
        }
        return dx;
    }
    //-------------------------------------------
    //team A G
    if (x + dx < goalieHorizontalPositionA + playerWidth - puckRadius &&
        x + dx > goalieHorizontalPositionA - puckRadius &&
        y > goalieVerticalPositionA &&
        y < goalieVerticalPositionA + goalieHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < goalieVerticalPositionA + playerHeight - puckRadius &&
        y + dy > goalieVerticalPositionA - puckRadius &&
        x < goalieHorizontalPositionA + playerWidth &&
        x > goalieHorizontalPositionA) {
        dy = -dy;
    }

    //team A LD
    if (x + dx < leftDefenseHorizontalPositionA + playerWidth - puckRadius &&
        x + dx > leftDefenseHorizontalPositionA - puckRadius &&
        y > leftDefenseVerticalPositionA &&
        y < leftDefenseVerticalPositionA + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < leftDefenseVerticalPositionA + playerHeight - puckRadius &&
        y + dy > leftDefenseVerticalPositionA - puckRadius &&
        x < leftDefenseHorizontalPositionA + playerWidth &&
        x > leftDefenseHorizontalPositionA) {
        dy = -dy;
    }

    //team A RD
    if (x + dx < rightDefenseHorizontalPositionA + playerWidth - puckRadius &&
        x + dx > rightDefenseHorizontalPositionA - puckRadius &&
        y > rightDefenseVerticalPositionA &&
        y < rightDefenseVerticalPositionA + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < rightDefenseVerticalPositionA + playerHeight - puckRadius &&
        y + dy > rightDefenseVerticalPositionA - puckRadius &&
        x < rightDefenseHorizontalPositionA + playerWidth &&
        x > rightDefenseHorizontalPositionA) {
        dy = -dy;
    }

    //team A LW
    if (x + dx < leftWingHorizontalPositionA + playerWidth - puckRadius &&
        x + dx > leftWingHorizontalPositionA - puckRadius &&
        y > leftWingVerticalPositionA &&
        y < leftWingVerticalPositionA + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < leftWingVerticalPositionA + playerHeight - puckRadius &&
        y + dy > leftWingVerticalPositionA - puckRadius &&
        x < leftWingHorizontalPositionA + playerWidth &&
        x > leftWingHorizontalPositionA) {
        dy = -dy;
    }

    //team A RW
    if (x + dx < rightWingHorizontalPositionA + playerWidth - puckRadius &&
        x + dx > rightWingHorizontalPositionA - puckRadius &&
        y > rightWingVerticalPositionA &&
        y < rightWingVerticalPositionA + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < rightWingVerticalPositionA + playerHeight - puckRadius &&
        y + dy > rightWingVerticalPositionA - puckRadius &&
        x < rightWingHorizontalPositionA + playerWidth &&
        x > rightWingHorizontalPositionA) {
        dy = -dy;
    }

    //team A C
    if (x + dx < centerHorizontalPositionA + playerWidth - puckRadius &&
        x + dx > centerHorizontalPositionA - puckRadius &&
        y > centerVerticalPositionA &&
        y < centerVerticalPositionA + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < centerVerticalPositionA + playerHeight - puckRadius &&
        y + dy > centerVerticalPositionA - puckRadius &&
        x < centerHorizontalPositionA + playerWidth &&
        x > centerHorizontalPositionA) {
        dy = -dy;
    }

    //------------------------------------------

    //team B G
    if (x + dx < goalieHorizontalPositionB + goalieWidth - puckRadius &&
        x + dx > goalieHorizontalPositionB - puckRadius &&
        y > goalieVerticalPositionB &&
        y < goalieVerticalPositionB + goalieHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < goalieVerticalPositionB + goalieHeight - puckRadius &&
        y + dy > goalieVerticalPositionB - puckRadius &&
        x < goalieHorizontalPositionB + goalieWidth &&
        x > goalieHorizontalPositionB) {
        dy = -dy;
    }

    //team B LD
    if (x + dx < leftDefenseHorizontalPositionB + playerWidth - puckRadius &&
        x + dx > leftDefenseHorizontalPositionB - puckRadius &&
        y > leftDefenseVerticalPositionB &&
        y < leftDefenseVerticalPositionB + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < leftDefenseVerticalPositionB + playerHeight - puckRadius &&
        y + dy > leftDefenseVerticalPositionB - puckRadius &&
        x < leftDefenseHorizontalPositionB + playerWidth &&
        x > leftDefenseHorizontalPositionB) {
        dy = -dy;
    }

    //team B RD
    if (x + dx < rightDefenseHorizontalPositionB + playerWidth - puckRadius &&
        x + dx > rightDefenseHorizontalPositionB - puckRadius &&
        y > rightDefenseVerticalPositionB &&
        y < rightDefenseVerticalPositionB + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < rightDefenseVerticalPositionB + playerHeight - puckRadius &&
        y + dy > rightDefenseVerticalPositionB - puckRadius &&
        x < rightDefenseHorizontalPositionB + playerWidth &&
        x > rightDefenseHorizontalPositionB) {
        dy = -dy;
    }

    //team B LW
    if (x + dx < leftWingHorizontalPositionB + playerWidth - puckRadius &&
        x + dx > leftWingHorizontalPositionB - puckRadius &&
        y > leftWingVerticalPositionB &&
        y < leftWingVerticalPositionB + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < leftWingVerticalPositionB + playerHeight - puckRadius &&
        y + dy > leftWingVerticalPositionB - puckRadius &&
        x < leftWingHorizontalPositionB + playerWidth &&
        x > leftWingHorizontalPositionB) {
        dy = -dy;
    }

    //team B RW
    if (x + dx < rightWingHorizontalPositionB + playerWidth - puckRadius &&
        x + dx > rightWingHorizontalPositionB - puckRadius &&
        y > rightWingVerticalPositionB &&
        y < rightWingVerticalPositionB + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < rightWingVerticalPositionB + playerHeight - puckRadius &&
        y + dy > rightWingVerticalPositionB - puckRadius &&
        x < rightWingHorizontalPositionB + playerWidth &&
        x > rightWingHorizontalPositionB) {
        dy = -dy;
    }

    //team B C
    if (x + dx < centerHorizontalPositionB + playerWidth - puckRadius &&
        x + dx > centerHorizontalPositionB - puckRadius &&
        y > centerVerticalPositionB &&
        y < centerVerticalPositionB + playerHeight) {
        dx = -dx;
        if (accel){
            speedUp();
        }
    }

    if (y + dy < centerVerticalPositionB + playerHeight - puckRadius &&
        y + dy > centerVerticalPositionB - puckRadius &&
        x < centerHorizontalPositionB + playerWidth &&
        x > centerHorizontalPositionB) {
        dy = -dy;
    }    

}
setInterval(draw, 10);


//countdown clock ---- credit to robbmj at StackOverflow
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

window.onload = function () {
    var fiveMinutes = 303 + pause,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

 setTimeout(function timeUp(){
   if (scoreA > scoreB) {
        var winA = confirm('Team A wins!\nScore was ' + scoreA + " - " + scoreB + "\nClick OK to try again");
        if (winA = true) {
        location.href="index.html";
        }
        else {
        alert('Sorry you feel that way :(');
        }
    }
   else if (scoreB> scoreA) {
        var winB = confirm('Team B wins!\nScore was ' + scoreA + " - " + scoreB + "\nClick OK to try again");
        if (winA = true) {
        location.href="index.html";
        }
        else {
        alert('Sorry you feel that way :(');
        }
    }
    else {
        var draw = confirm('This match is a Draw!\nScore was ' + scoreA + " - " + scoreB + "\nClick OK to try again");
        if (winA = true) {
        location.href="index.html";
        }
        else {
        alert('Sorry you feel that way :(');
        }        
    }
    }, 304000);

