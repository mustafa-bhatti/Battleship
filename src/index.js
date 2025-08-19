import Player from './Player';
import Ship from './ship';
import './styles.css';
import { createGrid } from './ui';
import { renderBoard } from './render';

export const humanPlayer = new Player('mustafa', 'human');
export const computerPlayer = new Player('ai', 'computer');
createGrid();

const fillBoard = function (player) {
  let board = player.board;
  const direction = ['V', 'H'];
  for (let i = 2; i <= 5; i++) {
    let isShipPlaced = false;
    while (!isShipPlaced) {
      const xPos = Math.floor(Math.random() * 10);
      const yPos = Math.floor(Math.random() * 10);
      const directionIndex = Math.floor(Math.random() * 2);

      const newShip = new Ship(i, direction[directionIndex]);
      // check if ship can be placed, if yes, loop is broken
      if (board.placeShip(newShip, xPos, yPos) == -1) {
        isShipPlaced = true;
      }
    }
  }
};




fillBoard(humanPlayer);
fillBoard(computerPlayer);
// console.log(humanPlayer.board.grid);
// console.log("computer: ",computerPlayer.board.grid);

renderBoard(humanPlayer,computerPlayer)

