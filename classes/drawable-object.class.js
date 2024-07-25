class DrawableObject {

    x = 180;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image(); //--> Kurzform für document.createElement('img'), erstellt neues Bildobjekt
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawRect(ctx) {
        // if(this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        // }
    }

    drawRectOffset(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.right, 
                    this.y + this.offset.top, 
                    this.width - this.offset.right - this.offset.left, 
                    this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}