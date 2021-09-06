import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Routes from './src/routes/Routes.route';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {

  const [fontsLoaded] = useFonts({
    'FS_Gravity': require('./src/fonts/fs-gravity.otf'),
  });
  const [landscapeOrientationSetted, setLandscapeOrientationSetted] = useState(false);

  const setLandscapeOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    setLandscapeOrientationSetted(true);
  }

  useEffect(() => {
    setLandscapeOrientation();
  }, []);

  if (!fontsLoaded || !landscapeOrientationSetted) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Routes />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
