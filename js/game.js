let canvas;
let world;
let lastPressKeyboard = 0;
keyboard = new Keyboard();

function init() {
    createCanvas();
    initLevel();

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function createCanvas() {
    let startScreenBackground = document.getElementById('screenBackground');
    startScreenBackground.innerHTML = '';
    startScreenBackground.innerHTML = `
        <h1>El Pollo loco</h1>
        <canvas id="canvas" width="720" height="480" id="canvas"></canvas>`
}

document.addEventListener("keydown", (e) => {

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

    lastPressKeyboard = new Date().getTime();
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

function showStartscreen() {
    let startScreenBackground = document.getElementById('screenBackground');
    startScreenBackground.innerHTML = '';
    startScreenBackground.innerHTML = `
    <h1>El Pollo Loco</h1>
        <div class="start-screen">
            <div class="button-start-steering">
                <button class="start-button" onclick="init()">Start Game</button>
                <button class="start-button">Settings</button>
            </div>
        </div>`
}

function restartGame() {
    let endScreenBackground = document.getElementById('winAndGameoverScreen');
    endScreenBackground.classList.add('vs-hidden');
    world.gameOver = false;
    init();
}

function openFullscreen() {
    let elem = document.getElementById('canvasBackground');

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }