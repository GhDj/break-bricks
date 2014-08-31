/**
 * @author GhDj
 */
var ballImg = new Image();
var brickImg = new Image();
brickImg.src = "images/brick.png";
var barImg = new Image(); 
var ballMoving = false;
var speed =6 ;
var horizontalSpeed = speed;
var verticalSpeed = -speed;
var ballX ;
var ballY ;
var screenWidth = 600;
var screenHeight = 500;
var gameRunning = false;
var barX;
var barY;
var b = document.getElementById('b');
var br;
var brickX = 0;
var brickY = 10;
var bricksX = [];
var bricksY = [];
var c = document.getElementById('c');
var ctx;
var bgc = document.getElementById('bgc');
var brkobj = document.getElementById('brkobj').getContext('2d');
var bgctx;
var howManyCircles = 10, circles = [];
var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 60);
};

var requestAnimFrame1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 60);
};

function brickobj() {
    this.width =  80;
    this.height = 20;
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 20;
    this.drawY = 20;
    this.imageSrc = "images/brick.png";
    
}

brickobj.prototype.updateCoords = function () {
    this.drawX = this.drawX + this.width;
}

brickobj.prototype.draw = function(){
    this.updateCoords();
    
    brkobj.drawImage(brickImg,this.drawX,this.drawY);
    
}

var clear = function() {

	ctx.clearRect(0, 0, screenWidth, screenHeight);

};
var clearBg = function() {

	ctx.clearRect(0, 0, screenWidth, screenHeight);

	bgctx.fillStyle = "#d0e7f9";
	bgctx.beginPath();
	bgctx.fillRect(0, 0, screenWidth, screenHeight);
	bgctx.closePath();
	bgctx.fill();
};


$(document).ready(function() {

	init();
});

function init() {
	initSettings();
	loadImages();
	backg();
	ballInit();
    
	$(document).mousemove(function(e) {
		if((e.pageX - c.offsetLeft > 0 ) && (e.pageX - c.offsetLeft < screenWidth)) {
			barX = e.pageX - c.offsetLeft - barImg.width / 2;
	/*x=e.pageX - c.offsetLeft;
			y = e.pageY - c.offsetTop;
           t.fillStyle ="white";
			t.fillRect(0, 0,screenWidth,screenHeight);
			sta(x, y);*/

			/* ballX =  e.pageX - c.offsetLeft;
			ballY = e.pageY - c.offsetTop;*/
		}
          if(ballMoving === false) {
			ballInit();
			}
	});
	$("#btn_play").click(function() {
		gameRunning = !gameRunning;
		document.getElementById('btn_play').style.display = "none";
		gameLoop();
	});
	$("#c").click(function() {

		if(ballMoving === false) {
			ballMoving = true;
			ballMove();
		}
	});
}

function backg() {
	var DrawCircles = function() {
		for(var i = 0; i < howManyCircles; i++) {
			bgctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
			bgctx.beginPath();
			bgctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
			bgctx.closePath();
			bgctx.fill();
		}
	};
	var MoveCircles = function(deltaY) {
		for(var i = 0; i < howManyCircles; i++) {
			if(circles[i][1] - circles[i][2] > screenHeight) {
				circles[i][0] = Math.random() * screenWidth;
				circles[i][2] = Math.random() * 100;
				circles[i][1] = 0 - circles[i][2];
				circles[i][3] = Math.random() / 2;
			} else {

				circles[i][1] += deltaY;
			}
		}
	};
	for(var i = 0; i < howManyCircles; i++)
	    circles.push([Math.random() * screenWidth, Math.random() * screenHeight, Math.random() * 100, Math.random() / 2]);
	
	DrawCircles();
	MoveCircles(3);
	/*var gLoop;*/
	var bgLoop = function() {
		clearBg();
		MoveCircles(5);
		DrawCircles();
		requestAnimFrame1(bgLoop);
	};
	bgLoop();
}

function initSettings() {
	if(document.getElementById('c').getContext('2d')) {
		ctx = document.getElementById('c').getContext('2d');

	}
	if(document.getElementById('bgc').getContext('2d')) {
		bgctx = bgc.getContext('2d');

	}
	/*screenWidth = parseInt($('#c').attr("width"),10);
	screenHeight = parseInt($('#c').attr("height"),10);*/
	barX = parseInt(screenWidth / 2,10);
	barY = screenHeight - 40;

}

function loadImages() {
	ballImg.src = "images/ball.png";
	brickImg.src = "images/brick.png";
	barImg.src = "images/mushroom.png";
}

function gameLoop() {

	if(gameRunning) {

		clear();
		ctx.save();
		ctx.drawImage(barImg, barX, barY);
		ctx.drawImage(ballImg, ballX, ballY);
        drawBricks();
		ctx.restore();
		requestAnimFrame(gameLoop);
	}
}

function ballInit() {
	ballX = barX + barImg.width / 2 - ballImg.width / 2;
	ballY = barY - barImg.height;

}

function ballVerif(){
    if (ballX <= 0){
       horizontalSpeed = -horizontalSpeed;
    }

   if (ballX + ballImg.width >= screenWidth   ) { horizontalSpeed = -horizontalSpeed;}
   
    if (ballY < 2)  {
            verticalSpeed = -verticalSpeed;
   }

        

    if( (ballX + ballImg.width > barX) && (ballX < (barX + barImg.width)) && (ballY + ballImg.height >= barY +1 ))
    {
    verticalSpeed = -verticalSpeed;
    
    if(ballX < barX + barImg.width*0.25)
    {
        horizontalSpeed = -speed;
    }
    else if(ballX < barX + barImg.width*0.5)
    {
        horizontalSpeed = -(horizontalSpeed/2);
    }
    else if(ballX < barX + barImg.width*0.75)
    {
        horizontalSpeed = -horizontalSpeed/2;
    }
    else
    {
        horizontalSpeed = speed;
    }
    
    }  
    if (ballY + ballImg.height - 8 > barY){
        alert("You loose!");
    }
}

function ballMove() {
    
	ballX +=horizontalSpeed;
	ballY += verticalSpeed;
    ballVerif();
    ballHit();
    requestAnimFrame(ballMove);
}

function drawBricks() {
    brickX = 0;
        for (var i = 0; i < 7; i++) {
           /* brickX = brickX + brickImg.width;
            bricksX[i]=brickX;
            bricksY[i]=brickY;
            ctx.drawImage(brickImg,brickX,brickY);*/
        } 
}

function ballHit(){
    for (var i = 0; i < 7; i++) {
    if ((ballX >= bricksX[i])&&(ballX <= bricksX[i]+brickImg.width)&&(ballY <= bricksY[i])&&(ballY >= brickY[i]+brickImg.height)){
        alert("has hit");
    }        
    }

}