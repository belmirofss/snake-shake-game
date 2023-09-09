import {
  RouteProp,
  useNavigation,
  useRoute,
  CommonActions,
} from "@react-navigation/core";
import { Text, View } from "react-native";
import { Button } from "../components/Button";
import { Score } from "../components/Score";
import { THEME } from "../theme";
import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { AD_BANNER_2 } from "../constants";

const adUnitId = __DEV__ ? TestIds.BANNER : AD_BANNER_2;

type ParamList = {
  Score: {
    score: number;
  };
};

export const GameOver = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, "Score">>();
  const { score } = route.params;

  const tryAgainClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Game" }],
      })
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
      <Text
        style={{
          fontSize: THEME.FONT_SIZES.XXL,
          fontFamily: THEME.FONT,
          color: THEME.COLORS.TERTIARY,
          textAlign: "center",
          lineHeight: 75,
          marginTop: 28,
        }}
      >
        GAME OVER
      </Text>
      <Score score={score} />
      <Button text="TRY AGAIN" onPress={tryAgainClick} />
    </View>
  );
};
