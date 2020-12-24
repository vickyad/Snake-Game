import { getInputDirection } from './input.js'
const GRID_SIZE = 21

export const SNAKE_SPEED = 4
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
    snakeBody.forEach((segment, index) => {
        const snakePiece = document.createElement('IMG')
        const image = getCorrectImage(index)

        snakePiece.setAttribute("src", image)
        snakePiece.setAttribute("width", "38.36")

        snakePiece.style.gridRowStart = segment.y
        snakePiece.style.gridColumnStart = segment.x
        snakePiece.classList.add('snake')

        gameBoard.appendChild(snakePiece)
    })
}

function getCorrectImage(index){
    const inputDirection = getInputDirection()
    let imgUrl = "./assets/"

    if(index === 0) {
        switch(inputDirection.d){
            case 'N':
            case 'U':
                imgUrl += "head_up.png"
                break
            case 'D':
                imgUrl += "head_down.png"
                break
            case 'L':
                imgUrl += "head_left.png"
                break
            case 'R':
                imgUrl += "head_right.png"
                break
        }

        return imgUrl
    } else if(index === snakeBody.length - 1){
        if(snakeBody[index - 1].x > snakeBody[index].x) {
            imgUrl += "raba_left.png"
        } else if(snakeBody[index - 1].x < snakeBody[index].x) {
            imgUrl += "raba_right.png"
        } else if(snakeBody[index - 1].y > snakeBody[index].y) {
            imgUrl += "raba_up.png"
        } else {
            imgUrl += "raba_down.png"
        }
        return imgUrl
    } else {
        return imgUrl += "body.png"
    }
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
