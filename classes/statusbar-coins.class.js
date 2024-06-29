class StatusbarCoins extends DrawableObject {

    IMAGES_STATUSBAR_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    collectedCoins = 0;

    constructor() {
        super().loadImages(this.IMAGES_STATUSBAR_COINS);
        this.x = 50;
        this.y = 70;
        this.width = 150;
        this.height = 75;
        this.setPercentage(0);
    }

    setPercentage(collectedCoins){
        this.collectedCoins = collectedCoins;
        let path = this.IMAGES_STATUSBAR_COINS[this.resolveImagesIndex(this.collectedCoins)];
        this.img = this.imageCache[path];
    }

    resolveImagesIndex(collectedCoins) {
        if(collectedCoins >= 5) {
            return 5;
        } else if(collectedCoins == 4) {
            return 4;
        } else if(collectedCoins == 3) {
            return 3;
        } else if(collectedCoins == 2) {
            return 2;
        } else if(collectedCoins == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}