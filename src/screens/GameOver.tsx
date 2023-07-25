import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import { Button } from "../components/Button";
import { Score } from "../components/Score";
import { THEME } from "../theme";

type ParamList = {
  Score: {
    score: number;
  };
};

export const GameOver = () => {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<ParamList, "Score">>();
  const { score } = route.params;

  const tryAgainClick = () => navigation.navigate("Game");

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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
      <View>
        <Score score={score} />
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <Button text="TRY AGAIN" onPress={tryAgainClick} />
      </View>
    </View>
  );
};
