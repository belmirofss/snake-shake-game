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
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Image
        source={LOGO}
        style={{
          aspectRatio: 16 / 9,
          height: 150,
        }}
      />

      <View>
        <Text
          style={{
            fontSize: THEME.FONT_SIZES.M,
            textAlign: "center",
            fontFamily: THEME.FONT,
          }}
        >
          Play the classic snake game now!
        </Text>
        <Text
          style={{
            fontSize: THEME.FONT_SIZES.S,
            textAlign: "center",
            fontFamily: THEME.FONT,
          }}
        >
          After the game starts, click on the sides of the screen to change the
          direction.
        </Text>
      </View>

      <Button text="START" onPress={startGameclick} />
    </View>
  );
};
