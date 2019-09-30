import { constants } from './utils';

export default class BoardLogic {
  constructor(grid) {
    this.grid = grid || new Array(constants.DIMS ** 2).fill(null);
  }

  getEmptySquares = (grid = this.grid) => {
    const squares = [];
    grid.forEach((gridItem, i) => {
      if (gridItem === null) squares.push(i);
    });
    return squares;
  };

  isBoardEmpty = (grid = this.grid) => {
    return this.getEmptySquares(grid).length === constants.DIMS ** 2;
  };

  getWinner = (grid = this.grid) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let resp = null;
    winningCombos.forEach(arr => {
      if (
        grid[arr[0]] !== null &&
        grid[arr[0]] === grid[arr[1]] &&
        grid[arr[0]] === grid[arr[2]]
      ) {
        resp = grid[arr[0]];
      } else if (resp === null && this.getEmptySquares(grid).length === 0) {
        resp = constants.DRAW;
      }
    });
    return resp;
  };

  clone = () => {
    return new BoardLogic(this.grid.concat());
  };
}
