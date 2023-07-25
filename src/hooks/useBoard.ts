import { useState } from "react";
import { BOARD_SIZE } from "../constants";
import { Point } from "../types";

const randomNumber = () => Math.floor(Math.random() * BOARD_SIZE);

export const useBoard = () => {
  const rows = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(1));

  const [fruit, setFruit] = useState<Point>({
    column: -1,
    row: -1,
  });

  const isBoundaryCollision = (point: Point) => {
    return (
      point.row === BOARD_SIZE ||
      point.row === -1 ||
      point.column === BOARD_SIZE ||
      point.column === -1
    );
  };

  const isFruit = (point: Point) =>
    point.row === fruit.row && point.column === fruit.column;

  const isFruitCollision = (point: Point) => isFruit(point);

  const spawnFruit = () => {
    const row = randomNumber();
    const column = randomNumber();

    setFruit({ row, column });
  };

  return { rows, isBoundaryCollision, isFruit, isFruitCollision, spawnFruit };
};
