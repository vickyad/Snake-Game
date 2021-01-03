import { renderSnake, outsideGrid, snakeOverItself, updateSnake } from './snake.js'
import { updateFood, renderFood, score } from './food.js'

const gameBoard = document.getElementById('game-board')
const scoreBoard = document.getElementById('score-board')
const restartDialog = document.getElementById('restart-dialog')
const cancelButton = document.getElementById('cancel')
const confirmButton = document.getElementById('confirm')

const SNAKE_SPEED = 4

let lastRender = 0
let gameOver = false

restartDialog.close()
window.requestAnimationFrame(main)

function main(currentTime) {
    if(gameOver) {
        restartDialog.showModal()
        confirmButton.addEventListener('click', () => {
            window.location = '/'
        })
        cancelButton.addEventListener('click', () => {
            restartDialog.close()
        })
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