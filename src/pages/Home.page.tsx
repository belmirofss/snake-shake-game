import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ButtonComponent from '../components/Button.component';
import LOGO from '../images/logo.png';
import { FONTS } from '../theme/Fonts.constant';


export default function HomePage() {

  const navigation = useNavigation();

  const startGameclick = () => navigation.navigate('GamePage');

  return (
    <View style={styles.container}>
      <View style={styles.wrapperUpperContent}>
        <AutoHeightImage
          source={LOGO}
          width={264} 
        />

        <Text style={styles.messageText}>
          Play the classic snake game in a different way. Use your smartphone sensors to move the snake. Shake your smartphone!
        </Text>
      </View>

      <View style={styles.wrapperButton}>
        <ButtonComponent
          text="START"
          onPress={startGameclick} 
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
    fontSize: 20,
    textAlign: 'center',
    fontFamily: FONTS.REGULAR
  },
  wrapperButton: {
    width: '100%'
  }
});