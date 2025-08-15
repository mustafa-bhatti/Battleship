import { Gameboard } from './Gameboard';

export default class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.board = new Gameboard();
  }
}
