import { Text } from "react-native";
import { THEME } from "../theme";

type Props = {
  score: number;
};

export const Score = ({ score }: Props) => {
  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontFamily: THEME.FONT,
          color: THEME.COLORS.BLACK,
          fontSize: THEME.FONT_SIZES.L,
        }}
      >
        FRUITS
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontFamily: THEME.FONT,
          color: THEME.COLORS.BLACK,
          fontSize: THEME.FONT_SIZES.XL,
        }}
      >
        {score}
      </Text>
    </>
  );
};
