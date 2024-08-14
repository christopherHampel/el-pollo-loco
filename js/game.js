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
 * Handles the transition back to the main menu from the game over screen.
 * This function pauses any ongoing game sounds and displays the start screen.
 * 
 * It pauses the game over sound associated with the character and the victory sound
 * associated with the endboss. Then it calls the function to show the start screen,
 * allowing the player to begin a new game or navigate to the main menu.
 */
function backToMenu() {
    isMuted = false;
    world.character.gameoverSound.pause();
    world.endboss.game_win_sound.pause();
    unMuteGame();
    showStartscreen();
}

function restartGame() {
    backToMenu();
    init();
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
        muteIcon.src = 'img/icons/volume-silent-line-icon.png';
        muteGame();
    } else {
        muteIcon.src = 'img/icons/volume-full-line-icon.png';
        unMuteGame();
    }
    isMuted = !isMuted;
}

/**
 * Mutes the game sounds and updates the mute icon.
 * @param {HTMLImageElement} muteIcon - The mute icon element.
 */
function muteGame() {
    backgroundMusic.muted = false;
    world.character.characterSound(false);
    world.level.enemies[0].kikeriki.muted = false;
    world.endboss.game_win_sound.muted = false;
    enemiesSound(false);
    itemsSound(false);
}

/**
 * Unmutes the game sounds and updates the mute icon.
 * @param {HTMLImageElement} muteIcon - The mute icon element.
 */
function unMuteGame() {
    backgroundMusic.muted = true;
    world.character.characterSound(true);
    world.level.enemies[0].kikeriki.muted = true;
    world.endboss.game_win_sound.muted = true;
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

/**
 * Displays the end screen when the game is over.
 */
function showEndscreen() {
    let canvasOverlay = document.getElementById('canvasOverlay');
    let mobileSteeringBackground = document.getElementById('mobileSteeringBackground');

    world.gameOver = true;
    clearAllIntervals();

    canvasOverlay.classList.remove('vs-hidden');
    mobileSteeringBackground.classList.add('visibility-hidden');

    showWinOrLostScreen(canvasOverlay);
}
    
/**
 * Displays the win or game over screen based on the character's status.
* @param {HTMLElement} canvasOverlay - The canvas overlay element to display the screen.
*/
function showWinOrLostScreen(canvasOverlay) {
    if(isCharacterDead()) {
       canvasOverlay.innerHTML = htmlWinScreen();
    } else {
       canvasOverlay.innerHTML = htmlGameOver();
    }
}

/**
* Handles the last triggered keyboard input.
* @returns {number} The last pressed keyboard key code.
*/
function lastTriggerKeyboard(){
    return lastPressKeyboard;
}
/**
 * Clears all intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
    
/**
 * Determines if the character is still alive.
 * @returns {boolean} True if the character is alive, otherwise false.
 */
function isCharacterDead() {
    return world.character.energy > 0;
}