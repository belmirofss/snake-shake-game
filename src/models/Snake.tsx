import { BOARD_SIZE } from "../constants/GameConfig.constants";
import { Direction } from "../enums/Directions.enum";
import { BoardPoint } from "./BoardPoint";

export class Snake {
  currentDirection: Direction;
  directionCommandTemp: Direction;
  points: BoardPoint[];

  constructor() {
    this.currentDirection = Direction.UP;
    this.directionCommandTemp = Direction.UP;
    this.points = [
      new BoardPoint(BOARD_SIZE - 4, 1),
      new BoardPoint(BOARD_SIZE - 3, 1),
      new BoardPoint(BOARD_SIZE - 2, 1),
    ];
  }

  isHead(point: BoardPoint): boolean {
    return (
      this.points[0].row === point.row && this.points[0].column === point.column
    );
  }

  isBody(point: BoardPoint): boolean {
    return !!this.points.find(
      (item, index) =>
        item.row === point.row && item.column === point.column && index !== 0
    );
  }

  isSelfCollision(point: BoardPoint): boolean {
    return this.isBody(point);
  }

  getNewHeadPosition(): BoardPoint {
    const newHead = Object.assign({}, this.points[0]);

    if (this.currentDirection === Direction.LEFT) {
      newHead.column--;
    } else if (this.currentDirection === Direction.RIGHT) {
      newHead.column++;
    } else if (this.currentDirection === Direction.UP) {
      newHead.row--;
    } else if (this.currentDirection === Direction.DOWN) {
      newHead.row++;
    }

    return newHead;
  }

  getAndRemoveLastTail(): BoardPoint | undefined {
    return this.points.pop();
  }

  newDirectionCommand(direction: Direction.LEFT | Direction.RIGHT): void {
    if (direction === Direction.LEFT) {
      switch (this.currentDirection) {
        case Direction.LEFT:
          this.directionCommandTemp = Direction.DOWN;
          break;
        case Direction.UP:
          this.directionCommandTemp = Direction.LEFT;
          break;
        case Direction.RIGHT:
          this.directionCommandTemp = Direction.UP;
          break;
        case Direction.DOWN:
          this.directionCommandTemp = Direction.RIGHT;
          break;
      }
    }

    if (direction === Direction.RIGHT) {
      switch (this.currentDirection) {
        case Direction.LEFT:
          this.directionCommandTemp = Direction.UP;
          break;
        case Direction.UP:
          this.directionCommandTemp = Direction.RIGHT;
          break;
        case Direction.RIGHT:
          this.directionCommandTemp = Direction.DOWN;
          break;
        case Direction.DOWN:
          this.directionCommandTemp = Direction.LEFT;
          break;
      }
    }
  }

  eatFruit(): void {
    const lastTail = this.points[this.points.length - 1];
    this.points.push(new BoardPoint(lastTail.row, lastTail.column));
  }
}
