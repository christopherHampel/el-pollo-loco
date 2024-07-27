class TrowableObject extends MovableObject {

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    offset = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10,
    };

    world;

    constructor(x, y, otherDirection){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 100;
        this.width = 40;
        this.collidingWithEndboss = false;

        this.throw();
        this.splash();
    }

    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.intervalThrow = setInterval( () => {
            if(this.otherDirection) {
                this.x -= 5;
            } else if(!this.otherDirection) {
                this.x += 5;
            }
        }, 25);
    }

    splash() {
        this.intervalSplash = setInterval( () => {
            if(this.splashBottleOnGround()) {
                this.splashBottle();
            }
        }, 25)
    }

    splashBottle() {
        clearInterval(this.intervalThrow);
        clearInterval(this.intervalSplash);
        clearInterval(this.gravityInterval);
        this.playAnimation(this.IMAGES_SPLASH);
        setTimeout( () => {
            this.world.throwableObjects.splice(this.world.throwableObjects[1], 1);
        }, this.IMAGES_SPLASH.length * 100);
    }

    splashBottleOnGround() {
        return !this.isAboveGround() && this.world.throwableObjects.length > 0
    }
}