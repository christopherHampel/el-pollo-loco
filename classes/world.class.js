class World {
    startNewCloudX = 200;
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
    level = level1;
    endboss = this.level.enemies[0];
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    gameOver = false;
    throwableObjects = [new TrowableObject()];
    lastThrowTime = 0;

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
        this.endboss.world = this;
        this.throwableObjects.forEach(obj => obj.world = this);
    }

    run() {
        setInterval( () => {
            this.checkCollisionsEnemies();
            this.collectCoinsOrBottles();
            this.checkThrowObjects(); 
            this.lastTriggerKeyboard();
        }, 100);
    }

    isEndbossVisible() {
        let intervalIsEndbossVisible = setInterval( () => {
    
            if(this.positionCharacterToEndboss()){
                this.level.enemies[0].active = true;
                this.level.enemies[0].kikerikiSound.play();
                clearInterval(intervalIsEndbossVisible);
                this.addNewSmallChicken();
                this.checkCollisionsWithEndboss();
            }
        }, 100);          
    }

    positionCharacterToEndboss() {
        let endBossPosition = this.level.enemies[0].x;
        let difference = endBossPosition - -this.camera_x;

        return difference < 600;
    }

    checkCollisionsEnemies() {
        for (let i = 1; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];            

            if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.killed){
                this.character.hit(5);
                this.statusbarHealth.setPercentage(this.character.energy);
            } else if(this.character.isColliding(enemy) && !enemy.killed && this.character.isAboveGround()) {
                this.killChickenFromTop(enemy);
            }
        }
    }

    killChickenFromTop(enemy) {
        enemy.killed = true;
        enemy.chickenIsDead();
        setTimeout(() => this.deleteKilledChicken(enemy), 250);
    }

    deleteKilledChicken(enemy) {
        let indexKilledChicken = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(indexKilledChicken, 1);
    }

    addNewCloud() {
        setInterval( () => {
            if(this.startNewCloudX < 5000) {
                let newCloud = new Cloud(this.startNewCloudX);
                this.level.cloud.push(newCloud);
                this.startNewCloudX += 500;
            }
        }, 1000);
    }

    lastTriggerKeyboard(){
        return lastPressKeyboard;
    }

    collectCoinsOrBottles() {
        if(this.statusbarCoins.collectedCoins < 5) {
            this.collectedItems(this.level.coins);
        }
        if(this.statusbarBottles.collectedBottles < 5) {
            this.collectedItems(this.level.bottles);
        }
    }

    collectedItems(items) {
        items.forEach( (item) => {
            if(this.character.isColliding(item)){
                this.deleteCollectedItems(items, item);
                this.countCollectedItems(items, true);
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
            this.statusbarBottles.collectedBottles++;
            this.statusbarCoins.setPercentage(this.statusbarCoins.collectedCoins);
            this.statusbarBottles.setPercentage(this.statusbarBottles.collectedBottles);
        }
    }
 
    checkThrowObjects() {
        if(this.keyboard.D && this.statusbarBottles.collectedBottles > 0) {
            this.checkThrowBreak();
        }
    }

    checkThrowBreak() {
        let now = Date.now();
        let throwBreak = 1000;
        let timeDifference = now - this.lastThrowTime

        if (timeDifference >= throwBreak) {
            this.throwBottle();
            this.reduceCollectedBottles();
            this.lastThrowTime = now;
        }
    }

    throwBottle() {
        let bottle = new TrowableObject(this.character.x + this.character.offset.right, this.character.y + 50, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        bottle.world = this;
        // console.log(this.throwableObjects);
        this.character.throwBottleSound.play();
    }

    reduceCollectedBottles() {
        this.statusbarBottles.collectedBottles--;
        this.statusbarBottles.setPercentage(this.statusbarBottles.collectedBottles);
    }

    checkCollisionWithEndboss() {
        if(this.character.isColliding(this.level.enemies[0])){
            this.character.energy = 0;
        }
    }

    checkCollidingBottleWithEndboss() {
        if(this.throwableObjects.length > 0) {
            let currentBottle = this.throwableObjects[0];
            let endboss = this.level.enemies[0];

            if(currentBottle.isColliding(endboss) && !currentBottle.collidingWithEndboss) {
                currentBottle.splashBottle();
                this.damageEndboss();
            }
        }
    }

    damageEndboss() {
        this.level.enemies[0].hit(19);
        this.statusbarEndboss.setPercentage(this.level.enemies[0].energy);
        this.throwableObjects[this.throwableObjects.length - 1].collidingWithEndboss = true;
    }

    addNewSmallChicken() {
        setInterval( () => {
            let xPositionEndboss = this.level.enemies[0].x + this.level.enemies[0].offset.left;
            let newSmallChicken = new SmallChicken(xPositionEndboss);
            this.level.enemies.push(newSmallChicken);
            this.level.enemies[0].endbossAttack = true;
        }, 5000);
    }

    checkCollisionsWithEndboss() {
        setInterval( () => {
            this.checkCollidingBottleWithEndboss();
            this.checkCollisionWithEndboss();
        }, 100);
    }

    clearRectCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clearRectCanvas();

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.cloud);

        if(!this.gameOver) {
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addToMap(this.character);
            this.addObjectsToMap(this.throwableObjects);
        }
        
        this.ctx.translate(-this.camera_x, 0);

        if(!this.gameOver) {
            this.addToMap(this.statusbarHealth);
            this.addToMap(this.statusbarCoins);
            this.addToMap(this.statusbarBottles); 
            this.addToMap(this.statusbarEndboss);
        }

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
    }

    flipImageBack(movableObject) {
        this.ctx.drawImage(
            movableObject.img,
            movableObject.x, movableObject.y,
            movableObject.width, movableObject.height
        );
    }

    showEndscreen() {
        let canvasOverlay = document.getElementById('canvasOverlay');
        let mobileSteeringBackground = document.getElementById('mobileSteeringBackground');

        this.gameOver = true;
        this.clearAllIntervals();

        canvasOverlay.classList.remove('vs-hidden');
        mobileSteeringBackground.classList.add('visibility-hidden');

        this.showWinOrLostScreen(canvasOverlay)
    }

    isCharacterDead() {
        return this.character.energy > 0;
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    showWinOrLostScreen(canvasOverlay) {
        if(this.isCharacterDead()) {
            canvasOverlay.innerHTML = htmlWinScreen();
        } else {
            canvasOverlay.innerHTML = htmlGameOver();
        }
    }
}