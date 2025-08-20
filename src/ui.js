import { humanPlayer, computerPlayer } from '.';
import { renderAttacks } from './render';
let turn = 1;
export const createGrid = function () {
  const playerBoard = document.querySelector('.player-board');
  const computerBoard = document.querySelector('.computer-board');
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
      console.log(returnRecieveValue);
      if (returnRecieveValue >= 0) {
        loopflag = false;
      }
    }
  }
  function createChild(x, y, typePlayer) {
    // turn 1 = human
    // turn 0 = computer
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
        const pos = e.target.dataset['pos'].split(',').map(Number);
        if (typePlayer == 'computer') {
          const attackflag = computerPlayer.board.receiveAttack(pos);
          if (attackflag >= 0 ) {
          computeMove(humanPlayer.board);
          }
        }
        renderAttacks(humanPlayer, playerBoard);
        renderAttacks(computerPlayer, computerBoard);
      };
      newDiv.addEventListener('click', callAttackMethods, { once: true });
    }
    return newDiv;
  }
};
