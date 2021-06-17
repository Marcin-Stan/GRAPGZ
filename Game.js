let myPlatform2;
let interval;
isPaused=false;
isEnd=false;
isFirstMode=false;
isSecondMode=false;
isRunning=false;
let points=0;
let isSidePlatform=false;
let timer = 0;
let btn1;
let btn2;
let btn3;
let btn4;
balls=[];
powerUps=[];
let numberOfBrokenBricks=0;
let brickValue=1;
let platformWidth=128;
let switchControl=false;


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        isRunning = true;
        btn1 = undefined;
        btn2 = undefined;
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.canvas.style= "text-align:center";
        this.context = this.canvas.getContext("2d");
        //this.document.body.insertBefore(this.canvas, this.document.body.childNodes[0]);
        let container_block = document.getElementById('gameArea');
        container_block.appendChild(this.canvas);
        interval =  setInterval(updateGameArea, 20);
        this.canvas.ownerDocument.createElement('button');
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
}


function startGame(){
    btn3.remove();
    btn4.remove();
    powerUps=[];
    this.balls=[];
    this.brick = new Brick();
    timer = 0;
    points=0;
    if(this.isPaused===false||this.isEnd===true){
        this.bricks = this.brick.loadMap();
        this.isEnd = false;
        this.isPaused=false;
        clearInterval(interval);
        this.myPlatform = new Component(platformWidth, 23,200, 430,"paletka.png");
        this.myPlatform2= new Component(23, platformWidth, 10, 100,"paletkaV.png");
        this.myBall = new Ball(8,"green",100,170,isSidePlatform);
        balls.push(this.myBall);
        this.myGameArea.start();
    }else {
        this.isPaused=false;
    }

}

function startGameTest(){
    if(isRunning){
        document.getElementById('gameArea').hidden;
    }

    this.isPaused = false;
    if(typeof btn1 === 'undefined'){
        btn1 = document.createElement('button');
        btn1.innerText = "Tryb losowy blok";
        document.body.appendChild(btn1);

        btn1.addEventListener("click",function () {
            isFirstMode = true;
            isSecondMode = false;
            choosePaletMode();
        });
    }
    if(typeof btn2 === 'undefined') {
        btn2 = document.createElement('button');
        btn2.innerText = "Tryb poziom w dol";
        document.body.appendChild(btn2);

        btn2.addEventListener("click",function () {
            isSecondMode = true;
            isFirstMode = false;
            choosePaletMode();
        });
    }

}

function choosePaletMode(){
    btn1.remove();
    btn2.remove();

    btn3 = document.createElement('button');
    btn3.innerText = "Pozioma platforma";
    document.body.appendChild(btn3);
    btn3.addEventListener("click",function () {
        isSidePlatform = false;
        startGame();
    });

    btn4 = document.createElement('button');
    btn4.innerText = "Pozioma i pionowa platforma";
    document.body.appendChild(btn4);
    btn4.addEventListener("click", function () {
        isSidePlatform = true;
        startGame();
    })

}

