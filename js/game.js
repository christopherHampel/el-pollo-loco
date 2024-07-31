window.addEventListener('resize', showStartscreen);

let canvas;
let world;
let lastPressKeyboard;
keyboard = new Keyboard();
let isMuted = false;

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
    canvasOverlay.innerHTML = htmlMuteButton();
    canvas.classList.remove('visibility-hidden')
}

function showStartscreen() {
    let canvasOverlay = document.getElementById('canvasOverlay');
    let mobileSteeringBackground = document.getElementById('mobileSteeringBackground');
    let canvas = document.getElementById('canvas');

    mobileSteeringBackground.classList.add('visibility-hidden');
    canvas.classList.add('visibility-hidden');

    checkLandscapeModus(canvasOverlay, canvas);
}

function checkLandscapeModus(canvasOverlay, canvas) {
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

function notClosePopup(event) {
    event.stopPropagation();
}


function muteGame() {
    let muteIcon = document.getElementById('mute');

    if (isMuted) {
        muteIcon.src = 'img/icons/volume-silent-line-icon.png';
        world.character.characterSound(false);
        enemiesSound(false);
    } else {
        muteIcon.src = 'img/icons/volume-full-line-icon.png';
        world.character.characterSound(true);
        enemiesSound(true);
    }
    isMuted = !isMuted;
}

function enemiesSound(boolean) {
    world.level.enemies.slice(1).forEach(enemy => {
        enemy.movableObjectsSound(boolean);
    });
}