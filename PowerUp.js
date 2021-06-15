class PowerUp{
    constructor(brick){
        this.colors=["#fcba03",
            "#3dfc03",
            "#03fcf0",
            '#033dfc',
            "#fc036b"];
        this.color='';
        this.isPicked=false;
        this.startTime=null;
        this.x=brick.x;
        this.y=brick.y;
        this.size=35;
        this.type=this.getRandomInt(0,5);
        this.isActive=false;

    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    update(platform){
        this.y++;
        if((((this.x>platform.x)&&(this.x<platform.x+platform.width))&&(this.y+this.size>platform.y)&&(this.y<platform.y+platform.height))&&(!this.isPicked)){
            this.isPicked=true;
            this.startTime=Date.now();
            this.isActive=true;
        }
        if(this.isActive){
        }
        if(Date.now()-this.startTime>5000){
            this.isActive=false;
        }

        if(!this.isPicked){
            const ctx = myGameArea.context;
            ctx.fillStyle = this.colors[this.type];
            ctx.fillRect(this.x, this.y, this.size, this.size);

            ctx.font = "15px Arial";
            ctx.fillStyle='white';

            switch(this.type){
                case 0:
                    ctx.fillText('x2', this.x+this.size/3, this.y+2*this.size/3);
                    break;
                case 1:
                    ctx.fillText('x5', this.x+this.size/3, this.y+2*this.size/3);
                    break;
                case 2:
                    ctx.fillText('<=>', this.x+this.size/3, this.y+2*this.size/3);
                    break;
                case 3:
                    ctx.fillText('>=<', this.x+this.size/3, this.y+2*this.size/3);
                    break;
                case 4:
                    ctx.fillText('!', this.x+this.size/3, this.y+2*this.size/3);
                    break;

            }


        }
    }

}
