export class Gameboard {
  constructor() {
    this.shipArray = [];
    this.numOfShipsSunk = 0;
    this.hitAttacks = [];
    this.grid = [];
    this.initializeGrid();
    this.missedAttacks = [];
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
  compareShipStates(ship, xPos, yPos, direction) {
    // -1 == Succesfull
    // 0  == if ship is out of bounds
    // 1 == there is alreaedy a ship present
    let shipObj;
    if (direction == 'V' && ship.length + xPos > this.grid.length) {
      return 0;
    } else if (direction == 'H' && ship.length + yPos > this.grid.length) {
      return 0;
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction == 'V') {
        shipObj = this.grid[xPos + i][yPos];
      } else {
        shipObj = this.grid[xPos][yPos + i];
      }

      if (shipObj !== 0) {
        // throw new Error("Ship is aleady placed at that coordinate")
        return 1;
      }
    }
    return -1;
  }
  placeShip(newShip, xPos, yPos) {
    const direction = newShip.direction;
    // first check if all the blocks are empty
    const returnValue = this.compareShipStates(newShip, xPos, yPos, direction);

    if (returnValue != -1) {
      return returnValue;
    }
    this.shipArray.push({ newShip, xPos, yPos, direction });
    for (let i = 0; i < newShip.length; i++) {
      if (direction == 'V') {
        this.grid[xPos + i][yPos] = newShip;
      } else {
        this.grid[xPos][yPos + i] = newShip;
      }

      // succesfull placementsss
    }
    return returnValue;
  }
  /** 
   *@returnValues
    1 = hit Successfull
    0 = added to missed attacks
    -1 = already in missed attacks or hit. invalid move
    
  */
  receiveAttack(position) {
    const [xCord, yCord] = position;
    if (this.grid[xCord][yCord] != 0) {
      // box is not empty
      let checkHitIndex = this.hitAttacks.findIndex(
        (item) => item[0] == xCord && item[1] == yCord
      );
      console.log("hit index ",checkHitIndex);
      if (checkHitIndex == -1){
      let shipToHit = this.grid[xCord][yCord];
      console.log('HITTTT');
      shipToHit.hit();
      this.hitAttacks.push(position)
      return 1;
      }
      else if (checkHitIndex != -1){
        console.log("already Hit")
        return -1
      }
    } else {
      // box === 0
      let checkMissingIndex = this.missedAttacks.findIndex(
        (item) => item[0] == xCord && item[1] == yCord
      );
      if (checkMissingIndex == -1) {
        this.missedAttacks.push(position);
        console.log('missed attacks', this.missedAttacks);
        return 0;
      } else {
        console.log('already missed');
        return -1;
      }
    }
  }
  allShipsSunk() {
    let flag = true;
    this.shipArray.forEach(function (ship) {
      console.log('check', ship[newShip]);
      if (!ship(newShip).isSunk()) {
        flag = false;
      }
    });
    return flag;
  }
}

// const game = new Gameboard();
// game.placeShip(3, 4, 5);
// console.log(game.grid);
