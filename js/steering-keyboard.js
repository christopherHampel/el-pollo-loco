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
        // console.log('Space')
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