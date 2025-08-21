import { humanPlayer, computerPlayer } from '.';
import { renderAttacks, renderRemainingShips } from './render';

export let gameOver = true;
export function setGameOver(value) {
  gameOver = value;
}
function checkWin(humanBoard, compBoard) {
  if (humanBoard.allShipsSunk()) {
    gameOver = true;
    return 1;
  } else if (compBoard.allShipsSunk()) {
    gameOver = true;
    return 0;
  }

  return -1;
}
export const createGrid = function () {
  const playerBoard = document.querySelector('.player-board');
  const computerBoard = document.querySelector('.computer-board');
  playerBoard.innerHTML = '';
  computerBoard.innerHTML = '';
  const letters = 'ABCDEFGHIJ';
  for (let x = 0; x < 11; x++) {
    for (let y = 0; y < 11; y++) {
      const playerDiv = createChild(x, y, 'human');
      const computerDiv = createChild(x, y, 'computer');
      computerBoard.appendChild(computerDiv);
      playerBoard.appendChild(playerDiv);
    }
  }

  function computeMove(board) {
    let loopflag = true;
    while (loopflag) {
      const xPos = Math.floor(Math.random() * 10);
      const yPos = Math.floor(Math.random() * 10);
      const returnRecieveValue = board.receiveAttack([xPos, yPos]);
      // console.log(returnRecieveValue);
      if (returnRecieveValue >= 0) {
        loopflag = false;
      }
    }
  }
  function createChild(x, y, typePlayer) {
    const newDiv = document.createElement('div');
    if (x == 0 && y == 0) {
      newDiv.className = 'empty';
    } else if (x == 0 && y > 0) {
      newDiv.className = 'label';
      newDiv.textContent = y - 1;
    } else if (x > 0 && y == 0) {
      newDiv.className = 'label';
      newDiv.textContent = letters[x - 1];
    } else {
      newDiv.className = 'box';
      newDiv.dataset['pos'] = [x - 1, y - 1];

      const callAttackMethods = (e) => {
        if (!gameOver) {
          if (typePlayer == 'computer') {
            const pos = e.target.dataset['pos'].split(',').map(Number);
            const attackflag = computerPlayer.board.receiveAttack(pos);
            if (attackflag >= 0) {
              computeMove(humanPlayer.board);
            }
            renderAttacks(humanPlayer, playerBoard);
            renderAttacks(computerPlayer, computerBoard);
            renderRemainingShips(humanPlayer,computerPlayer)
            const isWin = checkWin(humanPlayer.board, computerPlayer.board);
            if (gameOver) {
              const gameOverDiv = document.querySelector('.gameOver');
              let winnerName = '';
              // console.log(gameOverDiv);
              if (isWin == 1) {
                winnerName = 'Computer';
              } else if (isWin == 0) {
                winnerName = 'Player';
              }
              gameOverDiv.textContent = 'Game Over    - ' + winnerName;
              gameOverDiv.style.visibility = 'visible';
            }
          }
        }
      };
      newDiv.addEventListener('click', callAttackMethods, { once: true });
    }
    return newDiv;
  }
};
