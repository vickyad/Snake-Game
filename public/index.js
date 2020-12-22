import { SNAKE_SPEED, updateSnake, renderSnake } from './snake.js'

const gameBoard = document.getElementById('game-board')

let lastRender = 0

function update() {
    updateSnake()
}

function render() {
    gameBoard.innerHTML = ''
    renderSnake(gameBoard)
}


function main(currentTime) {
    window.requestAnimationFrame(main)

    const secondsPassed = (currentTime - lastRender) / 1000     /* Dividir por 1000 dá o resultado em segundos*/
    
    if(secondsPassed < (1 / SNAKE_SPEED)) {
        return
    }

    lastRender = currentTime

    update()
    render()
}

window.requestAnimationFrame(main)