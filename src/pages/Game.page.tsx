import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BoardComponent from '../components/Board.component';
import ScoreComponent from '../components/Score.component';
import { Ionicons } from '@expo/vector-icons'; 
import ProgressBarComponent from '../components/ProgressBar.component';
import { BETA_LIMIT } from '../constants/GameConfig.constants';

export default function GamePage() {

    const [score, setScore] = useState(0);
    const [beta, setBeta] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.centerContent}>
                <ScoreComponent score={score} />
            </View>

            <BoardComponent 
                onScoreChanges={score => setScore(score)}
                onBetaChanges={beta => setBeta(beta)} 
            />

            <View style={styles.centerContent}>
                <View style={styles.wrapperArrow}>
                    <Ionicons name="ios-arrow-forward" size={48} color="black" />
                    <ProgressBarComponent progress={beta > 0 ? beta/BETA_LIMIT : 0} />
                </View>

                <View style={styles.wrapperArrow}>
                    <Ionicons name="ios-arrow-back-outline" size={48} color="black" />
                    <ProgressBarComponent progress={beta < 0 ? beta/-BETA_LIMIT : 0} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    centerContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperArrow: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});