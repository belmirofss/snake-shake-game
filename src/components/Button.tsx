import { Text, TouchableOpacity } from "react-native";
import { THEME } from "../theme";

type Props = {
  text: string;
  onPress(): void;
};

export const Button = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: THEME.COLORS.PRIMARY,
        width: "100%",
        paddingVertical: 12,
        ...THEME.SHADOWS.LEVEL_1,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: THEME.COLORS.WHITE,
          fontSize: THEME.FONT_SIZES.M,
          textAlign: "center",
          fontFamily: THEME.FONT,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
