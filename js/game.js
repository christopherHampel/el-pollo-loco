let canvas;
let world;
let lastPressKeyboard;
keyboard = new Keyboard();
let isMuted = false;
let backgroundMusic = new Audio('audio/mariachi.mp3');

/**
 * Initializes the application, deletes the start screen, activates mobile steering,
 * plays the background music, and initializes the level.
 */
function init() {
    lastPressKeyboard = new Date().getTime();

    deleteStartScreen();
    activateMobileSteering();
    playBackgroundMusic()
    initLevel();
    
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Plays the background music, sets the volume to 10%, and enables looping.
 */
function playBackgroundMusic() {
    backgroundMusic.volume = 0.1;
    backgroundMusic.loop = true;
    backgroundMusic.play(); 
}

/**
 * Pauses the background music and disables looping.
 */
function pauseBackgroundMusic() {
    backgroundMusic.loop = false;
    backgroundMusic.pause(); 
}

/**
 * Deletes the start screen by changing the visibility of the canvas element.
 */
function deleteStartScreen() {
    let canvas = document.getElementById('canvas');
    canvas.classList.remove('visibility-hidden');
}

/**
 * Displays the start screen by changing the visibility of overlays and the canvas element.
 * Fills the overlay with HTML content for the start screen.
 */
function showStartscreen() {
    let canvasOverlay = document.getElementById('canvasOverlay');
    let mobileSteeringBackground = document.getElementById('mobileSteeringBackground');
    let canvas = document.getElementById('canvas');

    mobileSteeringBackground.classList.add('visibility-hidden');
    canvas.classList.add('visibility-hidden');
    canvasOverlay

    canvasOverlay.innerHTML = htmlStartScreen();
}

/**
 * Displays the help overlay and fills it with HTML content.
 * @param {function} htmlPart - Function that returns the HTML content.
 */
function showHelp(htmlPart) {
    let overlaySettings = document.getElementById('backgroundForGeneral');
    overlaySettings.classList.remove('visibility-hidden');
    overlaySettings.innerHTML = htmlPart();
}

/**
 * Closes the help overlay and removes the HTML content.
 */
function closeHelp() {
    let overlaySettings = document.getElementById('backgroundForGeneral');
    overlaySettings.innerHTML = '';
    overlaySettings.classList.add('visibility-hidden');
}

/**
 * Prevents closing a popup on a specific event.
 * @param {Event} event - The event that triggers the function.
 */
function notClosePopup(event) {
    event.stopPropagation();
}

/**
 * Toggles the sound settings of the game, muting or unmuting game sounds.
 */
function sounds() {
    let muteIcon = document.getElementById('mute');

    if (isMuted) {
        muteGame(muteIcon);
    } else {
        unMuteGame(muteIcon);
    }
    isMuted = !isMuted;
}

/**
 * Mutes the game sounds and updates the mute icon.
 * @param {HTMLImageElement} muteIcon - The mute icon element.
 */
function muteGame(muteIcon) {
    muteIcon.src = 'img/icons/volume-silent-line-icon.png';
    backgroundMusic.muted = false;
    world.character.characterSound(false);
    world.level.enemies[0].kikeriki.muted = false;
    enemiesSound(false);
    itemsSound(false);
}

/**
 * Unmutes the game sounds and updates the mute icon.
 * @param {HTMLImageElement} muteIcon - The mute icon element.
 */
function unMuteGame(muteIcon) {
    muteIcon.src = 'img/icons/volume-full-line-icon.png';
    backgroundMusic.muted = true;
    world.character.characterSound(true);
    world.level.enemies[0].kikeriki.muted = true;
    enemiesSound(true);
    itemsSound(true);
}

/**
 * Toggles the sound of enemies.
 * @param {boolean} boolean - Indicates whether to mute or unmute the enemies' sounds.
 */
function enemiesSound(boolean) {
    world.level.enemies.forEach(enemy => {
        enemy.movableObjectsSound(boolean);
    });
};

/**
 * Toggles the sound of collectible items.
 * @param {boolean} boolean - Indicates whether to mute or unmute the collectible items' sounds.
 */
function itemsSound(boolean) {
    world.collect_coin_sound.muted = boolean;
    world.collect_bottle_sound.muted = boolean;
};