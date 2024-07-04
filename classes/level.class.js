class Level {
    enemies;
    cloud;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    constructor(enemies, cloud, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.cloud = cloud;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}