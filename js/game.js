window.addEventListener('resize', showStartscreen);

let canvas;
let world;
let lastPressKeyboard;
keyboard = new Keyboard();
let welcomeSound = new Audio('audio/mariachi.mp3');

function init() {
    lastPressKeyboard = new Date().getTime();

    deleteStartScreen();
    activateMobileSteering();
    initLevel();

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function deleteStartScreen() {
    let canvasOverlay = document.getElementById('canvasOverlay');
    let canvas = document.getElementById('canvas');

    canvasOverlay.innerHTML = '';
    canvas.classList.remove('visibility-hidden')
}

function showStartscreen() {
    let canvasOverlay = document.getElementById('canvasOverlay');
    let mobileSteeringBackground = document.getElementById('mobileSteeringBackground');
    let canvas = document.getElementById('canvas');

    mobileSteeringBackground.classList.add('visibility-hidden');
    canvas.classList.add('visibility-hidden');

    if (window.innerHeight > window.innerWidth) {
        canvasOverlay.innerHTML = htmlTurnYourDevice();
    } else {
        if (window.innerWidth > 600) {
            canvasOverlay.innerHTML = htmlStartScreen();
        } else {
            canvas.innerHTML = '';
            canvasOverlay.innerHTML = '';
            canvasOverlay.innerHTML = htmlTurnYourDevice();
        }
    }
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

function showHelp(htmlPart) {
    let overlaySettings = document.getElementById('backgroundForGeneral');
    overlaySettings.classList.remove('visibility-hidden');
    overlaySettings.innerHTML = htmlPart();
}

function closeHelp() {
    let overlaySettings = document.getElementById('backgroundForGeneral');
    overlaySettings.innerHTML = '';
    overlaySettings.classList.add('visibility-hidden');
}