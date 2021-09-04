import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/Colors.constant';
import { SHADOW } from '../theme/Shadow.constant';
import { DeviceMotion } from 'expo-sensors';
import { Subscription } from '@unimodules/react-native-adapter';
import { Board } from '../models/Board.model';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { Point } from '../models/Point.model';
import { useForceUpdate } from '../hooks/useForceUpdate.hook';
import { Snake } from '../models/Snake.model';

const SQUARE_SIZE = 24;
const GAME_SPEED = 100;

export default function BoardComponent() {

    const [board] = useState<Board>(new Board());
    const [subscriptionDeviceMotion, setSubscriptionDeviceMotion] = useState<Subscription | null>(null);

    const navigation = useNavigation();
    const forceUpdate = useForceUpdate();

    const updateSnakePosition = () => {
        const newHeadPosition = board.snake.getNewHeadPosition();
    
        if (board.isCollision(newHeadPosition) || board.snake.isSelfCollision(newHeadPosition)) {
            gameOver();
            return;
        }

        const lastTail = board.snake.getLastTail();

        if (lastTail) {
            board.rows[lastTail.y][lastTail.x] = false;
        }
        
        board.snake.parts.unshift(newHeadPosition);
        board.rows[newHeadPosition.y][newHeadPosition.x] = true;

        board.snake.direction = board.snake.direction;

        forceUpdate();
        setTimeout(() => updateSnakePosition(), GAME_SPEED);
    }

    const getBoardPieceColor = (point: Point): string => {    
        if (board.snake.isHead(point)) {
            return COLORS.PRIMARY;
        }

        if (board.snake.isPart(point)) {
            return COLORS.SECONDARY;
        }

        return COLORS.BOARD_BACKGROUND;
    }

    const gameOver = () => navigation.navigate('GameOverPage' as never);

    const listenDeviceMotion = () => {
        DeviceMotion.setUpdateInterval(250);

        setSubscriptionDeviceMotion(
          DeviceMotion.addListener(deviceMotionData => {
            const { gamma } = deviceMotionData.rotation;
            

            if (gamma > 1) {
                console.log("RIGHT", gamma);
            }

            if (gamma < -1) {
                console.log("LEFT", gamma)
            }
          })
        );
    };

    const removeListeningDeviceMotion = () => {
        subscriptionDeviceMotion && subscriptionDeviceMotion.remove();
        DeviceMotion.removeAllListeners();
        setSubscriptionDeviceMotion(null);
    };

    useFocusEffect(
        useCallback(() => {
            board.createNewGame();
            listenDeviceMotion();
            updateSnakePosition();

            return () => removeListeningDeviceMotion();
        }, [])
    );

    return (
        <View style={styles.board}>
            {
                board.rows.map((row, rowIndex) => (
                    <View 
                        key={`ROW_${rowIndex}`}
                        style={styles.row}>
                        {
                            row.map((_, pieceIndex) => <View 
                                key={`PIEACE_${pieceIndex}`}
                                style={{
                                    ... styles.boardPiece,
                                    backgroundColor: getBoardPieceColor(new Point(rowIndex, pieceIndex))
                                }}>
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
        borderColor: '#000',
        borderWidth: 0.75,
        width: Board.BOARD_SIZE * SQUARE_SIZE
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