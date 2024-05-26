class World {
    character = new Character();
    enemies   = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // hiermit wird darw() immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(movableObject => {
            this.addToMap(movableObject)
        })
    }

    addToMap(movableObject) {
        this.ctx.save();  // Speichere den aktuellen Zustand des Canvas
        
        if(movableObject.otherDirection) {
            this.ctx.translate(movableObject.x + movableObject.width, movableObject.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
                movableObject.img,
                0, 0,
                movableObject.width, movableObject.height
            );
        } else {
            this.ctx.drawImage(
                movableObject.img,
                movableObject.x, movableObject.y,
                movableObject.width, movableObject.height
            );
        }
    
        this.ctx.restore();  // Stelle den gespeicherten Zustand des Canvas wieder her
    }

    // addToMap(movableObject) {
    //     if(movableObject.otherDirection) {
    //         this.ctx.save();
    //         this.ctx.translate(movableObject.img.width, 0);
    //         this.ctx.scale(-1, 1);
    //     }
    //     this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    //     if(movableObject.otherDirection) {
    //         this.ctx.restore();
    //     }
    // }
}