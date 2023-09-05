const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]")
const winningText = document.querySelector("[data-text]")
const winningMessage = document.querySelector("[data-winning-message]");
const buttonRestart = document.querySelector("[data-restart]")

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

const startGame = () =>{
    isCircleTurn = false;

    for (const cell of cellElements){
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    }


    setBoardb();

    winningMessage.classList.remove("show-text-winning");
}

const endGame = (isDraw) => {
    if(isDraw) {
        winningText.innerText = 'Empate'
    }else{
        winningText.innerText = isCircleTurn ?
         'Circulo Venceu' : 'X Venceu';
    }

    winningMessage.classList.add('show-text-winning')
}

const checkForWin = (currentPlayer) => {

    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    })
}



const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardb = () => {
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {
        board.classList.add('circle')
    }else{
        board.classList.add("x")
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardb();
}

const handleClick = (e) => {
    // Colocar a marca do X ou Circulo
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle": "x";

    cell.classList.add(classToAdd);

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);

    const isDraw = checkForDraw();

    if(isWin) {
        endGame(false);
    }else if (isDraw){
        endGame(true)
    }else{
        swapTurns()
    }
}

// Vamos adicionar em cada célula o evento de click
startGame();

buttonRestart.addEventListener('click', startGame);