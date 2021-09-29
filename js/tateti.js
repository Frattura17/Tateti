// ***** CONSTANTS ***** //

const STATUS_DISPLAY = document.querySelector('.game-notification'),
GAME_STATE = ['','','','','','','','',''],
winnings = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
],
win_message = () => `El jugador ${currentPlayer} ha ganado!`,
draw_message = () => `El juego ha terminado en empate`,
current_player_turn = () => `Turno del jugador ${currentPlayer}`

// ***** VARIABLES ***** //

let gameActive = true,
    currentPlayer = 'X';

// ***** FUNCTIONS ***** //

function main () {
    handleStatus(current_player_turn())
    listeners()
}
main()
function handleStatus (message) {
    STATUS_DISPLAY.innerHTML = message
}
function listeners () {
    document.querySelector('.game-container').addEventListener('click', handleCellClick)
    document.querySelector('.game-restart').addEventListener('click', handleRestartGame)
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X',
    restartGameState(),
    handleStatus(current_player_turn()),
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerText = '');
}
function restartGameState() {
    let i = GAME_STATE.length
    while(i--) {
        GAME_STATE[i] = ''
    }
}
function handleCellClick(clickedEvent) {
     const clickedCell = clickedEvent.target
     const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)

     if(GAME_STATE[clickedCellIndex] != '' || !gameActive) { return } 
     handleCellPlayed(clickedCell, clickedCellIndex)
     handleResultValidation()
     console.log(clickedCellIndex)
    }
function handleCellPlayed(clickedCell, clickedCellIndex) {
     GAME_STATE[clickedCellIndex] = currentPlayer
     clickedCell.innerText = currentPlayer
}
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i < winnings.length; i++) {
        const winCondition = winnings[i]
        let position1 = GAME_STATE[winCondition[0]],
            position2 = GAME_STATE[winCondition[1]],
            position3 = GAME_STATE[winCondition[2]];
        if(position1 === '' || position2 === '' || position3 === '') {
            continue;
        }
        if(position1 === position2 && position2 === position3) {
            roundWon = true ;
            break;
        }
    }
    if(roundWon) {
        handleStatus(win_message())
        gameActive = false;
        return
    }
    let roundDraw = !GAME_STATE.includes('')
    if(roundDraw) {
        handleStatus(draw_message())
        gameActive = false;
        return
    }
    handlePlayerChange()
}
function handlePlayerChange() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
    handleStatus(current_player_turn())
}
