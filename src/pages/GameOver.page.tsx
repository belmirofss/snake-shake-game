import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../components/Button.component';
import { COLORS } from '../theme/Colors.constant';
import { FONTS } from '../theme/Fonts.constant';

export default function GameOverPage() {

    const navigation = useNavigation();
    
    const tryAgainClick = () => navigation.navigate('GamePage' as never);

    return (
        <View style={styles.container}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
            <View style={styles.wrapperButton}>
                <ButtonComponent
                    text="TRY AGAIN"
                    onPress={tryAgainClick} 
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
    gameOverText: {
        fontSize: 90,
        fontFamily: FONTS.REGULAR,
        color: COLORS.TERTIARY,
        textAlign: 'center',
        lineHeight: 75,
        marginTop: 28
    },
    wrapperButton: {
      width: '100%'
    }
});