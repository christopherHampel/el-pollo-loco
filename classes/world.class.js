class World {
    character = new Character();
    level = level1;
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

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // hiermit wird draw() immer wieder aufgerufen
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
            this.ctx.drawImage(movableObject.img, 0, 0, movableObject.width, movableObject.height);
            movableObject.draw(this.ctx);
        } else {
            this.ctx.drawImage(
                movableObject.img,
                movableObject.x, movableObject.y,
                movableObject.width, movableObject.height
            );
        }

        this.ctx.restore();  // Stelle den gespeicherten Zustand des Canvas wieder her
        movableObject.drawRect(this.ctx);
    }
}