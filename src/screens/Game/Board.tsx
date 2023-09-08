import { useEffect } from "react";
import { View } from "react-native";
import {
  useNavigation,
  useIsFocused,
  CommonActions,
} from "@react-navigation/core";
import { Audio } from "expo-av";
import { THEME } from "../../theme";
import { BOARD_SIZE, BOARD_SQUARE_SIZE, GAME_SPEED } from "../../constants";
import { Point } from "../../types";
import { useSnakeGame } from "../../hooks/useSnakeGame";

type Props = {
  onScoreChanges(score: number): void;
};

export const Board = ({ onScoreChanges }: Props) => {
  const isFocused = useIsFocused();
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
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "GameOver",
              params: {
                score,
              },
            },
          ],
        })
      );
    },
    onScore: (score) => {
      playEatFruitSound();
      onScoreChanges(score);
    },
  });

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

  useEffect(() => {
    if (isFocused) {
      playStartGameSound();
      spawnFruit();
    }

    const interval = setInterval(() => moveSnake(), GAME_SPEED);

    return () => {
      clearInterval(interval);
    };
  }, [isFocused]);

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
