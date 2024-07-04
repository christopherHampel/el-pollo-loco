class World {
    stopRequestAnimationFrame = false;
    startNewCloudX = 200;
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
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
        this.draw();
        this.setWorld();
        this.run();
        this.addNewCloud();
        this.isEndbossVisible();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval( () => {
            this.checkCollisionsEnemies();
            this.collectedItems(this.level.coins);
            this.canCollectBottles();
            this.checkThrowObjects();
            this.checkCollidingWithEndboss();
            this.killChickenFromTop();
            this.lastTriggerKeyboard();
        }, 100);
    }

    isEndbossVisible() {
        let intervalIsEndbossVisible = setInterval( () => {

            let endBossPosition = this.level.enemies[0].x;
            let differencePositions = endBossPosition - -this.camera_x;
    
            if(differencePositions <= 720){
                this.level.enemies[0].active = true;
                clearInterval(intervalIsEndbossVisible);
                this.addNewSmallChicken();
            }
        }, 100);          
    }

    canCollectBottles() {
        if(this.statusbarCoins.collectedCoins > 0) {
            this.collectedItems(this.level.bottles, true);
        }
    }

    killChickenFromTop() {
            for (let i = 1; i < this.level.enemies.length; i++) {
                let enemy = this.level.enemies[i];
                if(this.character.isColliding(enemy) && this.character.isAboveGround()) {
                    this.character.notInjured = true;
                    enemy.chickenIsDead();
                    setTimeout(() => this.deleteKilledChicken(enemy), 250);
                    setTimeout(() => {
                        this.character.notInjured = false;
                    }, 1500);
                }
        }
    }

    deleteKilledChicken(enemy) {
        let indexKilledChicken = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(indexKilledChicken, 1);
    }

    checkCollisionsEnemies() {
        this.level.enemies.forEach( (enemy) => {
            // let indexKilledChicken = this.level.enemies.indexOf(enemy);
            if(this.character.isColliding(enemy)){
                this.character.hit(5);
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        })
    }

    addNewCloud() {
        setInterval( () => {
            if(this.startNewCloudX < 5000) {
                let newCloud = new Cloud(this.startNewCloudX);
                this.level.cloud.push(newCloud);
                this.startNewCloudX += 250;
            }
        }, 1000);
    }

    lastTriggerKeyboard(){
        return lastPressKeyboard;
    }

    collectedItems(items, isBottle = false) {
        items.forEach( (item) => {
            if(this.character.isColliding(item)){
                this.deleteCollectedItems(items, item);
                this.countCollectedItems(items, isBottle);
            }
        })
    }

    deleteCollectedItems(items, item) {
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }
    }

    countCollectedItems(items, isBottle) {
        if(items == this.level.coins) {
            this.statusbarCoins.collectedCoins++;
            this.statusbarCoins.setPercentage(this.statusbarCoins.collectedCoins);
        } else if(isBottle) {
            this.statusbarCoins.collectedCoins--;
            this.statusbarCoins.setPercentage(this.statusbarCoins.collectedCoins);
        } else {
            this.statusbarBottles.collectedBottles++;
            this.statusbarBottles.setPercentage(this.statusbarBottles.collectedBottles);
        }
    }
 
    checkThrowObjects() {
        if(this.keyboard.D && this.statusbarBottles.collectedBottles > 0) {
            this.throwBottle();
            this.reduceCollectedBottles();
        }
    }

    throwBottle() {
        let bottle = new TrowableObject(this.character.x + this.character.offset.right, this.character.y + 50);
        this.throwableObjects.push(bottle);
    }

    reduceCollectedBottles() {
        this.statusbarBottles.collectedBottles--;
        this.statusbarBottles.setPercentage(this.statusbarBottles.collectedBottles);
    }

    checkCollidingWithEndboss() {
        let currentBottle = this.throwableObjects[this.throwableObjects.length - 1];
        let endboss = this.level.enemies[0];

        if(currentBottle.isColliding(endboss) && !currentBottle.collidingWithEndboss) {
            this.level.enemies[0].hit(19);
            this.statusbarEndboss.setPercentage(this.level.enemies[0].energy);
            this.throwableObjects[this.throwableObjects.length - 1].collidingWithEndboss = true;
        }
    }

    addNewSmallChicken() {
        setInterval( () => {
            let xPositionEndboss = this.level.enemies[0].x + this.level.enemies[0].offset.left;
            let newSmallChicken = new SmallChicken(xPositionEndboss);
            this.level.enemies.push(newSmallChicken);
            this.level.enemies[0].endbossAttack = true;
        }, 5000);
    }

    clearRectCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clearRectCanvas();

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.cloud);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarEndboss);

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
        // movableObject.drawRect(this.ctx);
        // movableObject.drawRectOffset(this.ctx);
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