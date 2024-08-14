/**
 * Class representing a bottle in the game.
 * @extends MovableObject
 */
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
    ];

    tooltip = null;
    showTooltip = false;

        /**
     * Creates an instance of Bottles.
     */
    constructor() {        
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);

        this.y = 360 - Math.random() * 200;
        this.x = 250 + Math.random() * 1800;

        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /**
     * Removes the tooltip.
     */
    removeTooltip() {
        this.showTooltip = false;
    }

    setTooltip(text) {
        this.tooltip = text;
        this.showTooltip = true;
    }

    /**
     * Animates the bottle by cycling through the images.
     */
    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_BOTTLES)
        }, 500);
    }
}