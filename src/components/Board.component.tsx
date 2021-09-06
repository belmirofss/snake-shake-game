import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/Colors.constant';
import { SHADOW } from '../theme/Shadow.constant';
import { DeviceMotion } from 'expo-sensors';
import { Subscription } from '@unimodules/react-native-adapter';
import { Board } from '../models/Board.model';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { BoardPoint } from '../models/BoardPoint.model';
import { useForceUpdate } from '../hooks/useForceUpdate.hook';
import { RotationEvent } from '../interfaces/RotationEvent.interface';
import { Direction } from '../enums/Directions.enum';
import { BOARD_SIZE, BOARD_SQUARE_SIZE, GAME_SPEED } from '../constants/GameConfig.constants';

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
            board.rows[lastTail.row][lastTail.column] = false;
        }
        
        board.snake.points.unshift(newHeadPosition);
        board.rows[newHeadPosition.row][newHeadPosition.column] = true;

        board.snake.currentDirection = board.snake.directionCommandTemp;

        forceUpdate();
        setTimeout(() => updateSnakePosition(), GAME_SPEED);
    }

    const getBoardPieceColor = (point: BoardPoint): string => {    
        if (board.snake.isHead(point)) {
            return COLORS.PRIMARY;
        }

        if (board.snake.isBody(point)) {
            return COLORS.SECONDARY;
        }

        return COLORS.BOARD_BACKGROUND;
    }

    const gameOver = () => navigation.navigate('GameOverPage' as never);

    const listenDeviceMotion = () => {
        DeviceMotion.setUpdateInterval(25);

        setSubscriptionDeviceMotion(
          DeviceMotion.addListener(deviceMotionData => handleRotationEvent(deviceMotionData.rotation))
        );
    };

    const handleRotationEvent = (rotationEvent: RotationEvent) => {
        const { beta } = rotationEvent;
        console.log(beta);
        const isLeft = beta > 25;
        const isRight =  beta < -0.25;

        if (isLeft) {
            board.snake.newDirectionCommand(Direction.LEFT);
        } else if (isRight) {
            board.snake.newDirectionCommand(Direction.RIGHT);
        }
    }

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
                                    backgroundColor: getBoardPieceColor(new BoardPoint(rowIndex, pieceIndex))
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
        width: BOARD_SIZE * BOARD_SQUARE_SIZE
    },
    row: {
        height: BOARD_SQUARE_SIZE,
        flexDirection: 'row'
    },
    boardPiece: {
        width: BOARD_SQUARE_SIZE,
        height: BOARD_SQUARE_SIZE,
        borderWidth: 0.75,
        borderColor: COLORS.SQUARE_DIVIDER
    }
});