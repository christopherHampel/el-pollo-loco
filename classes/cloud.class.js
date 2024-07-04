class Cloud extends MovableObject {
    y = 20;
    width = 700;
    height = 300;

    constructor(startXPosition) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = startXPosition;
        this.animate(); 
    }

    animate() {
        setInterval( () => {
            this.moveLeft(0.2);
        }, 1000 / 60);
    }
}