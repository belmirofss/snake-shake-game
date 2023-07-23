import { StyleSheet, Text } from "react-native";
import { THEME } from "../theme";

type Props = {
  score: number;
};

export const Score = (props: Props) => {
  return (
    <>
      <Text style={styles.scoreText}>FRUITS</Text>
      <Text style={styles.scorePoints}>{props.score}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  scoreText: {
    textAlign: "center",
    fontFamily: THEME.FONTS.REGULAR,
    color: "#000",
    fontSize: 36,
  },
  scorePoints: {
    textAlign: "center",
    fontFamily: THEME.FONTS.REGULAR,
    color: "#000",
    fontSize: 52,
  },
});
