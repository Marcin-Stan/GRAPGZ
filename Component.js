class Component {

    constructor(width,height,color,x,y) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
    }

    update(){
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    newPos(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

}