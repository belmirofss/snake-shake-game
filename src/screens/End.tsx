import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../theme";
import { Button } from "../components/Button";

export const End = () => {
  const navigation = useNavigation();

  const backClick = () => {
    navigation.navigate("Home");
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
      <Text
        style={{
          fontSize: THEME.FONT_SIZES.XXL,
          fontFamily: THEME.FONT,
          color: THEME.COLORS.PRIMARY,
          textAlign: "center",
          lineHeight: 75,
          marginTop: 28,
        }}
      >
        YOU BEAT THE GAME!
      </Text>
      <Text
        style={{
          fontSize: THEME.FONT_SIZES.L,
          fontFamily: THEME.FONT,
          color: THEME.COLORS.BLACK,
          textAlign: "center",
          lineHeight: 75,
          marginTop: 28,
        }}
      >
        YOU SCORED ALL POINTS, NICE!
      </Text>
      <Button text="BACK" onPress={backClick} />
    </View>
  );
};
