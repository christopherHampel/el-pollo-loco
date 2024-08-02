function htmlSteering() {
    return `
    <div onclick="notClosePopup(event)" id="settings" class="settings additionally-imprint z-index-20">
        <div class="container-for-close-button">
            <span class="font-size-32">Steering</span>
            <img onclick="closeHelp()" class="close-icon" src="img/settings/close-round-line-icon.png">
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
        <div class="start-screen" id="startScreen">
            <div class="button-start-steering">
                <button class="start-button" onclick="init()">Start Game</button>
                <button class="start-button" onclick="showHelp(htmlGameExplanation)">Game Explanation</button>
                <button class="start-button" onclick="showHelp(htmlSteering)">Game controls</button>
                <button class="start-button" onclick="showHelp(returnImprintAndPrivacyPolice)">Imprint &<br>Legal Notice</button>
            </div>
        </div>`
}

// function htmlCanvasMobile() {
//     return `
//     <div id="canvasMobile" class="canvas-mobile">
//         <canvas id="canvas" width="720" height="480" id="canvas"></canvas>
//         <div id="mobile" class="mobile">
//             <div class="mobile-steering">
//                 <div id="moveLeft" class="mobile-button">left</div>
//                 <div id="moveRight" class="mobile-button">right</div>
//             </div>
//             <div class="mobile-steering">
//                 <div id="jump" class="mobile-button">jump</div>
//                 <div id="throw" class="mobile-button">throw</div>
//             </div>
//         </div>
//     </div>`
// }

// function htmlTurnYourDevice() {
//     return `
//     <div class="turn-device">
//         <img class="image-turn-device" src="img/settings/mobile-landscape-mode-icon.png">
//     </div>`
// }

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

function htmlGameExplanation() {
    return `
    <div onclick="notClosePopup(event)" class="settings additionally-imprint flex-start">
        <div class="container-for-close-button flex-start">
            <span class="font-size-32">Game explanation</span>
            <img onclick="closeHelp()" class="icons" src="img/settings/close-round-line-icon.png">
        </div>
        <div>
            <h1>Pepe's Abenteuer in Mexiko</h1>
                <br>
                <p>Begleite Pepe auf seinem aufregenden Abenteuer durch das farbenfrohe Land von Mexiko! Pepe, der mutige Hauptcharakter, reist durch malerische Landschaften und trifft dabei auf eine Vielzahl verrückter Hühnchen, die ihm den Weg versperren.</p>
                <br><br>
            <h2>Verrückte Hühnchen</h2>
                <br>
                <p>Diese Hühnchen sind keine gewöhnlichen Gegner. Um sie zu besiegen, muss Pepe seinen Mut zusammennehmen und auf sie draufspringen. Nur so können die verrückten Hühnchen besiegt werden und Pepe kann seinen Weg fortsetzen.</p>
                <br><br>
            <h2>Der Endboss</h2>
                <br>
                <p>Am Ende seiner Reise wartet eine besonders große Herausforderung auf Pepe: ein riesiges, verrücktes Hühnchen, der Endboss. Dieses gigantische Hühnchen ist nicht so leicht zu besiegen. Pepe benötigt dafür spezielle Salsa-Flaschen, die er auf den Endboss werfen muss, um ihn zu bezwingen.</p>
                <br><br>
            <h2>Flaschen sammeln</h2>
                <br>
                <p>Doch die Salsa-Flaschen liegen nicht einfach so herum. Pepe muss unterwegs fleißig Coins einsammeln, denn nur mit diesen Coins kann er die begehrten Salsa-Flaschen erhalten. Jede Coin, die Pepe auf seinem Weg findet, bringt ihn eine Salsa-Flasche näher an seinen großen Showdown mit dem Endboss.</p>
                <br><br>
            <h2>Coin zu Flasche</h2>
                <br>
                <p>Das Sammeln von Coins ist der Schlüssel zum Erfolg. Für jede Coin, die Pepe einsammelt, erhält er eine Salsa-Flasche. Diese Flaschen sind entscheidend, um den Endboss zu besiegen und das Abenteuer erfolgreich abzuschließen.</p>
                <br><br>
            <h2>Zusammenfassung</h2>
                <br>
                <p><strong>Hauptcharakter:</strong> Pepe</p>
                <br>
                <p><strong>Setting:</strong> Mexiko</p>
                <br>
                <p><strong>Gegner:</strong> Verrückte Hühnchen, die nur durch Draufspringen besiegt werden können.</p>
                <br>
                <p><strong>Endboss:</strong> Ein großes, verrücktes Hühnchen, das nur durch das Werfen von Salsa-Flaschen besiegt werden kann.</p>
                <br>
                <p><strong>Sammelobjekte:</strong> Coins und Salsa-Flaschen.</p>
                <br>
                <p><strong>Spielmechanik:</strong> Einsammeln von Coins, um Salsa-Flaschen zu erhalten. Jede Coin ermöglicht eine Salsa-Flasche.</p>

                <br><br>

                <p>Begib dich mit Pepe auf diese spannende Reise durch Mexiko, besiege die verrückten Hühnchen und stelle dich dem großen Endboss! Viel Spaß beim Spielen!</p>
        </div>
    </div>`
}

function htmlMuteButton() {
    return `
    <div class="mute-button-web"><img id="mute" onclick="sounds()" class="icons" src="img/icons/volume-silent-line-icon.png"></div>`
}