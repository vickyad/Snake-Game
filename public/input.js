/* --> Constants <-- */
let inputDirection = {x: 0, y: 0, d:'N'}
let lastInputDirection = {x: 0, y: 0, d:'N'}

let xDown = null;                                                        
let yDown = null;


/* --> Event Listeners <-- */
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);


/* --> Functions <-- */
export function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}

function getTouches(evt) {
  return evt.touches
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
}                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            if(lastInputDirection.x === 0){
                inputDirection = {x: -1, y: 0, d:'L'}
            }
            /* left swipe */ 
        } else {
            if(lastInputDirection.x === 0){
                inputDirection = {x: 1, y: 0, d:'R'}
            }
            /* right swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            if(lastInputDirection.y === 0){
                inputDirection = {x: 0, y: -1, d:'U'}
            }
            /* up swipe */ 
        } else {
            if(lastInputDirection.y === 0){
                inputDirection = {x:0, y: 1, d:'D'}
            } 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}


window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp':
            if(lastInputDirection.y === 0){
                inputDirection = {x: 0, y: -1, d:'U'}
            }
            break
        case 'ArrowDown':
            if(lastInputDirection.y === 0){
                inputDirection = {x:0, y: 1, d:'D'}
            }
            break
        case 'ArrowLeft':
            if(lastInputDirection.x === 0){
                inputDirection = {x: -1, y: 0, d:'L'}
            }
            break
        case 'ArrowRight':
            if(lastInputDirection.x === 0){
                inputDirection = {x: 1, y: 0, d:'R'}
            }
            break
    }
})