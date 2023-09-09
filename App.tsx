import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Routes from "./src/Routes";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    FS_Gravity: require("./src/fonts/fs-gravity.otf"),
  });
  const [portraitOrientationSetted, setPortraitOrientationSetted] =
    useState(false);

  const setPortraitOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
    setPortraitOrientationSetted(true);
  };

  useEffect(() => {
    setPortraitOrientation();
  }, []);

  if (!fontsLoaded || !portraitOrientationSetted) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.WHITE,
  },
});
