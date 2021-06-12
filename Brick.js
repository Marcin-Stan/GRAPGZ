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
            new Brick(70,50,50,20,"blue",true),
            new Brick(121,50,50,20,"blue",true),
            new Brick(172,50,50,20,"blue",true),
            new Brick(223,50,50,20,"blue",true),
            new Brick(274,50,50,20,"blue",true),
            new Brick(325,50,50,20,"blue",true),
            new Brick(376,50,50,20,"blue",true),
            new Brick(427,50,50,20,"blue",true),
            new Brick(478,50,50,20,"blue",true),
            new Brick(529,50,50,20,"blue",true),

            new Brick(70,71,50,20,"green",false),
            new Brick(121,71,50,20,"green",false),
            new Brick(172,71,50,20,"green",false),
            new Brick(223,71,50,20,"green",false),
            new Brick(274,71,50,20,"green",false),
            new Brick(325,71,50,20,"green",false),
            new Brick(376,71,50,20,"green",false),
            new Brick(427,71,50,20,"green",false),
            new Brick(478,71,50,20,"green",false),
            new Brick(529,71,50,20,"green",false),

            new Brick(70,92,50,20,"darkcyan",false),
            new Brick(121,92,50,20,"darkcyan",false),
            new Brick(172,92,50,20,"darkcyan",false),
            new Brick(223,92,50,20,"darkcyan",false),
            new Brick(274,92,50,20,"darkcyan",false),
            new Brick(325,92,50,20,"darkcyan",false),
            new Brick(376,92,50,20,"darkcyan",false),
            new Brick(427,92,50,20,"darkcyan",false),
            new Brick(478,92,50,20,"darkcyan",false),
            new Brick(529,92,50,20,"darkcyan",false),

            new Brick(70,113,50,20,"yellow",false),
            new Brick(121,113,50,20,"yellow",false),
            new Brick(172,113,50,20,"yellow",false),
            new Brick(223,113,50,20,"yellow",false),
            new Brick(274,113,50,20,"yellow",false),
            new Brick(325,113,50,20,"yellow",false),
            new Brick(376,113,50,20,"yellow",false),
            new Brick(427,113,50,20,"yellow",false),
            new Brick(478,113,50,20,"yellow",false),
            new Brick(529,113,50,20,"yellow",false)
        ];
    }

}