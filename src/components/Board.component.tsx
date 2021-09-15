import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import { BETA_LIMIT, BOARD_SIZE, BOARD_SQUARE_SIZE, GAME_SPEED } from '../constants/GameConfig.constants';

interface BoardComponentProps {
    onScoreChanges(score: number): void;
    onBetaChanges(beta: number): void;
}

export default function BoardComponent(props: BoardComponentProps) {

    let betaIsReseted = true;

    const [board] = useState<Board>(new Board());
    const [subscriptionDeviceMotion, setSubscriptionDeviceMotion] = useState<Subscription | null>(null);

    const navigation = useNavigation();
    const forceUpdate = useForceUpdate();

    const updateSnakePosition = () => {
        board.snake.currentDirection = board.snake.directionCommandTemp;
        const newHeadPosition = board.snake.getNewHeadPosition();
    
        if (board.isCollision(newHeadPosition) || board.snake.isSelfCollision(newHeadPosition)) {
            gameOver();
            return;
        } else if (board.fruitCollision(newHeadPosition)) {
            onFruitCollision();
        }

        const lastTail = board.snake.getAndRemoveLastTail();

        if (lastTail) {
            board.rows[lastTail.row][lastTail.column] = false;
        }
        
        board.snake.points.unshift(newHeadPosition);
        board.rows[newHeadPosition.row][newHeadPosition.column] = true;

        forceUpdate();
        setTimeout(() => updateSnakePosition(), GAME_SPEED);
    }

    const onFruitCollision = () => {
        board.score++;
        props.onScoreChanges(board.score);
        board.snake.eatFruit();
        board.spawnFruit();
    }

    const getBoardPieceColor = (point: BoardPoint): string => {    
        if (board.snake.isHead(point)) {
            return COLORS.PRIMARY;
        }

        if (board.snake.isBody(point)) {
            return COLORS.SECONDARY;
        }

        if (board.fruit.row === point.row && board.fruit.column === point.column) {
            return COLORS.TERTIARY;
        }

        return COLORS.BOARD_BACKGROUND;
    }

    const gameOver = () => navigation.navigate('GameOverPage', {
        score: board.score
    });

    const listenDeviceMotion = () => {
        DeviceMotion.setUpdateInterval(50);

        setSubscriptionDeviceMotion(
          DeviceMotion.addListener(deviceMotionData => {
              if (deviceMotionData.rotation) {
                handleRotationEvent(deviceMotionData.rotation);
              }
          })
        );
    };

    const handleRotationEvent = (rotationEvent: RotationEvent) => {
        const { beta } = rotationEvent;
        const isRight = beta >= BETA_LIMIT;
        const isLeft =  beta <= -BETA_LIMIT;

        props.onBetaChanges(beta);

        if (!betaIsReseted) {
            if (beta < BETA_LIMIT && beta > -BETA_LIMIT) {
                betaIsReseted = true;
            }
            return;
        }

        if (isLeft || isRight) {
            betaIsReseted = false;
        }

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
            props.onScoreChanges(board.score);
            listenDeviceMotion();
            board.spawnFruit();
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
        borderWidth: 0.75,
        borderColor: COLORS.SQUARE_DIVIDER
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