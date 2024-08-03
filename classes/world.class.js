/**
 * Class representing the game world, managing game objects, interactions, and game logic.
 */
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

    collect_coin_sound = new Audio('audio/collect_coin.mp3');
    collect_bottle_sound = new Audio('audio/collect_bottle_sound.mp3');

    /**
     * Creates an instance of the World class and initializes its properties.
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
     * @param {Keyboard} keyboard - The keyboard input object.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; 
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.addNewCloud();
        this.isEndbossVisible();
        this.addNewSmallChicken();
    }

    /**
     * Sets the world reference for all game objects.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.throwableObjects.forEach(obj => obj.world = this);
    }

    /**
     * Starts the main game loop.
     */
    run() {
        setInterval( () => {
            this.checkCollisionsEnemies();
            this.collectedBottles();
            this.collectedItems(this.level.coins, this.statusbarCoins.collectedCoins);
            this.checkThrowObjects(); 
            this.lastTriggerKeyboard();
        }, 100);
    }

    /**
     * Checks if the endboss should be visible and animates it if necessary.
     */
    isEndbossVisible() {
        let intervalIsEndbossVisible = setInterval( () => {    
            if(this.character.x > 2050) {
                this.level.enemies[0].animate();
                this.checkBottlesAvailable();
                clearInterval(intervalIsEndbossVisible);
            }
        }, 100);          
    }

    /**
    * Checks for collisions between the character and enemies.
    * Applies different collision logic based on the index of the enemy.
    */
    checkCollisionsEnemies() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            
            if(i === 0) {
                this.collisionWithEndboss(enemy)
            } else {
                this.collisionWithNormalChicken(enemy)
            }
        }
    }

    /**
     * Handles collisions between the character and the endboss.
     * If the character is colliding with the endboss, is not above ground, and the endboss is not killed,
     * the character receives damage.
     * @param {Object} enemy - The enemy object (in this case, the endboss) to check collision with.
     */
    collisionWithEndboss(enemy) {
        if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.killed){
            this.characterHit(50);
        }
    }

    /**
    * Handles collisions between the character and normal chickens.
    * If the character is colliding with a normal chicken and is not above ground, and the chicken is not killed,
    * the character receives damage.
    * If the character is colliding with a normal chicken, is above ground, and is not hurt, the chicken is killed from the top.
    * @param {Object} enemy - The enemy object (in this case, a normal chicken) to check collision with.
    */
    collisionWithNormalChicken(enemy) {
        if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.killed){
            this.characterHit(18);
        } else if(this.character.isColliding(enemy) && !enemy.killed && this.character.isAboveGround() && !this.character.isHurt()) {
            this.killChickenFromTop(enemy);
        }
    }

    /**
     * Handles the character being hit by an enemy.
     * @param {Enemy} enemy - The enemy causing the hit.
     */
    characterHit(worthDamaging) {
        let now = new Date().getTime();

        if (this.character.characterHitTime(now)) {
            this.character.lastHitTime = now;
            this.character.character_hurt_sound.play();
            this.character.hit(worthDamaging);
            this.statusbarHealth.setPercentage(this.character.energy);
            this.characterCurrentlyHurt();
        }
    }

    characterCurrentlyHurt() {
        this.character.setHurt(true);
        setTimeout(() => {
            this.character.setHurt(false);
        }, 1000);
    }

    /**
     * Handles killing an enemy from above.
     * @param {Enemy} enemy - The enemy to be killed.
     */
    killChickenFromTop(enemy) {
        enemy.chicken_scream_audio.play();
        enemy.killed = true;
        enemy.chickenIsDead();
        setTimeout(() => this.deleteKilledChicken(enemy), 250);
    }

    /**
     * Removes a killed enemy from the level.
     * @param {Enemy} enemy - The killed enemy.
     */
    deleteKilledChicken(enemy) {
        let indexKilledChicken = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(indexKilledChicken, 1);
    }

    /**
     * Adds new clouds to the level at intervals.
     */
    addNewCloud() {
        setInterval( () => {
            if(this.startNewCloudX < 5000) {
                let newCloud = new Cloud(this.startNewCloudX);
                this.level.cloud.push(newCloud);
                this.startNewCloudX += 500;
            }
        }, 1000);
    }

    /**
     * Handles the last triggered keyboard input.
     * @returns {number} The last pressed keyboard key code.
     */
    lastTriggerKeyboard(){
        return lastPressKeyboard;
    }

    /**
     * Checks and processes collected bottles and coins.
     */
    collectedBottles() {
        if(this.statusbarCoins.collectedCoins > 0) {
            this.collectedItems(this.level.bottles, this.statusbarBottles.collectedBottles);
        }
    }

    /**
     * Processes items collected by the character.
     * @param {Array} items - Array of collectible items.
     * @param {number} amountItems - Number of collected items.
     */
    collectedItems(items, amountItems) {
        items.forEach( (item) => {
            if(amountItems < 5) {
                if(this.character.isColliding(item)){
                    this.deleteCollectedItems(items, item);
                    this.countCollectedItems(items, true);
                }
            }
        })
    }

    /**
     * Removes a collected item from the array.
     * @param {Array} items - Array of items.
     * @param {Object} item - The item to remove.
     */
    deleteCollectedItems(items, item) {
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }
    }

    /**
     * Updates the count of collected items and plays the appropriate sound.
     * @param {Array} items - Array of items.
     * @param {boolean} isBottle - Indicates if the item is a bottle.
     */
    countCollectedItems(items, isBottle) {
        if(items == this.level.coins) {
            this.statusbarCoins.collectedCoins++;
            this.statusbarCoins.setPercentage(this.statusbarCoins.collectedCoins);
            this.collect_coin_sound.play();
        } else if(isBottle) {
            this.statusbarCoins.collectedCoins--;
            this.statusbarBottles.collectedBottles++;
            this.statusbarCoins.setPercentage(this.statusbarCoins.collectedCoins);
            this.statusbarBottles.setPercentage(this.statusbarBottles.collectedBottles);
            this.collect_bottle_sound.play();
        }
    }
 
    /**
     * Checks for throw actions based on keyboard input.
     */
    checkThrowObjects() {
        if(this.keyboard.D && this.statusbarBottles.collectedBottles > 0) {
            this.checkThrowBreak();
        }
    }

    /**
     * Manages the timing of throwing bottles to prevent spamming.
     */
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

    /**
     * Throws a new bottle and adds it to the world.
     */
    throwBottle() {
        let bottle = new TrowableObject(this.character.x + this.character.offset.right, this.character.y + 50, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        bottle.world = this;
        this.character.throwBottleSound.play();
    }

    /**
     * Reduces the number of collected bottles in the status bar.
     */
    reduceCollectedBottles() {
        this.statusbarBottles.collectedBottles--;
        this.statusbarBottles.setPercentage(this.statusbarBottles.collectedBottles);
    }

    /**
     * Checks if there are any bottles that have collided with the endboss.
     */
    checkBottlesAvailable() {
        setInterval( () => {
            if(this.throwableObjects.length > 0) {
                this.checkBottlesCollidingWithEndboss();
            }
        }, 100);
    }

    /**
     * Checks if any throwable bottles are colliding with the endboss.
     */
    checkBottlesCollidingWithEndboss() {
        let currentBottle = this.throwableObjects[0];
        let endboss = this.level.enemies[0];

        if(currentBottle.isColliding(endboss) && !currentBottle.collidingWithEndboss) {
            currentBottle.splashBottle();
            this.damageEndboss(endboss);
        }
    }

    /**
     * Damages the endboss and updates its health status.
     * @param {Endboss} endboss - The endboss to be damaged.
     */
    damageEndboss(endboss) {
        endboss.chicken_scream_audio.play();
        endboss.hit(19);
        this.statusbarEndboss.setPercentage(this.level.enemies[0].energy);
        this.throwableObjects[this.throwableObjects.length - 1].collidingWithEndboss = true;
    }

    /**
     * Adds new small chickens to the level at intervals.
     */
    addNewSmallChicken() {
        setInterval( () => {
            let xPositionEndboss = this.level.enemies[0].x + this.level.enemies[0].offset.left;
            let newSmallChicken = new SmallChicken(xPositionEndboss);
            this.level.enemies.push(newSmallChicken);
            newSmallChicken.movableObjectsSound(isMuted);
            this.level.enemies[0].endbossAttack = true;
        }, 8000);
    }

    /**
     * Clears the canvas.
     */
    clearRectCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws all game objects onto the canvas.
     */
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

    /**
     * Adds multiple objects to the canvas map.
     * @param {Array} objects - Array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(movableObject => {
            this.addToMap(movableObject)
        })
    }

    /**
     * Adds a single object to the canvas map.
     * @param {MovableObject} movableObject - The object to be added to the map.
     */
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

    /**
     * Flips an image horizontally.
     * @param {MovableObject} movableObject - The object whose image should be flipped.
     */
    flipImage(movableObject) {
        this.ctx.translate(movableObject.x + movableObject.width, movableObject.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(movableObject.img, 0, 0, movableObject.width, movableObject.height);
    }

    /**
     * Draws an image without flipping.
     * @param {MovableObject} movableObject - The object to be drawn.
     */
    flipImageBack(movableObject) {
        this.ctx.drawImage(
            movableObject.img,
            movableObject.x, movableObject.y,
            movableObject.width, movableObject.height
        );
    }

    /**
     * Determines if the character is still alive.
     * @returns {boolean} True if the character is alive, otherwise false.
     */
    isCharacterDead() {
        return this.character.energy > 0;
    }

    /**
     * Clears all intervals.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Displays the end screen when the game is over.
     */
    showEndscreen() {
        let canvasOverlay = document.getElementById('canvasOverlay');
        let mobileSteeringBackground = document.getElementById('mobileSteeringBackground');

        this.gameOver = true;
        this.clearAllIntervals();

        canvasOverlay.classList.remove('vs-hidden');
        mobileSteeringBackground.classList.add('visibility-hidden');

        this.showWinOrLostScreen(canvasOverlay)
    }

        /**
     * Displays the win or game over screen based on the character's status.
    * @param {HTMLElement} canvasOverlay - The canvas overlay element to display the screen.
    */
        showWinOrLostScreen(canvasOverlay) {
            if (this.isCharacterDead()) {
               canvasOverlay.innerHTML = htmlWinScreen();
            } else {
               canvasOverlay.innerHTML = htmlGameOver();
            }
        }
}