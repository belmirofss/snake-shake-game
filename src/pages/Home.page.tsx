import React from 'react';
import { StyleSheet, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ButtonComponent from '../components/Button.component';
import LOGO from '../images/logo.png';

export default function HomePage() {

  return (
    <View style={styles.container}>
      <View>
        <AutoHeightImage
          source={LOGO}
          width={264} 
        />
      </View>

      <View style={styles.wrapperButton}>
        <ButtonComponent
          text="Start"
          onPress={() => console.log("Clicked")} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  wrapperButton: {
    width: '100$'
  }
});