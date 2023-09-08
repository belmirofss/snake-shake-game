import { useState, useReducer } from "react";
import { Point, Direction } from "../types";
import { BOARD_SIZE } from "../constants";

const randomNumber = () => Math.floor(Math.random() * BOARD_SIZE);

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

type Props = {
  onGameOver: () => void;
  onScore: (score: number) => void;
};

export const useSnakeGame = ({ onGameOver, onScore }: Props) => {
  const rows = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(1)
  );
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
  const [fruit, setFruit] = useState<Point>({
    column: -1,
    row: -1,
  });

  const isHead = (point: Point) =>
    snakePoints[0].row === point.row && snakePoints[0].column === point.column;

  const isBody = (point: Point) =>
    !!snakePoints.find(
      (item, index) =>
        item.row === point.row && item.column === point.column && index !== 0
    );

  const isFruit = (point: Point) =>
    point.row === fruit.row && point.column === fruit.column;

  const isSelfCollision = (point: Point) => isBody(point);

  const isBoundaryCollision = (point: Point) => {
    return (
      point.row === BOARD_SIZE ||
      point.row === -1 ||
      point.column === BOARD_SIZE ||
      point.column === -1
    );
  };

  const isFruitCollision = (point: Point) => isFruit(point);

  const spawnFruit = () => {
    const row = randomNumber();
    const column = randomNumber();

    if (isHead({row, column}) || isBody({row, column})) {
      spawnFruit()
    }

    setFruit({ row, column });
  };

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

  const moveSnake = () => {
    const newSnakePoints = snakePoints.map(point => {
      if (snakeDirection === Direction.LEFT) {
        point.column--;
      } else if (snakeDirection === Direction.RIGHT) {
        point.column++;
      } else if (snakeDirection === Direction.UP) {
        point.row--;
      } else if (snakeDirection === Direction.DOWN) {
        point.row++;
      }
  
      return point;
    })
    setSnakePoints(newSnakePoints);

    const newHeadPointPosition = newSnakePoints[0]

    if (isBoundaryCollision(newHeadPointPosition) || isSelfCollision(newHeadPointPosition)) {
      onGameOver();
      return;
    }

    if (isFruitCollision(newHeadPointPosition)) {
      eat();
      upScore();

      spawnFruit();
      onScore(score);
    }
  };

  const upScore = () => setScore((_score) => _score++);

  return {
    score,
    rows,
    updateSnakeDirection,
    moveSnake,
    isHead,
    isBody,
    isFruit,
    spawnFruit,
  };
};
