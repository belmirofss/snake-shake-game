import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/Button";
import { TextMessage } from "../components/TextMessage";
import LOGO from "../images/logo.png";

export const Home = () => {
  const navigation = useNavigation();

  const startGameclick = () => navigation.navigate("GamePage");

  return (
    <View style={styles.container}>
      <View style={styles.wrapperUpperContent}>
        {/* <AutoHeightImage
          source={LOGO}
          width={228} 
        /> */}

        <TextMessage>
          Play the classic snake game in a different way. Use your smartphone
          sensors to move the snake. Shake your smartphone!
        </TextMessage>
      </View>

      <View style={styles.wrapperButton}>
        <Button text="START" onPress={startGameclick} />
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
  wrapperUpperContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  wrapperButton: {
    width: "100%",
  },
});
