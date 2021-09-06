import React from 'react';
import { StyleSheet, View } from 'react-native';
import BoardComponent from '../components/Board.component';
import ScoreComponent from '../components/Score.component';

export default function GamePage() {

    return (
        <View style={styles.container}>
            <View style={styles.centerContent}>
                <ScoreComponent score={15} />
            </View>

            <BoardComponent />

            <View style={styles.centerContent}>
                <ScoreComponent score={15} />
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