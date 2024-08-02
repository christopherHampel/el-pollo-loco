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

    isAboveGround() {
        if(this instanceof TrowableObject) {
            return this.y < 350;
        } else {
            return this.y < 220;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft(speed) {
        this.x -= speed;
    }

    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
        this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
        this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
        this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;
    }

    jump() {
        this.speedY = 22;
        this.isInAir = true;
    }

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

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit // Differenz in millisekunden zum letzten verletzt sein
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead(maxEnergy) {
        return this.energy <= maxEnergy;
    }

    chickenIsDead() {
        clearInterval(this.intervalMoveLeft);
        clearInterval(this.intervalMovePlayAnimation);
        this.loadImage(this.IMAGE_DEAD);
    }

    movableObjectsSound(boolean) {
        this.chicken_scream_audio.muted = boolean;
    }
}