export default class Gameboard {
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
        temp.push(0);
      }
      this.grid.push(temp);
    }
  }
  compareShipStates(ship, xCord, yCord, direction) {
    let shipObj;
    if (direction == 'V' && ship.length + xCord > this.grid.length) {
      return 0;
    } else if (direction == 'H' && ship.length + yCord > this.grid.length) {
      return 0;
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction == 'V') {
        shipObj = this.grid[xCord + i][yCord];
      } else {
        shipObj = this.grid[xCord][yCord + i];
      }

      if (shipObj !== 0) {
        // throw new Error("Ship is aleady placed at that coordinate")
        return 1;
      }
    }
    return;
  }
  placeShip(newShip, coord, direction = 'V') {
    // first check if all the blocks are empty
    const [xCord, yCord] = coord;
    const returnValue = this.compareShipStates(
      newShip,
      xCord,
      yCord,
      direction
    );
    if (returnValue == 1) {
      return 'Ship already present';
    } else if (returnValue == 0) {
      return 'Out of bounds';
    }
    for (let i = 0; i < newShip.length; i++) {
      if (direction == 'V') {
        this.grid[xCord + i][yCord] = newShip;
      } else {
        this.grid[xCord][yCord + i] = newShip;
      }
    }
  }
}

// const game = new Gameboard();
// game.placeShip(3, 4, 5);
// console.log(game.grid);
