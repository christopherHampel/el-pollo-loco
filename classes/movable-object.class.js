/**
 * Class representing a movable object in the game.
 * Extends DrawableObject with additional properties and methods for movement and collision.
 */
class MovableObject extends DrawableObject {

    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    };
    otherDirection = false;
    speedY = 0;
    accelearation = 2;
    isInAir = false;
    energy = 100;
    lastHit = 0;

    chicken_scream_audio = new Audio('audio/chicken-noise.mp3');

    /**
     * Applies gravity to the object, modifying its vertical position and speed.
     */
    applyGravity() {
        this.gravityInterval = setInterval( () => {
            if(this.isAboveGround() || this.speedY > 0 || this.energy == 0 || this instanceof Endboss) {
                this.y -= this.speedY;
                this.speedY -= this.accelearation;
            } else {
                this.isInAir = false;
            }
        }, 1000 / 25)
    }

    /**
     * Checks if the object is above ground.
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
        if(this instanceof TrowableObject) {
            return this.y < 350;
        } else {
            return this.y < 220;
        }
    }

    /**
     * Plays the animation by cycling through the given image paths.
     * @param {string[]} images - Array of image paths to display.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by a specified speed.
     * @param {number} speed - The speed at which the object moves left.
     */
    moveLeft(speed) {
        this.x -= speed;
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} movableObject - The other object to check collision against.
     * @returns {boolean} True if there is a collision, false otherwise.
     */
    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
        this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
        this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
        this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 22;
        this.isInAir = true;
    }

    /**
     * Applies damage to the object by deducting energy.
     * @param {number} deductionOfEnergy - The amount of energy to deduct.
     */
    hit(deductionOfEnergy) {
        this.energy -= deductionOfEnergy;
        if(this instanceof Character) {
            // this.hurtSound.play();
        }
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt based on the time passed since the last hit.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit // Differenz in millisekunden zum letzten verletzt sein
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead based on its energy level.
     * @param {number} maxEnergy - The maximum energy threshold to determine if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead(maxEnergy) {
        return this.energy <= maxEnergy;
    }

    /**
     * Handles the death of the chicken by stopping its movement and displaying the dead image.
     */
    chickenIsDead() {
        clearInterval(this.intervalMoveLeft);
        clearInterval(this.intervalMovePlayAnimation);
        this.loadImage(this.IMAGE_DEAD);
    }

    /**
     * Mutes or unmutes the sound effects of the object.
     * @param {boolean} boolean - If true, mutes the sound; if false, unmutes it.
     */
    movableObjectsSound(boolean) {
        this.chicken_scream_audio.muted = boolean;
    }
}