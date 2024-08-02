function activateMobileSteering() {
    let userAgent = navigator.userAgent.toLowerCase();
    let muteButton = document.getElementById('mute');
    let canvasOverlay = document.getElementById('canvasOverlay');
    canvasOverlay.innerHTML = '';

    if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
        let mobileSteeringBackground = document.getElementById('mobileSteeringBackground');
        mobileSteeringBackground.classList.remove('visibility-hidden');
    
        let moveLeft = document.getElementById('moveLeft');
        let moveRight = document.getElementById('moveRight');
        let jump = document.getElementById('jump');
        let throwBottle = document.getElementById('throw');

        moveLeft.addEventListener('touchstart', (e) => {
            getTimeLastPressedKeyboard(e);
            keyboard.LEFT = true;
        })

        moveRight.addEventListener('touchstart', (e) => {
            getTimeLastPressedKeyboard(e);
            keyboard.RIGHT = true;
        })

        jump.addEventListener('touchstart', (e) => {
            getTimeLastPressedKeyboard(e);
            keyboard.SPACE = true;
        })

        throwBottle.addEventListener('touchstart', (e) => {
            getTimeLastPressedKeyboard(e);
            keyboard.D = true;
        })

        moveLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        })

        moveRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        })

        jump.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        })

        throwBottle.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.D = false;
        })
    } else {
        canvasOverlay.innerHTML = htmlMuteButton();
    }
}

function getTimeLastPressedKeyboard(e) {
    e.preventDefault();
    lastPressKeyboard = new Date().getTime();
}