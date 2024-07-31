class SmallChicken extends MovableObject {
    y = 360;
    width = 50;
    height = 75;

    offset = {
        top: 1,
        bottom: 1,
        right: 1,
        left: 1
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    chicken_scream_audio = new Audio('audio/chicken-noise.mp3');

    constructor(startXPosition) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        // this.x = 200 + Math.random() * 500;
        this.x = startXPosition;

        this.speed = 0.15 + Math.random() * 0.5;
            
        this.animate();
    }

    animate() {
        this.intervalMoveLeft = setInterval( () => {
            this.moveLeft(1.5);
        }, 1000 / 60);
        
        this.intervalMovePlayAnimation = setInterval( () => {
            // % Modulo Funktion teilt beide Werte und gibt den Rest immer an, in ganzen zahlen --> 1/6=0, Rest 1; 6/6=0, 7/6=1,Rest 1
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}
