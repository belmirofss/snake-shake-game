import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BoardComponent from '../components/Board.component';
import ScoreComponent from '../components/Score.component';

export default function GamePage() {

    const [score, setScore] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.centerContent}>
                <ScoreComponent score={score} />
            </View>

            <BoardComponent onScoreChanges={score => setScore(score)} />

            <View style={styles.centerContent}>
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
    }
});