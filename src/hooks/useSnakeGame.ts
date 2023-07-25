import { useState, useReducer } from "react";
import { Point, Direction } from "../types";
import { BOARD_SIZE } from "../constants";

const snakeDirectionReducer = (
  currentDirection: Direction,
  newDirection: Direction
) => {
  let direction = currentDirection;

  if (newDirection === Direction.LEFT) {
    switch (currentDirection) {
      case Direction.LEFT:
        direction = Direction.DOWN;
        break;
      case Direction.UP:
        direction = Direction.LEFT;
        break;
      case Direction.RIGHT:
        direction = Direction.UP;
        break;
      case Direction.DOWN:
        direction = Direction.RIGHT;
        break;
    }
  }

  if (newDirection === Direction.RIGHT) {
    switch (currentDirection) {
      case Direction.LEFT:
        direction = Direction.UP;
      case Direction.UP:
        direction = Direction.RIGHT;
      case Direction.RIGHT:
        direction = Direction.DOWN;
      case Direction.DOWN:
        direction = Direction.LEFT;
    }
  }

  return direction;
};

export const useSnakeGame = () => {
  const [score, setScore] = useState(0);
  const [snakeDirection, updateSnakeDirection] = useReducer(
    snakeDirectionReducer,
    Direction.UP
  );
  const [snakePoints, setSnakePoints] = useState<Point[]>([
    {
      column: 1,
      row: BOARD_SIZE - 4,
    },
    { column: 1, row: BOARD_SIZE - 3 },
    { column: 1, row: BOARD_SIZE - 2 },
  ]);

  const isHead = (point: Point) =>
    snakePoints[0].row === point.row && snakePoints[0].column === point.column;

  const isBody = (point: Point) =>
    !!snakePoints.find(
      (item, index) =>
        item.row === point.row && item.column === point.column && index !== 0
    );

  const isSelfCollision = (point: Point) => isBody(point);

  const eat = () => {
    const lastTail = snakePoints[snakePoints.length - 1];
    setSnakePoints([
      ...snakePoints,
      { column: lastTail.column, row: lastTail.row },
    ]);
  };

  const getNewHeadPointPosition = () => {
    const newHead = { ...snakePoints[0] };

    if (snakeDirection === Direction.LEFT) {
      newHead.column--;
    } else if (snakeDirection === Direction.RIGHT) {
      newHead.column++;
    } else if (snakeDirection === Direction.UP) {
      newHead.row--;
    } else if (snakeDirection === Direction.DOWN) {
      newHead.row++;
    }

    return newHead;
  };

  const keepGoing = () => {
    const newHeadPointPosition = getNewHeadPointPosition();
    snakePoints.pop()
    setSnakePoints([newHeadPointPosition, ... snakePoints])

    return newHeadPointPosition;
  };

  const upScore = () => setScore((_score) => _score++);

  return {
    score,
    updateSnakeDirection,
    eat,
    isSelfCollision,
    keepGoing,
    upScore,
    isHead,
    isBody,
  };
};
