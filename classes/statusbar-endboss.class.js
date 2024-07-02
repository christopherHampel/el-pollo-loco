class StatusbarEndboss extends DrawableObject {

    IMAGES_STATUSBAR = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
    ];

    percantage = 100;

    constructor(){
       super().loadImages(this.IMAGES_STATUSBAR);
       this.x = 550;
       this.y = 70;
       this.width = 150;
       this.height = 75;
       this.setPercentage(100);
    }

    setPercentage(percantage){
        this.percantage = percantage;
        let path = this.IMAGES_STATUSBAR[this.resolveImagesIndex(this.percantage)];
        this.img = this.imageCache[path];
    }

    resolveImagesIndex(percantage) {
        if(percantage == 100) {
            return 0;
        } else if(percantage > 80) {
            return 1;
        } else if(percantage > 60) {
            return 2;
        } else if(percantage > 40) {
            return 3;
        } else if(percantage > 20) {
            return 4;
        } else {
            return 5;
        }
    }
}