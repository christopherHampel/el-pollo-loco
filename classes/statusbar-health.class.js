class StatusbarHealth extends DrawableObject {

    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    ];

    percantage = 100;

    constructor(){
       super().loadImages(this.IMAGES_STATUSBAR);
       this.x = 50;
       this.y = 10;
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
        } else if(percantage > 81) {
            return 1;
        } else if(percantage > 61) {
            return 2;
        } else if(percantage > 41) {
            return 3;
        } else if(percantage > 21) {
            return 4;
        } else {
            return 5;
        }
    }
}