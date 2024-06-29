class StatusbarBottles extends DrawableObject {
    IMAGES_STATUSBAR_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    collectedBottles = 0;

    constructor() {
        super().loadImages(this.IMAGES_STATUSBAR_BOTTLES);
        this.x = 50;
        this.y = 130;
        this.width = 150;
        this.height = 75;
        this.setPercentage(0);
    }

    setPercentage(collectedBottles){
        this.collectedBottles = collectedBottles;
        let path = this.IMAGES_STATUSBAR_BOTTLES[this.resolveImagesIndex(this.collectedBottles)];
        this.img = this.imageCache[path];
    }

    resolveImagesIndex(collectedBottles) {
        if(collectedBottles >= 5) {
            return 5;
        } else if(collectedBottles == 4) {
            return 4;
        } else if(collectedBottles == 3) {
            return 3;
        } else if(collectedBottles == 2) {
            return 2;
        } else if(collectedBottles == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}