import { useCallback, useState, useEffect } from "react";
import { View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { Audio } from "expo-av";
import { THEME } from "../../theme";
import {
  BETA_LIMIT,
  BOARD_SIZE,
  BOARD_SQUARE_SIZE,
  GAME_SPEED,
} from "../../constants";
import { Direction, Point, RotationEvent } from "../../types";
import { Subscription } from "expo-screen-orientation";
import { useSnakeGame } from "../../hooks/useSnakeGame";

type Props = {
  onScoreChanges(score: number): void;
  onBetaChanges(beta: number): void;
};

export const Board = ({ onScoreChanges, onBetaChanges }: Props) => {
  const [betaIsReseted, setBetaIsReseted] = useState(true);
  const {
    score,
    isHead,
    isBody,
    updateSnakeDirection,
    moveSnake,
    rows,
    isFruit,
    spawnFruit,
  } = useSnakeGame({
    onGameOver: () => {
      playGameOverSound();
      navigation.navigate("GameOver", {
        score: score,
      });
    },
    onScore: (score) => {
      playEatFruitSound();
      onScoreChanges(score);
    },
  });

  const [subscriptionDeviceMotion, setSubscriptionDeviceMotion] =
    useState<Subscription | null>(null);

  const navigation = useNavigation();

  const getBoardPieceColor = (point: Point) => {
    if (isHead(point)) {
      return THEME.COLORS.PRIMARY;
    }

    if (isBody(point)) {
      return THEME.COLORS.SECONDARY;
    }

    if (isFruit(point)) {
      return THEME.COLORS.TERTIARY;
    }

    return THEME.COLORS.WHITE;
  };

  const playEatFruitSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../sounds/eat_fruit.wav")
    );
    sound.playAsync();
  };

  const playGameOverSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../sounds/game_over.wav")
    );
    sound.playAsync();
  };

  const playStartGameSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../sounds/start_game.wav")
    );
    sound.playAsync();
  };

  const listenDeviceMotion = () => {
    DeviceMotion.setUpdateInterval(50);

    setSubscriptionDeviceMotion(
      DeviceMotion.addListener((deviceMotionData) => {
        if (deviceMotionData.rotation) {
          handleRotationEvent(deviceMotionData.rotation);
        }
      })
    );
  };

  const handleRotationEvent = (rotationEvent: RotationEvent) => {
    const { beta } = rotationEvent;
    const isRight = beta >= BETA_LIMIT;
    const isLeft = beta <= -BETA_LIMIT;

    onBetaChanges(beta);

    if (!betaIsReseted && beta < BETA_LIMIT && beta > -BETA_LIMIT) {
      setBetaIsReseted(true);
      return;
    }

    if (isLeft || isRight) {
      setBetaIsReseted(false);
    }

    if (isLeft) {
      updateSnakeDirection(Direction.LEFT);
    } else if (isRight) {
      updateSnakeDirection(Direction.RIGHT);
    }
  };

  useEffect(() => {
    playStartGameSound();
    listenDeviceMotion();
    spawnFruit();

    const interval = setInterval(() => moveSnake(), GAME_SPEED);

    return () => {
      subscriptionDeviceMotion && subscriptionDeviceMotion.remove();
      DeviceMotion.removeAllListeners();
      setSubscriptionDeviceMotion(null);
      clearInterval(interval);
    };
  }, []);

  return (
    <View
      style={{
        ...THEME.SHADOWS.LEVEL_1,
        backgroundColor: THEME.COLORS.WHITE,
        borderWidth: 0.75,
        borderColor: THEME.COLORS.BLACK,
        height: BOARD_SIZE * BOARD_SQUARE_SIZE + 1.5,
      }}
    >
      {rows.map((row, index) => (
        <View
          key={index}
          style={{
            height: BOARD_SQUARE_SIZE,
            flexDirection: "row",
          }}
        >
          {row.map((_, pointIndex) => (
            <View
              key={pointIndex}
              style={{
                width: BOARD_SQUARE_SIZE,
                height: BOARD_SQUARE_SIZE,
                borderWidth: 0.75,
                borderColor: THEME.COLORS.BLACK,
                backgroundColor: getBoardPieceColor({
                  row: index,
                  column: pointIndex,
                }),
              }}
            ></View>
          ))}
        </View>
      ))}
    </View>
  );
};
