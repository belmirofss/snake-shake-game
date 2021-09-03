import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ButtonComponent from '../components/Button.component';
import LOGO from '../images/logo.png';

export default function HomePage() {

  return (
    <View style={styles.container}>
      <View style={styles.wrapperUpperContent}>
        <AutoHeightImage
          source={LOGO}
          width={264} 
        />

        <Text style={styles.messageText}>
          Play the classic snake game in a different way. Use your smartphone0 sensors to move the snake. Shake your smartphone!
        </Text>
      </View>

      <View style={styles.wrapperButton}>
        <ButtonComponent
          text="START"
          onPress={() => console.log("Clicked")} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  wrapperUpperContent: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center'
  },
  wrapperButton: {
    width: '100%'
  }
});