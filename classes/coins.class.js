/**
 * Class representing a coin in the game.
 * @extends MovableObject
 */
class Coins extends MovableObject {

    x = 0;
    // y = 300;
    width = 80;
    height = 80;
    offset = {
        top: 55,
        bottom: 55,
        right: 25,
        left: 25,
    };

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Creates an instance of Coins.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);

        this.y = 250 + Math.random() * 100;
        this.x = Math.random() * 2500;

        this.animate();
    }

    /**
     * Animates the coin by playing the coin animation.
     */
    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_COINS)
        }, 500);
    }
}