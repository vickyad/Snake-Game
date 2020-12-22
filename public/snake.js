import { getInputDirection } from './input.js'

export const SNAKE_SPEED = 1

const snakeBody = [{x: 11, y: 11}]


export function updateSnake() {
    const inputDirection = getInputDirection()
    
    /* Acho que tem um jeito melhor de fazer isso */
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function renderSnake(gameBoard) {
    snakeBody.forEach(segment => {
        const snakePiece = document.createElement('div')

        snakePiece.style.gridRowStart = segment.y
        snakePiece.style.gridColumnStart = segment.x
        snakePiece.classList.add('snake')

        gameBoard.appendChild(snakePiece)
    })
}