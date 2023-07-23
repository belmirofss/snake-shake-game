import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { THEME } from "../theme";

type Props = {
  children: ReactNode;
};

export const TextMessage = (props: Props) => {
  return <Text style={styles.messageText}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: THEME.FONTS.REGULAR,
  },
});
