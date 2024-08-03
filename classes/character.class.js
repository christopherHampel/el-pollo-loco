/**
 * Class representing the character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {

    y = 180;
    width = 100;
    height = 220;
    speed = 5;
    offset = {
        top: 90,
        bottom: 10,
        right: 25,
        left: 25,
    };

    currentHurt = false;
    isHurtFlag = false;

    idleTime = 0;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    world;

    jumpSound = new Audio('audio/jump.mp3');
    character_hurt_sound = new Audio('audio/hurt.mp3');
    gameoverSound = new Audio('audio/gameover.mp3');
    runSound = new Audio('audio/run.mp3');
    throwBottleSound = new Audio('audio/throw-alternative.mp3');
    pepe_snoring = new Audio('audio/pepe_snoring.mp3');

    /**
     * Creates an instance of Character.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        this.initAnimationTimer();
        this.initAnimationIdle();
    }

    /**
     * Animates the character by updating its position and handling movements.
     */
    animate() {;
        setInterval(() => {
            if (!this.isHurtFlag) {
                this.handleMovement();
            }
            this.updateCameraPosition();
        }, 1000 / 60);
    }

    /**
     * Initializes the animation timer to update the character's animation.
     */
    initAnimationTimer() {
        setInterval(() => {
            this.updateAnimation();
        }, 100);
    }

    /**
     * Initializes the idle animation for the character.
     */
    initAnimationIdle() {
        setInterval(() => {
            this.characterIdle();
        }, 300);
    }

    /**
     * Handles the character's movements based on keyboard input.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.characterMoveRight();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.characterMoveLeft();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround(220)) {
            this.jump();
            this.jumpSound.play();
        }
    }

    /**
     * Updates the camera position based on the character's position.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 200;
    }

    /**
     * Updates the character's animation based on its state (e.g., walking, jumping, hurt).
     */
    updateAnimation() {
        if (this.isDead(0)) {
            this.gameOverAnimation();
        } else if (this.isHurt()) {
            this.isHurtAnimation();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Handles the idle animation of the character.
     */
    characterIdle() {
        if (!this.isAnyKeyPressed() && !this.isHurt()) {
            this.checkIdleOrLongIdle();
        } 
        
        if(this.isAnyKeyPressed()) {
            this.pepe_snoring.pause();
        }
    }

    /**
     * Checks if the character should play the idle or long idle animation.
     */
    checkIdleOrLongIdle() {
        if (this.timeForIdleCondition()) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idleTime += 300;
        } else {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.pepe_snoring.play();
        }
    }

    /**
     * Checks if the time since the last keyboard input is less than 15 seconds.
     * @returns {boolean} True if the time since the last input is less than 15 seconds, false otherwise.
     */
    timeForIdleCondition() {
        let lastPressKeyboardTime = this.world.lastTriggerKeyboard();
        let timepassed = (new Date().getTime() - lastPressKeyboardTime) / 1000;
        return timepassed < 15;
    }

    /**
     * Checks if any key is currently pressed.
     * @returns {boolean} True if any key is pressed, false otherwise.
     */
    isAnyKeyPressed() {
        return Object.values(this.world.keyboard).some(value => value);
    }

    /**
     * Moves the character to the right.
     */
    characterMoveRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isInAir) {
            this.runSound.play();
        }
    }

    /**
     * Moves the character to the left.
     */
    characterMoveLeft() {
        this.moveLeft(5);
        this.otherDirection = true;
        if (!this.isInAir) {
            this.runSound.play();
        }
    }

    /**
     * Plays the game over animation and handles the game over state.
     */
    gameOverAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.world.showEndscreen();
            this.applyGravity();
            this.gameoverSound.play();
            this.pepe_snoring.pause();
            pauseBackgroundMusic();
        }, 1000);
    }

    /**
     * Plays the hurt animation.
     */
    isHurtAnimation() {
        this.currentHurt = true;
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() => this.currentHurt = false, 1000);
    }

    /**
     * Mutes or unmutes the character's sounds.
     * @param {boolean} boolean - True to mute the sounds, false to unmute.
     */
    characterSound(boolean) {
        this.pepe_snoring.muted = boolean;
        this.jumpSound.muted = boolean;
        this.runSound.muted = boolean;
        this.gameoverSound.muted = boolean;
        this.throwBottleSound.muted = boolean;
    }

    /**
     * Checks if the character can be hurt based on the time since the last hit.
     * @param {number} now - The current time.
     * @returns {boolean} True if the character can be hurt, false otherwise.
     */
    characterHitTime(now) {
        return now - this.lastHit >= 2000;
    }

    /**
     * Sets the hurt state of the character.
     * @param {boolean} isHurt - True if the character is hurt, false otherwise.
     */
    setHurt(isHurt) {
        this.isHurtFlag = isHurt;
    }
}