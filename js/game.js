let canvas;
let world;
keyboard = new Keyboard();

function init() {
    hideStartScreen();

    canvas = document.getElementById('canvas');
    // level1 = new Level(
    // [
    //     new Chicken(),
    //     new Chicken(),
    //     new Chicken(),
    //     // new SmallChicken(),
    //     new Endboss(),
    // ],
    // [
    //     new Cloud(),
    //     new Cloud(),
    // ],
    // [
    //     new BackgroundObject('img/5_background/layers/air.png', -719*2),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719*2),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719*2),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719*2),

    //     new BackgroundObject('img/5_background/layers/air.png', -719),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

    //     new BackgroundObject('img/5_background/layers/air.png', 0),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

    //     new BackgroundObject('img/5_background/layers/air.png', 719),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

    //     new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

    //     new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
    // ],
    // [
    //     new Coins(),
    //     new Coins(),
    //     new Coins(),
    //     new Coins(),
    //     new Coins(),
    //     new Coins(),
    //     new Coins(),
    // ]);

    world = new World(canvas, keyboard);
}

function hideStartScreen() {
    let startScreenBackground = document.getElementById('startScreenBackground');
    startScreenBackground.innerHTML = ''
}

document.addEventListener("keydown", (e) => {
    // console.log(e);
    // console.log(keyboard.LEFT);

    if(e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    } else if(e.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    } else if(e.key === 'ArrowUp') {
        keyboard.UP = true;
    } else if(e.key === 'ArrowDown') {
        keyboard.DOWN = true;
    } else if(e.keyCode == 32) {
        keyboard.SPACE = true;
    } else if(e.key === 'd') {
        keyboard.D = true;
    }
});

document.addEventListener("keyup", (e) => {

    if(e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    } else if(e.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    } else if(e.key === 'ArrowUp') {
        keyboard.UP = false;
    } else if(e.key === 'ArrowDown') {
        keyboard.DOWN = false;
    } else if(e.keyCode == 32) {
        keyboard.SPACE = false;
    } else if(e.key === 'd') {
        keyboard.D = false;
    }
});

// function restartGame() {
//     document.getElementById('endScreen').style.visibility = 'hidden';
//     world.clearRectCanvas();
//     world = new World(canvas, keyboard);
// }