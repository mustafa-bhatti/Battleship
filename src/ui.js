export const createGrid = function () {
  const playerBoard = document.querySelector('.player-board');
  const computerBoard = document.querySelector('.computer-board');
  const letters = 'ABCDEFGHIJ';
  for (let x = 0; x < 11; x++) {
    for (let y = 0; y < 11; y++) {
      const playerDiv = createChild(x, y);
      const computerDiv = createChild(x, y);
      computerBoard.appendChild(computerDiv)
      playerBoard.appendChild(playerDiv)
    }
  }

  function createChild(x, y) {
    const newDiv = document.createElement('div');
    if (x == 0 && y == 0) {
      newDiv.className = 'empty';
    } else if (x == 0 && y > 0) {
      newDiv.className = 'label';
      newDiv.textContent = y-1;
    } else if (x > 0 && y == 0) {
      newDiv.className = 'label';
      newDiv.textContent = letters[x - 1];
    } else {
      newDiv.className = 'box';
      newDiv.dataset["pos"] = [x-1,y-1]
    }
    return newDiv;
  }
};
