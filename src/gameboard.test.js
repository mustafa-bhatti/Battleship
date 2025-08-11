// gameboard.test.js
import Gameboard from './gameboard';
import Ship from './Ship';

describe('Gameboard', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test('places a ship at specific coordinates', () => {
    const ship = new Ship(3); // length 3
    board.placeShip(ship, [0, 0], 'H');

    // The ship should occupy (0,0), (0,1), (0,2)
    expect(board.grid[0][0]).toBe(ship);
    expect(board.grid[0][1]).toBe(ship);
    expect(board.grid[0][2]).toBe(ship);
  });

  test('throws an error if a ship is already placed there and exits the function', () => {
    const ship1 = new Ship(3); // length 3
    const ship2 = new Ship(3); // length 3
    board.placeShip(ship1, [0, 0], 'H');
    const expected = board.placeShip(ship2, [0, 0], 'V');
    // console.log(expected)
    // The ship should occupy (0,0), (0,1), (0,2)
    expect(expected).toEqual('Ship already present');
  });
  test('throws an error if a ship is out of bounds', () => {
    const ship1 = new Ship(3); // length 3
    const expected = board.placeShip(ship1, [9, 0], 'V');
    // console.log(expected)
    // The ship should occupy (0,0), (0,1), (0,2)
    expect(expected).toEqual('Out of bounds');
  });

  test('receiveAttack registers a hit on the correct ship', () => {
    const ship = new Ship(2);
    board.placeShip(ship, [1, 1], 'V');

    board.receiveAttack([1, 1]);
    expect(ship.hitTimes).toBe(1);

    board.receiveAttack([2, 1]);
    expect(ship.hitTimes).toBe(2);
    expect(ship.isSunk()).toBe(true);
  });

  test('receiveAttack records a missed shot if no ship', () => {
    board.receiveAttack([3, 1]);
    expect(board.missedAttacks).toContainEqual([3, 1]);
  });

  test('does not double-record a missed attack on the same coordinate', () => {
    board.receiveAttack([5, 5]);
    board.receiveAttack([5, 5]);
    expect(board.missedAttacks.length).toBe(1);
  });

  test('allShipsSunk returns true only when all ships are sunk', () => {
    const ship1 = Ship(1);
    const ship2 = Ship(1);

    board.placeShip(ship1, [0, 0], 'horizontal');
    board.placeShip(ship2, [1, 0], 'horizontal');

    board.receiveAttack([0, 0]);
    expect(board.allShipsSunk()).toBe(false);

    board.receiveAttack([1, 0]);
    expect(board.allShipsSunk()).toBe(true);
  });
});
