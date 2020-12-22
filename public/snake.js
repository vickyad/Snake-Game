import { getInputDirection } from './input.js'
const GRID_SIZE = 21

export const SNAKE_SPEED = 1
const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0

export function updateSnake() {
    addSegments()

    const inputDirection = getInputDirection()

    /* Acho que tem um jeito melhor de fazer isso */
    for (let i = snakeBody.length - 2; i >= 0; i--) {
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


export function foodAte(position) {
    return snakeBody[0].x === position.x && snakeBody[0].y === position.y
}

export function onSnake(position, ignoreHead = false) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) {
            return false
        } else {
            return segment.x === position.x && segment.y === position.y
        }
    })
}

export function growSnake(quant) {
    newSegments += quant
}

export function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0
}

export function outsideGrid() {
    return snakeBody[0].x < 1 || snakeBody[0].x > GRID_SIZE || snakeBody[0].y < 1 || snakeBody[0].y > GRID_SIZE
}

export function snakeOverItself() {
    return onSnake(snakeBody[0], true)
}