function  updateGameArea(){
    let activePowerUps=[false,false,false,false,false];

    if(this.isPaused===false){
        this.myGameArea.clear();
        this.bricks.forEach((brick)=>{
            brick.update();
        });
        powerUps.forEach((powerUp)=>{
            powerUp.update(this.myPlatform);
            if(powerUp.isActive){
                activePowerUps[powerUp.type]=true;
            }
        });
        if(activePowerUps[0]){

            if(activePowerUps[1]){
                brickValue=10;
            }else{
                brickValue=2;
            }

        }else{

            if(activePowerUps[1]){
                brickValue=5;
            }else{
                brickValue=1;
            }
        }

        if(activePowerUps[2]){
            if(!activePowerUps[3]){
                this.myPlatform.width=150;
            }
        }else{
            if(activePowerUps[3]){
                this.myPlatform.width=95;
            }else{
                this.myPlatform.width=platformWidth;
            }
        }
        if(activePowerUps[4]){
            switchControl=true;
        }else{
            switchControl=false;
        }

        /*
        this.balls.forEach((ball)=>{
            this.isEnd = ball.checkEndOfBricks(this.bricks);
            //this.isEnd =  ball.collisionDown(balls);
            if(ball.collisionDown((balls))){
                this.isEnd=true;
            }else {
                balls.splice(1,1);
            }
            ball.newPos(this.bricks,this.myPlatform,this.myPlatform2);
            ball.update();
            ball.printNumberOfBricks(this.balls);
        });

         */

        for(let i=0;i<this.balls.length;i++){

            this.isEnd = this.balls[i].checkEndOfBricks(this.bricks);

            this.balls[i].newPos(this.bricks,this.myPlatform,this.myPlatform2);
            this.balls[i].update();
            this.balls[i].printNumberOfBricks(this.balls,isSidePlatform);

            if(this.balls[i].collisionDown((balls))){
                this.isEnd=true;
            }else {
                balls.splice(i,1);
            }
        }


        //this.isEnd = this.myBall.checkEndOfBricks(this.bricks);

        //this.myBall.newPos(this.bricks,this.myPlatform,this.myPlatform2);
        //this.myBall.update();

        this.checkPlatformEdgePadding();
        this.myPlatform.newPos();
        this.myPlatform.update();
        if(isSidePlatform){
            this.myPlatform2.newPos();
            this.myPlatform2.update();
        }
        //this.isEnd=this.myBall.collisionDown();

        timer++;
        if(timer>300){
            if(isFirstMode){
                this.bricks = this.myBall.setRandomBrokenBlock(this.bricks);
            }
            if(isSecondMode){
                addNewLineBrick();
            }
            timer=0;
        }
        this.myBall.printNumberOfBricks(new Ball(10,"red",100,170,isSidePlatform));

    }else {
        ctx = myGameArea.context;
        ctx.font = "40px Arial";
        ctx.fillStyle="red";
        ctx.fillText("Stop", 250, 200);
    }



}

function addNewLineBrick(){
    this.bricks.forEach((brick)=>{
        brick.y+=31;
    });
    this.bricks.push(
        new Brick(70,50,50,20,"blue",true),
        new Brick(121,50,50,20,"blue",true),
        new Brick(172,50,50,20,"blue",true),
        new Brick(223,50,50,20,"blue",true),
        new Brick(274,50,50,20,"blue",true),
        new Brick(325,50,50,20,"blue",true),
        new Brick(376,50,50,20,"blue",true),
        new Brick(427,50,50,20,"blue",true),
        new Brick(478,50,50,20,"blue",true),
        new Brick(529,50,50,20,"blue",true)
    );

}

function  checkPlatformEdgePadding(){
    if((this.myPlatform.x+this.myPlatform.width>=635&&(this.myPlatform.speedX>0))||(this.myPlatform.x<=5&&(this.myPlatform.speedX<0))){
        this.myPlatform.speedX=0;
    }
    if((this.myPlatform2.y+this.myPlatform2.height>=475&&(this.myPlatform2.speedY>0))||(this.myPlatform2.y<=5&&(this.myPlatform2.speedY<0))){
        this.myPlatform2.speedY=0;
    }
}

function  moveleft() {
    if(!switchControl){
        this.myPlatform.speedX = -5;
    }else{
        this.myPlatform.speedX = 5;
    }
}

function  moveright() {
    if(switchControl){
        this.myPlatform.speedX = -5;
    }else{
        this.myPlatform.speedX = 5;
    }

}
function  moveUp(){
    if(switchControl){
        this.myPlatform.speedY = -5;
    }else{
        this.myPlatform.speedY = 5;
    }
}
function  moveDown(){
    if(!switchControl){
        this.myPlatform.speedY = -5;
    }else{
        this.myPlatform.speedY = 5;
    }
}

function  clearmove() {
    this.myPlatform.speedX = 0;
    this.myPlatform.speedY = 0;
}
function  clearmove2(){
    this.myPlatform2.speedX=0;
    this.myPlatform2.speedY=0;
}


function  pauseGame(){
    var pauseButton = document.getElementById('pauseButton');

    if(this.isPaused===true){
        pauseButton.value = "Stop";
        this.isPaused = false;
        return 0;
    }
      if(this.isPaused===false){
        pauseButton.value = "Start";
        this.isPaused = true;
        return 0;
    }



}


window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37: // Left
            moveleft();
            break;
        case 39: // Right
            moveright();
            break;
        case 40:  //Up
            moveDown();
            break;
        case 38:  //Down
            moveUp();
            break;
    }
}, false);

window.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 37: // Left
            clearmove();
            break;
        case 39: // Right
            clearmove();
            break;
        case 40:
            clearmove2();
            break;
        case 38:
            clearmove2();
            break;

    }
}, false);



