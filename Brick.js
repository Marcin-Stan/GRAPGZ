class Brick {

    constructor(x,y,width,height,color,special) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.bricks=[];
        this.special = special;
        this.update=function(){
            const ctx = myGameArea.context;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    loadMap(){
        return this.bricks = [
            new Brick(50,50,50,30,"blue",true),
            new Brick(101,50,50,30,"blue",true),
            new Brick(152,50,50,30,"blue",true),
            new Brick(203,50,50,30,"blue",true),
            new Brick(254,50,50,30,"blue",true),
            new Brick(305,50,50,30,"blue",true),
            new Brick(356,50,50,30,"blue",true),
            new Brick(407,50,50,30,"blue",true),
            new Brick(458,50,50,30,"blue",true),
            new Brick(509,50,50,30,"blue",true),

            new Brick(50,81,50,30,"green",false),
            new Brick(101,81,50,30,"green",false),
            new Brick(152,81,50,30,"green",false),
            new Brick(203,81,50,30,"green",false),
            new Brick(254,81,50,30,"green",false),
            new Brick(305,81,50,30,"green",false),
            new Brick(356,81,50,30,"green",false),
            new Brick(407,81,50,30,"green",false),
            new Brick(458,81,50,30,"green",false),
            new Brick(509,81,50,30,"green",false),

            new Brick(50,112,50,30,"darkcyan",false),
            new Brick(101,112,50,30,"darkcyan",false),
            new Brick(152,112,50,30,"darkcyan",false),
            new Brick(203,112,50,30,"darkcyan",false),
            new Brick(254,112,50,30,"darkcyan",false),
            new Brick(305,112,50,30,"darkcyan",false),
            new Brick(356,112,50,30,"darkcyan",false),
            new Brick(407,112,50,30,"darkcyan",false),
            new Brick(458,112,50,30,"darkcyan",false),
            new Brick(509,112,50,30,"darkcyan",false)
        ];
    }

}