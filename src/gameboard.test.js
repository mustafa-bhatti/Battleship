import { gameboard } from './gameboard';

test('grid is initialized', () => {
  //   gameboard.initializeGrid()
  const game = new gameboard();
  expect(game.grid.length).toBe(10);
});

test('ship is placed on the block', () => {
  const game = new gameboard();
  game.placeShip(3, 4, 3);
  expect(game.grid[4][3]).toEqual({ ship: 3, hit: 0 });
});
