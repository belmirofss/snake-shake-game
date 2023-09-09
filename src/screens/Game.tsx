import { View } from "react-native";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { AD_BANNER_1, BOARD_SIZE, BOARD_SQUARE_SIZE } from "../constants";
import { THEME } from "../theme";
import { Direction, Point } from "../types";
import { useSnakeGame } from "../hooks/useSnakeGame";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { Score } from "../components/Score";
import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.BANNER : AD_BANNER_1;

export const Game = () => {
  const isFocused = useIsFocused();
  const {
    rows,
    score,
    isHead,
    isBody,
    updateSnakeDirection,
    isFruit,
    startSnake,
  } = useSnakeGame();

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

  useEffect(() => {
    if (isFocused) {
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
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
          <View
            style={{
              ...THEME.SHADOWS.LEVEL_1,
              marginTop: 12,
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
