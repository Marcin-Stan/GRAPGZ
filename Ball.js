class Ball{

    constructor(radius, color, x, y) {
        this.radious = radius;
        this.color = color;
        this.x = x;
        this.y = y;

        this.startSpeed=5;
        this.speedX = 5;
        this.speedY = 5;
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
    }

    newPos(){
        this.x +=this.speedX;
        this.y += this.speedY;
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
                    this.speedX=this.speedY;
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
            this.speedY=this.speedY*vector;
        }
    }

    collisionBall(){
        if(this.y<=0){
            this.speedY=(-1)*this.speedY;
        }
        if((this.x>=600)||(!isSidePlatform&&(this.x<=0))){
            this.speedX=(-1)*this.speedX;
        }
    }

    collisionDown(){
        if((this.y>400)||(this.x<-5)){
            this.ctx.font = "40px Arial";
            this.ctx.fillStyle="red";
            this.ctx.fillText("Koniec gry", 250, 200);
            clearInterval(interval);
            points=0;
            this.startSpeed=1;
            return true;
        }
    }

    checkBallColisionWithBrick(bricks){
        for(let i=0; i<bricks.length; i++){

            if(((this.y-this.radious<=bricks[i].y+bricks[i].height)
                &&(this.y+this.radious>=bricks[i].y))
                &&(this.x>=bricks[i].x)
                &&(this.x<=bricks[i].x+bricks[i].width)){

                bricks.splice(i,1);
                this.speedY = (-1) * this.speedY;
                points++;

            }else{
                if(((this.x-this.radious<=bricks[i].x+bricks[i].width)
                    &&(this.x+this.radious>=bricks[i].x))
                    &&(this.y<=bricks[i].y+bricks[i].height)
                    &&(this.y>=bricks[i].y)){

                    bricks.splice(i,1);
                    this.speedX = (-1) * this.speedX;
                    points++;
                }
            }
        }
    }

    checkEndOfBricks(bricks){
        if(bricks.length===0){
            ctx.font = "30px Arial";
            ctx.fillStyle="red";
            ctx.fillText("Koniec poziomu", 180, 200);
            clearInterval(interval);
            points=0;
            return true;
        }
    }





}
