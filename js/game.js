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
        <div class="start-screen">
            <div class="button-start-steering">
                <button class="start-button" onclick="init()">Start Game</button>
                <button class="start-button" onclick="showSettings()">Settings</button>
                <button class="start-button" onclick="showImprint()">Impressum</button>
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

function showSettings() {
    let overlaySettings = document.getElementById('canvasBackground');

    overlaySettings.innerHTML = `
    <div id="settings" class="settings">
        <div onclick="closeSettings()">X</div>
        <div class="d-flex-center-column">
            <div class="d-flex-center"><img class="setting-icons" src="img/settings/left-arrow-button-icon.png"><span>Move left</span></div>
            <div class="d-flex-center"><img class="setting-icons" src="img/settings/left-arrow-button-icon.png"><span>Move left</span></div>
            <div class="d-flex-center"><img class="setting-icons" src="img/settings/left-arrow-button-icon.png"><span>Move left</span></div>
            <div class="d-flex-center"><img class="setting-icons" src="img/settings/left-arrow-button-icon.png"><span>Move left</span></div>
        </div>
    </div>`
}

function closeSettings() {
    let overlaySettings = document.getElementById('canvasBackground');
    overlaySettings.innerHTML = '';
}