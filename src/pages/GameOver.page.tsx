import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../components/Button.component';
import ScoreComponent from '../components/Score.component';
import { COLORS } from '../theme/Colors.constant';
import { FONTS } from '../theme/Fonts.constant';

type ParamList = {
    Score: {
        score: number;
    };
};

export default function GameOverPage() {

    const navigation = useNavigation();

    const route = useRoute<RouteProp<ParamList, 'Score'>>();
    const { score } = route.params;
    
    const tryAgainClick = () => navigation.navigate('GamePage');

    return (
        <View style={styles.container}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
            <View>
                <ScoreComponent score={score} />
            </View>
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