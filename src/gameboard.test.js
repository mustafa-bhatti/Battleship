// gameboard.test.js
import Gameboard from './Gameboard'; 
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

  test('receiveAttack registers a hit on the correct ship', () => {
    const ship = Ship(2);
    board.placeShip(ship, [1, 1], 'V');

    board.receiveAttack([1, 1]);
    expect(ship.hits).toBe(1);

    board.receiveAttack([2, 1]);
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBe(true);
  });

  test('receiveAttack records a missed shot if no ship', () => {
    board.receiveAttack([4, 4]);
    expect(board.missedAttacks).toContainEqual([4, 4]);
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
