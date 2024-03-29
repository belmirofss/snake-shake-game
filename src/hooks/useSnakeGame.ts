import { useRef, useState } from "react";
import { Audio } from "expo-av";
import * as Haptics from 'expo-haptics';
import { Point, Direction } from "../types";
import { BOARD_SIZE, GAME_SPEED } from "../constants";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useScoreRecord } from "./useScoreRecord";

const randomNumber = () => Math.floor(Math.random() * BOARD_SIZE);

const useForceUpdate = () => {
  const [_, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

const playEatFruitSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../sounds/eat_fruit.wav")
  );
  sound.playAsync();
};

const playGameOverSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../sounds/game_over.wav")
  );
  sound.playAsync();
};

const playStartGameSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../sounds/start_game.wav")
  );
  sound.playAsync();
};

export const useSnakeGame = () => {
  const rows = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(1)
  );
  const navigation = useNavigation();
  const { saveRecord, MAX_SCORE } = useScoreRecord();
  const forceUpdate = useForceUpdate();
  const snakePoints = useRef<Point[]>([
    {
      column: 1,
      row: BOARD_SIZE - 4,
    },
    { column: 1, row: BOARD_SIZE - 3 },
    { column: 1, row: BOARD_SIZE - 2 },
  ]);
  const score = useRef(0);
  const snakeDirection = useRef<Direction>(Direction.UP);
  const fruit = useRef<Point>({
    column: -1,
    row: -1,
  });

  const isHead = (point: Point) =>
    snakePoints.current[0].row === point.row &&
    snakePoints.current[0].column === point.column;

  const isBody = (point: Point) =>
    !!snakePoints.current.find(
      (item, index) =>
        item.row === point.row && item.column === point.column && index !== 0
    );

  const isFruit = (point: Point) =>
    point.row === fruit.current.row && point.column === fruit.current.column;

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

    if (isHead({ row, column }) || isBody({ row, column })) {
      spawnFruit();
    }

    fruit.current = { row, column };
  };

  const eat = () => {
    const lastTail = snakePoints.current[snakePoints.current.length - 1];
    snakePoints.current = [
      ...snakePoints.current,
      { column: lastTail.column, row: lastTail.row },
    ];
  };

  const updateSnakeDirection = (newDirection: Direction) => {
    let direction = snakeDirection.current;

    if (newDirection === Direction.LEFT) {
      const directions = {
        [Direction.LEFT]: Direction.DOWN,
        [Direction.UP]: Direction.LEFT,
        [Direction.RIGHT]: Direction.UP,
        [Direction.DOWN]: Direction.RIGHT,
      };

      direction = directions[direction];
    }

    if (newDirection === Direction.RIGHT) {
      const directions = {
        [Direction.LEFT]: Direction.UP,
        [Direction.UP]: Direction.RIGHT,
        [Direction.RIGHT]: Direction.DOWN,
        [Direction.DOWN]: Direction.LEFT,
      };

      direction = directions[direction];
    }

    snakeDirection.current = direction;
  };

  const moveSnake = () => {
    let previousPoint: Point | undefined;

    const newSnakePoints = snakePoints.current.map((point, index) => {
      const originalPoint = { ...point };

      if (index === 0) {
        if (snakeDirection.current === Direction.LEFT) {
          point.column--;
        } else if (snakeDirection.current === Direction.RIGHT) {
          point.column++;
        } else if (snakeDirection.current === Direction.UP) {
          point.row--;
        } else if (snakeDirection.current === Direction.DOWN) {
          point.row++;
        }
      } else {
        if (previousPoint) {
          point.column = previousPoint.column;
          point.row = previousPoint.row;
        }
      }

      previousPoint = originalPoint;

      return point;
    });
    snakePoints.current = newSnakePoints;

    const newHeadPointPosition = newSnakePoints[0];

    if (
      isBoundaryCollision(newHeadPointPosition) ||
      isSelfCollision(newHeadPointPosition)
    ) {
      saveRecord(score.current)
      playGameOverSound();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "GameOver",
              params: {
                score: score.current,
              },
            },
          ],
        })
      );
      return;
    }

    if (isFruitCollision(newHeadPointPosition)) {
      eat();
      upScore();
      playEatFruitSound();
      spawnFruit();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    forceUpdate();

    if (score.current === MAX_SCORE) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "End",
            },
          ],
        })
      );
      return;
    }

    setTimeout(() => moveSnake(), GAME_SPEED);
  };

  const upScore = () => (score.current = score.current + 1);

  return {
    rows,
    score: score.current,
    updateSnakeDirection,
    startSnake: () => {
      playStartGameSound();
      spawnFruit();
      moveSnake();
    },
    isHead,
    isBody,
    isFruit,
  };
};
