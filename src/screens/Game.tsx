import { View } from "react-native";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { Audio } from "expo-av";
import { BOARD_SIZE, BOARD_SQUARE_SIZE } from "../constants";
import { THEME } from "../theme";
import { Direction, Point } from "../types";
import { useSnakeGame } from "../hooks/useSnakeGame";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useEffect } from "react";
import { Score } from "../components/Score";
import { useAd } from "../hooks/useAd";

export const Game = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { showAd } = useAd();
  const {
    score,
    rows,
    isHead,
    isBody,
    updateSnakeDirection,
    isFruit,
    spawnFruit,
    startSnake,
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
      showAd();
    },
    onScore: () => {
      playEatFruitSound();
    },
  });

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

  const singleTap = Gesture.Tap()
    .maxDuration(300)
    .onEnd((event) => {
      if (event.x > 180) {
        updateSnakeDirection(Direction.RIGHT);
      } else {
        updateSnakeDirection(Direction.LEFT);
      }
    });

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

  useEffect(() => {
    if (isFocused) {
      playStartGameSound();
      spawnFruit();
      startSnake();
    }
  }, [isFocused]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
          <Score score={score} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
