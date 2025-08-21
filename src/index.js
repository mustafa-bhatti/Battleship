import Player from './Player';
import Ship from './ship';
import './styles.css';
import { createGrid, gameOver, setGameOver } from './ui';
import { renderBoard } from './render';

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

// console.log(humanPlayer.board.grid);
// console.log("computer: ",computerPlayer.board.grid);
const playBtn = document.querySelector('#play-btn');

let humanPlayer, computerPlayer;
export { humanPlayer, computerPlayer };
createGrid();
playBtn.addEventListener('click', function () {
  const gameOverDiv = document.querySelector('.gameOver');
  const remainingShipsDiv = document.querySelectorAll('.remaining-ships');
  gameOverDiv.style.visibility = 'hidden';
  remainingShipsDiv.forEach(
    (Element) => (Element.style.visibility = 'visible')
  );
  const player1span = document.querySelector('#player-ships');
  const player2span = document.querySelector('#computer-ships');
  player1span.textContent = '';
  player2span.textContent = '';
  createGrid();
  setGameOver(false);
  humanPlayer = new Player('mustafa', 'human');
  computerPlayer = new Player('ai', 'computer');
  fillBoard(humanPlayer);
  fillBoard(computerPlayer);
  renderBoard(humanPlayer, computerPlayer);
});
