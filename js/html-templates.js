function htmlSteering() {
    return `
    <div id="settings" class="settings additionally-imprint z-index-20">
        <div class="container-for-close-button" onclick="closeHelp()">
            <span class="font-size-32">Steering</span>
            <img class="close-icon" src="img/settings/close-round-line-icon.png">
        </div>
        <div class="flex-column">
            <div class="flex-align-center"><img class="setting-icons" src="img/settings/left-arrow-button-icon.png"><span>Move left</span></div>
            <div class="flex-align-center"><img class="setting-icons" src="img/settings/right-arrow-button-icon.png"><span>Move right</span></div>
            <div class="flex-align-center"><img class="setting-icons" src="img/settings/space-button-icon.png"><span>Jump</span></div>
            <div class="flex-align-center"><img class="setting-icons" src="img/settings/d-button-icon.png"><span>Throw Bottle</span></div>
        </div>
    </div>`
}

function htmlStartScreen() {
    return `
        <div class="start-screen">
            <div class="button-start-steering">
                <button class="start-button" onclick="init()">Start Game</button>
                <button class="start-button" onclick="showHelp(htmlSteering)">Game controls</button>
                <button class="start-button" onclick="showHelp(returnImprintAndPrivacyPolice)">Legal Notice</button>
            </div>
            <div class="game-settings">
                <img onclick="openFullscreen()" class="icons" src="img/icons/fullscreen.png">
                <img onclick="" class="icons" src="img/icons/volume-silent-line-icon.png">
            </div>
        </div>`
}

function htmlCanvasMobile() {
    return `
    <div id="canvasMobile" class="canvas-mobile">
        <canvas id="canvas" width="720" height="480" id="canvas"></canvas>
        <div id="mobile" class="mobile">
            <div class="mobile-steering">
                <div id="moveLeft" class="mobile-button">left</div>
                <div id="moveRight" class="mobile-button">right</div>
            </div>
            <div class="mobile-steering">
                <div id="jump" class="mobile-button">jump</div>
                <div id="throw" class="mobile-button">throw</div>
            </div>
        </div>
    </div>`
}

function htmlTurnYourDevice() {
    return `
    <div class="turn-device">
        <img class="image-turn-device" src="img/settings/mobile-landscape-mode-icon.png">
    </div>`
}

function htmlWinScreen() {
    return `
    <div class="win-screen">
        <div class="button-container-endscreen">
            <button onclick="showStartscreen()" class="start-button">Menu</button>
        </div>
    </div>`
}

function htmlGameOver() {
    return `
    <div class="gameover-screen">
        <div class="button-container-endscreen">
            <button onclick="showStartscreen()" class="start-button">Menu</button>
        </div>
    </div>`
}