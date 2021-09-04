import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ButtonComponent from '../components/Button.component';
import TextMessageComponent from '../components/TextMessage.component';
import LOGO from '../images/logo.png';

export default function HomePage() {

  const navigation = useNavigation();

  const startGameclick = () => navigation.navigate('GamePage' as never);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperUpperContent}>
        <AutoHeightImage
          source={LOGO}
          width={228} 
        />

        <TextMessageComponent>
          Play the classic snake game in a different way. Use your smartphone sensors to move the snake. Shake your smartphone!
        </TextMessageComponent>
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
  wrapperButton: {
    width: '100%'
  }
});