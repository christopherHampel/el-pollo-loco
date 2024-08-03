/**
 * Class representing a drawable object in the game.
 */
class DrawableObject {

    x = 180;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image(); //--> Kurzform für document.createElement('img'), erstellt neues Bildobjekt
        this.img.src = path;
    }


    /**
     * Loads multiple images and caches them.
     * @param {string[]} array - An array of paths to the image files.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the image of the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a rectangle outline representing the bounding box of the object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawRect(ctx) {
        // if(this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        // }
    }

    /**
     * Draws a rectangle outline representing the offset bounding box of the object.
     * This is useful for debugging collision areas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
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