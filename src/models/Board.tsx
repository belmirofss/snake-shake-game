import { BOARD_SIZE } from "../constants";
import { BoardPoint } from "./BoardPoint";
import { Snake } from "./Snake";

export class Board {
  rows: boolean[][];
  snake: Snake;
  fruit: BoardPoint;
  score: number;

  constructor() {
    this.createNewGame();
  }

  createNewGame(): void {
    this.rows = [];
    this.snake = new Snake();
    this.fruit = new BoardPoint(-1, -1);
    this.score = 0;

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.rows[i] = [];

      for (let j = 0; j < BOARD_SIZE; j++) {
        this.rows[i][j] = false;
      }
    }
  }

  isCollision(point: BoardPoint): boolean {
    return (
      point.row === BOARD_SIZE ||
      point.row === -1 ||
      point.column === BOARD_SIZE ||
      point.column === -1
    );
  }

  fruitCollision(point: BoardPoint): boolean {
    return point.row === this.fruit.row && point.column === this.fruit.column;
  }

  spawnFruit(): void {
    const randomNumber = () => Math.floor(Math.random() * BOARD_SIZE);
    const row = randomNumber();
    const column = randomNumber();

    if (this.rows[row][column] === true) {
      this.spawnFruit();
      return;
    }

    this.fruit = new BoardPoint(row, column);
  }
}
