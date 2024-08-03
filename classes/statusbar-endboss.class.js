/**
 * Class representing a status bar for the end boss in the game.
 * Displays the boss's health percentage as a status bar.
 * Extends DrawableObject to utilize image rendering.
 */
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

    /**
     * Creates an instance of StatusbarEndboss and initializes its properties.
     */
    constructor(){
       super().loadImages(this.IMAGES_STATUSBAR);
       this.x = 550;
       this.y = 70;
       this.width = 150;
       this.height = 75;
       this.setPercentage(100);
    }

    /**
     * Updates the status bar to reflect the percentage of the end boss's health.
     * @param {number} percantage - The current health percentage of the end boss.
     */
    setPercentage(percantage){
        this.percantage = percantage;
        let path = this.IMAGES_STATUSBAR[this.resolveImagesIndex(this.percantage)];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current health percentage of the end boss.
     * @param {number} percantage - The current health percentage of the end boss.
     * @returns {number} The index of the image to be used.
     */
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