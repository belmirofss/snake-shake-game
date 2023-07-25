export type RotationEvent = {
  alpha: number;
  beta: number;
  gamma: number;
};

export enum Direction {
  LEFT,
  UP,
  RIGHT,
  DOWN,
}

export type Point = {
  row: number;
  column: number;
};
