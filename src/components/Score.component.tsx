import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONTS } from '../theme/Fonts.constant';

interface ScoreComponentProps {
    score: number;
}

export default function ScoreComponent(props: ScoreComponentProps) {

    return (
        <React.Fragment>
            <Text style={styles.scoreText}>
                FRUITS
            </Text>
            <Text style={styles.scorePoints}>
                {props.score}
            </Text>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    scoreText: {
        textAlign: 'center',
        fontFamily: FONTS.REGULAR,
        color: '#000',
        fontSize: 36
    },
    scorePoints: {
        textAlign: 'center',
        fontFamily: FONTS.REGULAR,
        color: '#000',
        fontSize: 52
    }
});