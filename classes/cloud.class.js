
/**
 * Class representing a cloud in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    width = 700;
    height = 300;

    /**
     * Creates an instance of Cloud.
     * @param {number} startXPosition - The starting x-coordinate of the cloud.
     */
    constructor(startXPosition) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = startXPosition;
        this.animate(); 
    }

    /**
     * Animates the cloud by moving it left continuously.
     */
    animate() {
        setInterval( () => {
            this.moveLeft(0.2);
        }, 1000 / 60);
    }
}