    let myPlatform;
    let myPlatform2;
    let myBall;
    let interval;
    let isPaused;
    let isEnd;
    let points=0;
    let isSidePlatform;
    let bricks=[];
    let brick;

    myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 600;
            this.canvas.height = 400;
            this.canvas.style= "text-align:center";
            this.context = this.canvas.getContext("2d");
            //this.document.body.insertBefore(this.canvas, this.document.body.childNodes[0]);
            let container_block = document.getElementById('gameArea');
            container_block.appendChild(this.canvas);
            this.interval = setInterval(this.updateGameArea, 20);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        }
    }

     function startGame(){
        this.brick = new Brick();
        this.points=0;
        if(this.isPaused===false||this.isEnd===true){
            this.bricks = this.brick.loadMap();
            this.isEnd = false;
            this.isPaused=false;
            clearInterval(this.interval);
            this.myPlatform = new Component(150, 20, "blue", 200, 360);
            this.myPlatform2= new Component(20, 150, "blue", 10, 100);
            this.myBall = new Ball(10,"green",100,170);
            this.myGameArea.start();
        }else {
            this.isPaused=false;
        }
    }

    function  updateGameArea(){
        if(this.isPaused===false){
            this.myGameArea.clear();
            this.bricks.forEach((brick)=>{
                brick.update();
            });
            this.myBall.collisionBall();
            this.myBall.collisionPlatform(myPlatform.x,myPlatform.y,myPlatform.width);
            if(this.isSidePlatform){
                this.myBall.collisionPlatform2(this.myPlatform2.x,this.myPlatform2.y,this.myPlatform2.width, this.myPlatform2.height);
            }
            this.myBall.checkBallColisionWithBrick(this.bricks);
            this.myBall.checkEndOfBricks(this.bricks);
            this.myBall.newPos();
            this.myBall.update();

            this.checkPlatformEdgePadding();
            this.myPlatform.newPos();
            this.myPlatform.update();
            if(this.isSidePlatform){
                this.myPlatform2.newPos();
                this.myPlatform2.update();
            }
            this.myBall.collisionDown();
        }else {
            ctx.font = "40px Arial";
            ctx.fillStyle="red";
            ctx.fillText("Stop", 250, 200);
        }

    }

    function  checkPlatformEdgePadding(){
        if((this.myPlatform.x+this.myPlatform.width>=595&&(this.myPlatform.speedX>0))||(this.myPlatform.x<=5&&(this.myPlatform.speedX<0))){
            this.myPlatform.speedX=0;
        }
        if((this.myPlatform2.y+this.myPlatform2.height>=395&&(this.myPlatform2.speedY>0))||(this.myPlatform2.y<=5&&(this.myPlatform2.speedY<0))){
            this.myPlatform2.speedY=0;
        }
    }

    function  moveleft() {
        this.myPlatform.speedX = -5;

    }

    function  moveright() {
        this.myPlatform.speedX = 5;

    }
    function  moveup(){
        this.myPlatform2.speedY=-5;
    }
    function  movedown(){
        this.myPlatform2.speedY=5;
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
        this.isPaused=true;
    }
    function  toogleSidePlatform(){
        this.isSidePlatform=!this.isSidePlatform;
        this.startGame();
    }



    /*
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


     */
