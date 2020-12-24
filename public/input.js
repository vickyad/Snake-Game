let inputDirection = {x: 0, y: 0, d:'N'}
let lastInputDirection = {x: 0, y: 0, d:'N'}

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

export function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}