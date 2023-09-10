import { Text, View } from "react-native";
import { THEME } from "../theme";
import { useScoreRecord } from "../hooks/useScoreRecord";

type Props = {
  score: number;
};

export const Score = ({ score }: Props) => {
  const { record } = useScoreRecord();

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontFamily: THEME.FONT,
          color: THEME.COLORS.BLACK,
          fontSize: THEME.FONT_SIZES.L,
        }}
      >
        YOUR SCORE IS {score}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontFamily: THEME.FONT,
          color: THEME.COLORS.BLACK,
          fontSize: THEME.FONT_SIZES.M,
        }}
      >
        YOUR BEST IS {record}
      </Text>
    </View>
  );
};
