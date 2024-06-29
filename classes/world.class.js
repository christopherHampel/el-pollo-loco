class World {
    stopRequestAnimationFrame = false;
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableObjects = [new TrowableObject()];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; 
        this.keyboard = keyboard;
        // this.level = level;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval( () => {
            this.checkCollisionsEnemies();
            this.collectedItems(this.level.coins);
            this.collectedItems(this.level.bottles);
            this.checkThrowObjects();
            this.jumpOnChicken(this.character.IMAGES_HURT);
        }, 100);
    }

    checkCollisionsEnemies() {
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy) && !this.character.isInAir && !enemy.collisionFromTop){
                this.level.enemies.collisionFromSide = true;
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
            setTimeout( () => {
                this.level.enemies.collisionFromSide = false;
            }, 1000);
        })
    }

    collectedItems(items) {
        items.forEach( (item) => {
            if(this.character.isColliding(item)){
                this.deleteCollectedItems(items, item);
                this.countCollectedItems(items);
            }
        })
    }

    deleteCollectedItems(items, item) {
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }
    }

    countCollectedItems(items) {
        if(items == this.level.coins) {
            this.statusbarCoins.collectedCoins++;
            this.statusbarCoins.setPercentage(this.statusbarCoins.collectedCoins);
        } else {
            this.statusbarBottles.collectedBottles++;
            this.statusbarBottles.setPercentage(this.statusbarBottles.collectedBottles);
        }
    }
 
    checkThrowObjects() {
        if(this.keyboard.D) {
            let bottle = new TrowableObject(this.character.x + this.character.offset.right, this.character.y + 50);
            this.throwableObjects.push(bottle);
            this.level.throwableObjects.throw();
        }
    }

    jumpOnChicken() {
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isInAir && this.character.isColliding(enemy) && !this.level.enemies.collisionFromSide) {
                enemy.collisionFromTop = true;
                if (enemy instanceof Chicken) {
                    enemy.chickenIsDead(this.level.enemies, enemy);
                    setTimeout(() => {
                        const index = this.level.enemies.indexOf(enemy);
                        this.level.enemies.splice(index, 1);
                    }, 200);
                }
             }
            // }
        })
    }

    clearRectCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    draw() {
        this.clearRectCanvas();

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);


        if(!this.stopRequestAnimationFrame){
        // hiermit wird draw() immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
         });
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(movableObject => {
            this.addToMap(movableObject)
        })
    }

    addToMap(movableObject) {
        this.ctx.save();  // Speichere den aktuellen Zustand des Canvas
        
        if(movableObject.otherDirection) {
            this.flipImage(movableObject);
        } else {
            this.flipImageBack(movableObject);
        }

        this.ctx.restore();  // Stelle den gespeicherten Zustand des Canvas wieder her
        movableObject.drawRect(this.ctx);
        movableObject.drawRectOffset(this.ctx);
    }

    flipImage(movableObject) {
        this.ctx.translate(movableObject.x + movableObject.width, movableObject.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(movableObject.img, 0, 0, movableObject.width, movableObject.height);
        // movableObject.draw(this.ctx);
    }

    flipImageBack(movableObject) {
        this.ctx.drawImage(
            movableObject.img,
            movableObject.x, movableObject.y,
            movableObject.width, movableObject.height
        );
    }

    showEndscreen() {
        this.stopRequestAnimationFrame = true;
        document.getElementById('endScreen').style.visibility = 'visible';
    }
}



    // checkCollisionsCoins() {
    //     this.level.coins.forEach( (coin) => {
    //         if(this.character.isColliding(coin)){
    //             const index = this.level.coins.indexOf(coin);
    //             if (index > -1) {
    //                 this.level.coins.splice(index, 1);
    //             }
    //             this.statusbarCoins.collectedCoins++;
    //             this.statusbarCoins.setPercentage(this.statusbarCoins.collectedCoins);
    //         }
    //     })
    // }  

    // checkCollisionsBottles() {
    //     this.level.bottles.forEach( (bottle) => {
    //         if(this.character.isColliding(bottle)){
    //             console.log('Bottle')
    //             const index = this.level.bottles.indexOf(bottle);
    //             if (index > -1) {
    //                 this.level.bottles.splice(index, 1);
    //             }
    //             // this.statusbarCoins.collectedCoins++;
    //             // this.statusbarCoins.setPercentage(this.statusbarCoins.collectedCoins);
    //         }
    //     })
    // }