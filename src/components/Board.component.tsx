import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/Colors.constant';
import { SHADOW } from '../theme/Shadow.constant';
import { Gyroscope } from 'expo-sensors';
import { Subscription } from '@unimodules/react-native-adapter';

const BOARD_SIZE = 15;
const SQUARE_SIZE = 24;

export default function BoardComponent() {

    const [board, setBoard] = useState<boolean[][]>([]);
    const [subscriptionGyroscope, setSubscriptionGyroscope] = useState<Subscription | null>(null);

    const createBoard = () => {
        const createdBoard: boolean[][] = [];

        for (let i = 0; i < BOARD_SIZE; i++) {
            createdBoard[i] = [];

            for (let j = 0; j < BOARD_SIZE; j++) {
                createdBoard[i][j] = false;
            } 
        }

        setBoard(createdBoard);
    };

    const listenGyroscope = () => {
        setSubscriptionGyroscope(
          Gyroscope.addListener(gyroscopeData => {
            console.log(gyroscopeData);
          })
        );
    };

    const removeListeningGyroscope = () => {
        subscriptionGyroscope && subscriptionGyroscope.remove();
        setSubscriptionGyroscope(null);
    };

    useEffect(() => {
        createBoard();
        listenGyroscope();
        Gyroscope.setUpdateInterval(500);
        return () => removeListeningGyroscope();
    }, []);

    return (
        <View style={styles.board}>
            {
                board.map((row, index) => (
                    <View 
                        key={`ROW_${index}`}
                        style={styles.row}>
                        {
                            row.map((boardPiece, index) => <View 
                                key={`BOARD_PIEACE_${index}`}
                                style={styles.boardPiece}>
                            </View>)
                        }
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    board: {
        ... SHADOW.LEVEL_1,
        backgroundColor: COLORS.BOARD_BACKGROUND,
        width: BOARD_SIZE * SQUARE_SIZE
    },
    row: {
        height: SQUARE_SIZE,
        flexDirection: 'row'
    },
    boardPiece: {
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        borderWidth: 0.75,
        borderColor: COLORS.SQUARE_DIVIDER
    }
});