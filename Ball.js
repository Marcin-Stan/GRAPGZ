class Ball{

    constructor(radius, color, x, y, isSideMode) {
        this.radious = radius;
        this.color = color;
        this.x = x;
        this.y = y;
        this.startSpeed=3;
        this.speedX = 3;
        this.speedY = 3;
        this.historyX=[];
        this.historyY=[];
        this.historyBrick=[];
        this.historyBrickSpecial=[];
        this.isSideMode = isSideMode;
    }

    update(){

        this.ctx = myGameArea.context;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radious,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle="red";
        this.ctx.fillText(points, 10, 35);
        for(let i=0; i<this.historyX.length; i++){
            this.ctx.fillStyle = this.color;
            this.ctx.globalAlpha=1-((6+i)*0.1);
            this.ctx.beginPath();
            this.ctx.arc(this.historyX[i],this.historyY[i],this.radious,0,2*Math.PI);
            this.ctx.fill();
        }
        this.ctx.globalAlpha=1;

    }

    newPos(bricks,platform, platform2){
        this.historyX.unshift(this.x);
        this.historyY.unshift(this.y);
        if(this.speedX>0){
            for(let i =1;i<this.speedX;i++){
                this.collisionBallX();

                this.checkBallColisionWithBrick(bricks);
                if(this.isSideMode){
                    this.collisionPlatform2(platform2.x,platform2.y,platform2.width,platform2.height);
                }

            }
        }else {
            for(let i =-1;i>=this.speedX;i--){
                this.collisionBallX();
                this.checkBallColisionWithBrick(bricks);
                if(this.isSideMode){
                    this.collisionPlatform2(platform2.x,platform2.y,platform2.width,platform2.height);
                }

            }
        }

        if(this.speedY>0){
            for(let j=1;j<this.speedY;j++){
                this.collisionBallY();
                this.collisionPlatform(platform.x,platform.y,platform.width);
                this.checkEndOfBricks(bricks);

            }
        }else {
            for(let j=-1;j>=this.speedY;j--){
                this.collisionBallY();
                this.collisionPlatform(platform.x,platform.y,platform.width);
                this.checkEndOfBricks(bricks);

            }
        }
        this.x +=this.speedX;
        this.y += this.speedY;

        if(this.historyX.length>10){
            this.historyX.pop();
            this.historyY.pop();
        }
    }

    collisionPlatform(x,y,width){
        let platformPiece;
        let vector;
        if((this.y>=y-this.radious)&&((this.x<=x+width)&&(this.x>=x))){
            this.speedY=(-1)*this.speedY;
            platformPiece=width/10;
            vector=this.speedX/Math.abs(this.speedX)
            switch(true){
                case this.x<x+platformPiece:
                    this.speedX=this.startSpeed*3;
                    break;
                case this.x<x+3*platformPiece:
                    this.speedX=this.startSpeed*2;
                    break;
                case this.x<x+4*platformPiece:
                    this.speedX=this.startSpeed*1.5;
                    break;
                case this.x<x+6*platformPiece:
                    this.speedX=this.startSpeed;
                    break;
                case this.x<x+7*platformPiece:
                    this.speedX=this.startSpeed*1.5;
                    break;
                case this.x<x+9*platformPiece:
                    this.speedX=this.startSpeed*2;
                    break;
                case this.x<x+width:
                    this.speedX=this.startSpeed*3;
                    break;
                default:
                    this.speedX=this.speedX;
            }
            this.speedX=this.speedX*vector;
        }
    }

    collisionPlatform2(x,y,width,height){
        let platformPiece;
        let vector;
        if((this.x<=x-this.radious+width)&&((this.y<=y+height)&&(this.y>=y))){
            this.speedX=(-1)*this.speedX;
            platformPiece=height/10;
            vector=this.speedY/Math.abs(this.speedY)
            switch(true){
                case this.x<x+platformPiece:
                    this.speedY=this.startSpeed*3;
                    break;
                case this.x<x+3*platformPiece:
                    this.speedY=this.startSpeed*2;
                    break;
                case this.x<x+4*platformPiece:
                    this.speedY=this.startSpeed*1.5;
                    break;
                case this.x<x+6*platformPiece:
                    this.speedY=this.startSpeed;
                    break;
                case this.x<x+7*platformPiece:
                    this.speedY=this.startSpeed*1.5;
                    break;
                case this.x<x+9*platformPiece:
                    this.speedY=this.startSpeed*2;
                    break;
                case this.x<x+width:
                    this.speedY=this.startSpeed*3;
                    break;
                default:
                    this.speedY=this.speedY;
            }
            this.speedX=this.speedX*vector;
        }
    }

    collisionBallY(){
        if(this.y<=10){
            this.speedY=(-1)*this.speedY;
        }
    }

    collisionBallX(){
        if((this.x>=630)||(!this.isSideMode&&(this.x<=10))){
            this.speedX=(-1)*this.speedX;
        }
    }

    collisionDown(balls){
        if(balls.length===1 && (this.y>480)||(this.x<-5) ){
            this.ctx.font = "40px Arial";
            this.ctx.fillStyle="red";
            this.ctx.fillText("Koniec gry", 250, 200);
            clearInterval(interval);
            points=0;
            this.startSpeed=1;
            return true;
        }else if((this.y>480)||(this.x<-5)){
            return false;
        }else return 20;
    }


    checkBallColisionWithBrick(bricks){
        for(let i=0; i<bricks.length; i++){

            if(((this.y-this.radious<=bricks[i].y+bricks[i].height)
                &&(this.y+this.radious>=bricks[i].y))
                &&(this.x>=bricks[i].x)
                &&(this.x<=bricks[i].x+bricks[i].width)){

                if(bricks[i].special){
                    this.historyBrickSpecial.push(bricks[i]);
                }else{
                    numberOfBrokenBricks++;
                }

                this.getNewPowerUp(bricks[i]);
                this.historyBrick.push(bricks[i]);

                this.historyBrick.push(bricks[i]);
                bricks.splice(i,1);
                this.speedY = (-1) * this.speedY;
                points+=1*brickValue;

            }else{
                if(((this.x-this.radious<=bricks[i].x+bricks[i].width)
                    &&(this.x+this.radious>=bricks[i].x))
                    &&(this.y<=bricks[i].y+bricks[i].height)
                    &&(this.y>=bricks[i].y)){

                    if(bricks[i].special){
                        this.historyBrickSpecial.push(bricks[i]);
                    }else{
                        numberOfBrokenBricks++;
                    }
                    this.getNewPowerUp(bricks[i]);
                    this.historyBrick.push(bricks[i]);

                    bricks.splice(i,1);
                    this.speedX = (-1) * this.speedX;
                    points+=1*brickValue;
                }
            }
        }
    }

    getNewPowerUp(brick){
       if(numberOfBrokenBricks>=5){
           numberOfBrokenBricks=0;
           console.log(brick);
           var powerUp = new PowerUp(brick);
           powerUps.push(powerUp);
       }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    printNumberOfBricks(balls, isSlidePlatform){
        if(this.historyBrickSpecial.length>=3){
            let ball = new Ball(8,"red",100,170,isSlidePlatform);
            this.historyBrickSpecial=[];
            return balls.push(ball);
        }
    }
    setRandomBrokenBlock(bricks){
        if(this.historyBrick.length>5){
            let number = this.getRandomInt(0,this.historyBrick.length-1);
            bricks.push(this.historyBrick[number]);
            this.historyBrick.splice(number,1);
        }
        return bricks;
    }


    checkEndOfBricks(bricks){
        if(bricks.length===0){
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle="red";
            this.ctx.fillText("Koniec poziomu", 180, 200);
            clearInterval(interval);
            points=0;
            return true;
        }
    }





}
