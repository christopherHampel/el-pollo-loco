class Chicken extends MovableObject {
    
    y = 360;
    width = 50;
    height = 75;

    offset = {
        top: 1,
        bottom: 1,
        right: 1,
        left: 1
    };

    // collisionFromTop = false;
    // collisionFromSide = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png']

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 500;

        this.speed = 0.15 + Math.random() * 0.5;
            
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.moveLeft(0.2);
        }, 1000 / 60);
        
        setInterval( () => {
            // % Modulo Funktion teilt beide Werte und gibt den Rest immer an, in ganzen zahlen --> 1/6=0, Rest 1; 6/6=0, 7/6=1,Rest 1
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    chickenIsDead() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
}