export const createGrid = function () {
  const gridContainer = document.querySelector('.grid-container');
  const letters = 'ABCDEFGHIJ';
  for (let x = 0; x < 11; x++) {
    for (let y = 0; y < 11; y++) {
      const newDiv = document.createElement('div');
      if (x == 0 && y == 0) {
        newDiv.className = 'empty';
      } else if (x == 0 && y > 0) {
        newDiv.className = 'label';
        newDiv.textContent = y
      }else if (x > 0 && y ==0 ){
        newDiv.className = 'label';
        newDiv.textContent = letters[x-1];
      }

       else {
        newDiv.className = 'box';
        newDiv.dataset.position = [x, y];
      }
      gridContainer.appendChild(newDiv);
    }
  }
};
