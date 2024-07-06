class TrowableObject extends MovableObject {

    constructor(x, y, otherDirection){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 100;
        this.width = 40;
        this.collidingWithEndboss = false;

        this.throw();
    }

    throw() {
        this.speedY = 25;
        this.applyGravity();
        setInterval( () => {
            if(this.otherDirection) {
                this.x -= 5;
            } else {
                this.x += 5;
            }
        }, 25);
    }
}