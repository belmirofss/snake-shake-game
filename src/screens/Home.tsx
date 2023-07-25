import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "../components/Button";
import { THEME } from "../theme";
import LOGO from "../images/logo.png";

export const Home = () => {
  const navigation = useNavigation();

  const startGameclick = () => navigation.navigate("Game");

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image
        source={LOGO}
        style={{
          aspectRatio: 16 / 9,
          height: 150,
        }}
      />

      <Text
        style={{
          fontSize: THEME.FONT_SIZES.M,
          textAlign: "center",
          fontFamily: THEME.FONT,
        }}
      >
        Play the classic snake game in a different way. Use your smartphone
        sensors to move the snake. Shake your smartphone!
      </Text>

      <View
        style={{
          width: "100%",
        }}
      >
        <Button text="START" onPress={startGameclick} />
      </View>
    </View>
  );
};
