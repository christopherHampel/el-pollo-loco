/**
 * Class representing a game level.
 * Manages the different objects present in the level such as enemies, clouds, background objects, coins, and bottles.
 */
class Level {
    enemies;
    cloud;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2500;

    /**
     * Creates an instance of the Level class.
     * @param {Array<MovableObject>} enemies - Array of enemies to be included in the level.
     * @param {Array<Cloud>} cloud - Array of clouds to be included in the level.
     * @param {Array<DrawableObject>} backgroundObjects - Array of background objects to be included in the level.
     * @param {Array<Coins>} coins - Array of coins to be included in the level.
     * @param {Array<DrawableObject>} bottles - Array of bottles to be included in the level.
     */
    constructor(enemies, cloud, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.cloud = cloud;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}