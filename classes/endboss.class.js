class Endboss extends MovableObject {

    width = 250;
    height = 400;
    y = 50;

    offset = {
        top: 150,
        bottom: 60,
        right: 100,
        left: 100,
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

    // endbossHit = false;
    endbossAttack = false;
    counterForPlayAnimation = 0;
    runsAlertArray = this.IMAGES_ALERT.length * 1;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.active = false;
        this.x = 2000;
        this.animate();
    }

    animate() {
        setInterval( () => {
            if(this.active) {
                if(this.counterForPlayAnimation < this.runsAlertArray) {
                    this.playAnimation(this.IMAGES_ALERT);
                    this.counterForPlayAnimation++;
                } else if(this.endbossAttack) {
                    this.playAnimation(this.IMAGES_ATTACK);
                    setTimeout(() => {
                        this.endbossAttack = false;
                    }, this.IMAGES_ATTACK.length * 200);
                }
                else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 200);

        setInterval( () => {
            if(this.counterForPlayAnimation == this.runsAlertArray) {
                this.moveLeft(0.5);
            }
        }, 1000 / 60);

        setInterval( () => {
            if(this.isDead(20)) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout( () => {
                    this.y = 800;
                }, 3000);
            } else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } 
        }, 200);
    }



            // setInterval( () => {
        //     // % Modulo Funktion teilt beide Werte und gibt den Rest immer an, in ganzen zahlen --> 1/6=0, Rest 1; 6/6=0, 7/6=1,Rest 1
        //     this.playAnimation(this.IMAGES_WALKING);
        // }, 200);
}