let canvas;
let world;
let lastPressKeyboard = 0;
keyboard = new Keyboard();

function init() {
    hideStartScreen();
    initLevel();

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function hideStartScreen() {
    let startScreenBackground = document.getElementById('screenBackground');
    startScreenBackground.innerHTML = '';
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
    // console.log(e);
    // console.log(keyboard.LEFT);
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
    <h1 class="vs-hidden">placeholder</h1>
        <div class="start-screen">
            <div class="button-start-steering">
                <button class="start-button" onclick="init()">Start Game</button>
                <button class="start-button">How it works?</button>
            </div>
        </div>`
}

function restartGame() {
    world.gameOver = false;
    init();
}