import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.gameOverText}>GAME OVER</Text>
      <View>
        <Score score={score} />
      </View>
      <View style={styles.wrapperButton}>
        <Button text="TRY AGAIN" onPress={tryAgainClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  gameOverText: {
    fontSize: 90,
    fontFamily: THEME.FONTS.REGULAR,
    color: THEME.COLORS.TERTIARY,
    textAlign: "center",
    lineHeight: 75,
    marginTop: 28,
  },
  wrapperButton: {
    width: "100%",
  },
});
