import { humanPlayer, computerPlayer } from '.';
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
        const div = e.target;
        const pos = e.target.dataset['pos'].split(',').map(Number);
        let attackFlag;
        if (typePlayer == 'human') {
          attackFlag = humanPlayer.board.receiveAttack(pos);
        } else {
          attackFlag = computerPlayer.board.receiveAttack(pos);
        }
        if (attackFlag == 1) {
          div.classList.add('hit');
        }
        else if (attackFlag == -1) {
          div.classList.add("miss");
        }
      };
      newDiv.addEventListener('click', callAttackMethods, { once: true });
    }
    return newDiv;
  }
};
