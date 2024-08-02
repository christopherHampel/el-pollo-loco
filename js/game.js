let canvas;
let world;
let lastPressKeyboard;
keyboard = new Keyboard();
let isMuted = false;
let backgroundMusic = new Audio('audio/mariachi.mp3');

function init() {
    lastPressKeyboard = new Date().getTime();

    deleteStartScreen();
    activateMobileSteering();
    playBackgroundMusic()
    initLevel();
    
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function playBackgroundMusic() {
    backgroundMusic.volume = 0.1;
    backgroundMusic.loop = true;
    backgroundMusic.play(); 
}

function pauseBackgroundMusic() {
    backgroundMusic.loop = false;
    backgroundMusic.pause(); 
}

function deleteStartScreen() {
    let canvas = document.getElementById('canvas');
    canvas.classList.remove('visibility-hidden');
}

function showStartscreen() {
    let canvasOverlay = document.getElementById('canvasOverlay');
    let mobileSteeringBackground = document.getElementById('mobileSteeringBackground');
    let canvas = document.getElementById('canvas');

    mobileSteeringBackground.classList.add('visibility-hidden');
    canvas.classList.add('visibility-hidden');
    canvasOverlay

    canvasOverlay.innerHTML = htmlStartScreen();
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

function sounds() {
    let muteIcon = document.getElementById('mute');

    if (isMuted) {
        muteGame(muteIcon);
    } else {
        unMuteGame(muteIcon);
    }
    isMuted = !isMuted;
}

function muteGame(muteIcon) {
    muteIcon.src = 'img/icons/volume-silent-line-icon.png';
    world.character.characterSound(false);
    enemiesSound(false);
    itemsSound(false);
}

function unMuteGame(muteIcon) {
    muteIcon.src = 'img/icons/volume-full-line-icon.png';
    world.character.characterSound(true);
    enemiesSound(true);
    itemsSound(true);
}

function enemiesSound(boolean) {
    world.level.enemies.slice(1).forEach(enemy => {
        enemy.movableObjectsSound(boolean);
    });
};

function itemsSound(boolean) {
    world.collect_coin_sound.muted = boolean;
    world.collect_bottle_sound.muted = boolean;
};