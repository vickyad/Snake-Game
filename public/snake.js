import { getInputDirection } from './input.js'
const GRID_SIZE = 21

export const SNAKE_SPEED = 4
export const snakeBody = [{ x: 11, y: 11 }, {x: 11, y: 12}]
let newSegments = 0
let iniciou = false

export function updateSnake() {
    addSegments()
    const inputDirection = getInputDirection()


    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    if(!iniciou) {
        if(!(inputDirection.x === 0 && inputDirection.y === 0)) {
            iniciou = true
        } else {
            if(snakeBody.length === 2){
                snakeBody[1].y = 12
            }
        }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function renderSnake(gameBoard) {
    snakeBody.forEach((segment, index) => {
        const snakePiece = document.createElement('IMG')
        const image = getCorrectImage(index)

        snakePiece.setAttribute("src", image)

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
    } else {
        if(snakeBody[index - 1].x === snakeBody[index].x && snakeBody[index].x === snakeBody[index + 1].x) {
            imgUrl += "body_v.png"
        } else if(snakeBody[index - 1].y === snakeBody[index].y && snakeBody[index].y === snakeBody[index + 1].y) {
            imgUrl += "body_h.png"
        } else {
            if((snakeBody[index - 1].y === snakeBody[index].y && snakeBody[index - 1].x === (snakeBody[index].x - 1) && snakeBody[index].x === snakeBody[index + 1].x && snakeBody[index].y === (snakeBody[index + 1].y - 1)) || 
                (snakeBody[index - 1].x === snakeBody[index].x && snakeBody[index].y === (snakeBody[index - 1].y - 1) && snakeBody[index].y === snakeBody[index + 1].y && snakeBody[index + 1].x === (snakeBody[index].x - 1))) {
                imgUrl += "curve_dl.png"
            } else if((snakeBody[index - 1].x === snakeBody[index].x && snakeBody[index - 1].y === (snakeBody[index].y + 1) && snakeBody[index].y === snakeBody[index + 1].y && snakeBody[index].x === (snakeBody[index + 1].x - 1)) ||
                (snakeBody[index - 1].y === snakeBody[index].y && snakeBody[index].x === (snakeBody[index - 1].x - 1) && snakeBody[index].x === snakeBody[index + 1].x && snakeBody[index + 1].y === (snakeBody[index].y + 1))) {
                imgUrl += "curve_dr.png"
            } else if(snakeBody[index - 1].x === (snakeBody[index].x - 1) || snakeBody[index + 1].x === (snakeBody[index].x - 1)) {
                imgUrl += "curve_ul.png"
            }else {
                imgUrl += "curve_ur.png"
            }
        }
    }

    return imgUrl
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
