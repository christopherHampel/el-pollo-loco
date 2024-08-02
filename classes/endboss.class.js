class Endboss extends MovableObject {

    width = 250;
    height = 400;
    y = 50;

    accelearation = 2;

    offset = {
        top: 200,
        bottom: 60,
        right: 110,
        left: 110,
    };

    collisionFromTop = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    endbossAttack = false;
    counterForPlayAnimation = 0;
    runsAlertArray = this.IMAGES_ALERT.length * 1;
    kikeriki = new Audio('audio/kikeriki.mp3');
    game_win_sound = new Audio('audio/game-win.mp3');
    world;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.active = false;
        this.x = 2500;
    }

    animate() {
        this.endbossAnimations();
        this.moveLeftEndboss();
        this.damageAnimations();
    }

    endbossAnimations() {
        setInterval( () => {
            if(this.counterForPlayAnimation < this.runsAlertArray) {
                this.playAnimation(this.IMAGES_ALERT);
                this.counterForPlayAnimation++;
                this.kikeriki.play();
            } else if(this.endbossAttack) {
                this.attackAnimation();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    moveLeftEndboss() {
        setInterval( () => {
            if(this.counterForPlayAnimation == this.runsAlertArray) {
                this.moveLeft(0.5);
            }
        }, 1000 / 60);
    }

    deadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout( () => {
            this.applyGravity();
        }, 1000);
        setTimeout( () => {
            this.world.showEndscreen();
            this.game_win_sound.play();
            pauseBackgroundMusic();
        }, 2000);
    }

    damageAnimations() {
        setInterval( () => {
            if(this.isDead(20)) {
                this.deadAnimation()
            } else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } 
        }, 200);
    }

    attackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        setTimeout(() => {
            this.endbossAttack = false;
        }, this.IMAGES_ATTACK.length * 200);
    }
}