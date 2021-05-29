class Brick {

    constructor(x,y,widt,height,color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.bricks=[];
        this.update=function(){
            const ctx = myGameArea.context;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    loadMap(){
        return this.bricks = [
            new Brick(50,50,50,30,"blue"),
            new Brick(101,50,50,30,"blue"),
            new Brick(152,50,50,30,"blue"),
            new Brick(203,50,50,30,"blue"),
            new Brick(254,50,50,30,"blue"),
            new Brick(305,50,50,30,"blue"),
            new Brick(356,50,50,30,"blue"),
            new Brick(407,50,50,30,"blue"),
            new Brick(458,50,50,30,"blue"),
            new Brick(509,50,50,30,"blue"),

            new Brick(50,81,50,30,"green"),
            new Brick(101,81,50,30,"green"),
            new Brick(152,81,50,30,"green"),
            new Brick(203,81,50,30,"green"),
            new Brick(254,81,50,30,"green"),
            new Brick(305,81,50,30,"green"),
            new Brick(356,81,50,30,"green"),
            new Brick(407,81,50,30,"green"),
            new Brick(458,81,50,30,"green"),
            new Brick(509,81,50,30,"green"),

            new Brick(50,112,50,30,"darkcyan"),
            new Brick(101,112,50,30,"darkcyan"),
            new Brick(152,112,50,30,"darkcyan"),
            new Brick(203,112,50,30,"darkcyan"),
            new Brick(254,112,50,30,"darkcyan"),
            new Brick(305,112,50,30,"darkcyan"),
            new Brick(356,112,50,30,"darkcyan"),
            new Brick(407,112,50,30,"darkcyan"),
            new Brick(458,112,50,30,"darkcyan"),
            new Brick(509,112,50,30,"darkcyan")
        ];
    }

}