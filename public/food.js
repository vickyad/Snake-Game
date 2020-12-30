import { foodAte, growSnake, onSnake } from './snake.js'

const EXPANSION_RATE = 1
export const GRID_SIZE = 21

let food = getRandomFoodPosition()
export let score = 0

export function updateFood() {
    if(foodAte(food)) {
        growSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        score += 1
    }
}

export function renderFood(gameBoard) {
    const foodElement = document.createElement('IMG')

    foodElement.setAttribute("src", "./assets/food.png")

    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')

    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
    let newFoodPosition

    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }

    return newFoodPosition
}

function randomGridPosition(){
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}