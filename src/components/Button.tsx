import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { THEME } from "../theme";

type Props = {
  text: string;
  onPress(): void;
};

export const Button = (props: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME.COLORS.PRIMARY,
    width: "100%",
    paddingVertical: 12,
    ...THEME.SHADOWS.LEVEL_1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    fontFamily: THEME.FONTS.REGULAR,
  },
});
