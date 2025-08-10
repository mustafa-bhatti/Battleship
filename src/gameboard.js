// import { ship } from "./ship";

export class gameboard {
  constructor() {
    this.shipArray = [];
    this.numOfShipsSunk = 0;
    this.grid = [];
    this.initializeGrid();
  }
  initializeGrid() {
    for (let x = 0; x < 10; x++) {
      const temp = [];
      for (let y = 0; y < 10; y++) {
        temp.push({ ship: 0, hit: 0 });
      }
      this.grid.push(temp);
    }
  }
  compareShipStates(obj1, obj2) {
    return obj1.ship === obj2.ship && obj1.hit === obj2.hit;
  }
  placeShip(shipLength, xCord, yCord) {
    // first check if all the blocks are empty
    for (let i = 0; i < shipLength; i++) {
      if (
        !this.compareShipStates(this.grid[xCord + i][yCord], {
          ship: 0,
          hit: 0,
        })
      ) {
        throw console.error('ship already placed');
      }
    }
    for (let i = 0; i < shipLength; i++) {
      this.grid[xCord + i][yCord] = { ship: newShip, hit: 0 };
    }
  }
}

const game = new gameboard();
game.placeShip(3, 4, 5);
console.log(game.grid);
