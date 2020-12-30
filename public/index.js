import { SNAKE_SPEED, renderSnake, outsideGrid, snakeOverItself, updateSnake, snakeBody } from './snake.js'
import { updateFood, renderFood, score } from './food.js'

const gameBoard = document.getElementById('game-board')
const scoreBoard = document.getElementById('score-board')

let lastRender = 0
let gameOver = false

window.requestAnimationFrame(main)

function main(currentTime) {
    if(gameOver) {
        if(confirm('You lost. Press ok to restart.')) {
            window.location = '/'
        }
        return
    } else {
        window.requestAnimationFrame(main)
    
        const secondsPassed = (currentTime - lastRender) / 1000     /* Dividir por 1000 dá o resultado em segundos*/
        
        if(secondsPassed < (1 / SNAKE_SPEED)) {
            return
        }
    
        lastRender = currentTime
    
        update()
        render()
    }
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function render() {
    scoreBoard.innerHTML = `<p>${score}</p>`
    gameBoard.innerHTML = ''
    renderSnake(gameBoard)
    renderFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid() || snakeOverItself()
}