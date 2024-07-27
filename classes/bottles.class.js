class Bottles extends MovableObject {
    
    height = 80;
    width = 50;

    offset = {
        top: 1,
        bottom: 1,
        right: 1,
        left: 1
    };

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);

        this.y = 360 - Math.random() * 200;
        this.x = 200 + Math.random() * 1800;

        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_BOTTLES)
        }, 500);
    }
}