/**
 * Class representing an object that can be thrown and interacts with the world.
 * Extends MovableObject to include movement and gravity functionalities.
 */
class TrowableObject extends MovableObject {

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    offset = {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10,
    };

    world;
    throwBottleSound = new Audio('audio/throw-alternative.mp3');

    /**
     * Creates an instance of TrowableObject and initializes its properties.
     * @param {number} x - The initial x position of the bottle.
     * @param {number} y - The initial y position of the bottle.
     * @param {boolean} otherDirection - Indicates the direction of the throw.
     */
    constructor(x, y, otherDirection){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_ROTATION);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 100;
        this.width = 40;
        this.collidingWithEndboss = false;

        this.throw();
        this.splash();
        this.startRotation();
    }

    /**
     * Initiates the throwing action of the bottle.
     */
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

    /**
     * Starts the rotation animation of the bottle.
     */
    startRotation() {
        this.intervalRotation = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);
    }

    /**
     * Initiates the splash effect when the bottle hits the ground.
     */
    splash() {
        this.intervalSplash = setInterval( () => {
            if(this.splashBottleOnGround()) {
                this.splashBottle();
            }
        }, 25)
    }

    /**
     * Handles the splash effect of the bottle and removes it from the world.
     */
    splashBottle() {
        clearInterval(this.intervalThrow);
        clearInterval(this.intervalSplash);
        clearInterval(this.gravityInterval);
        clearInterval(this.intervalRotation);
        this.splashAnimation = setInterval( () => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 50)
        setTimeout(() => {
            clearInterval(this.splashAnimation);
            this.delete();
        }, this.IMAGES_SPLASH.length * 50);
    }

    /**
     * Determines if the bottle has hit the ground.
     * @returns {boolean} True if the bottle is on the ground and there are throwable objects in the world.
     */
    splashBottleOnGround() {
        return !this.isAboveGround() && this.world.throwableObjects.length > 0;
    }
    /**
    * Removes this throwable object from the world's list of throwable objects.
    * This method finds the index of this object in the world's `throwableObjects` array
    * and removes it if it exists.
    */
    delete() {
        let index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
}