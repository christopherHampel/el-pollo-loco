class Bottles extends MovableObject {
    
    height = 80;
    width = 50;

    offset = {
        top: 1,
        bottom: 1,
        right: 1,
        left: 1
    };

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        this.y = 360 - Math.random() * 200;
        this.x = 200 + Math.random() * 2500;

        this.speed = 0.15 + Math.random() * 0.5;
    }
}