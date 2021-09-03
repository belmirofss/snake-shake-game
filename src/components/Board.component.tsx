import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/Colors.constant';
import { SHADOW } from '../theme/Shadow.constant';
import { DeviceMotion } from 'expo-sensors';
import { Subscription } from '@unimodules/react-native-adapter';
import { Board } from '../models/Board.model';
import { Direction } from '../enums/Directions.enum';

const SQUARE_SIZE = 24;

export default function BoardComponent() {

    const [board, setBoard] = useState<Board>(new Board());
    const [subscriptionDeviceMotion, setSubscriptionDeviceMotion] = useState<Subscription | null>(null);

    const setupGame = () => {
        listenDeviceMotion();
        DeviceMotion.setUpdateInterval(10000);
        // updateSnakePosition();
    }

    const getBoardPieceColor = (rowIndex: number, pieceIndex: number) => {    
        if (board.snake.isHead(rowIndex, pieceIndex)) {
            return COLORS.PRIMARY;
        }

        if (board.snake.isPart(rowIndex, pieceIndex)) {
            return COLORS.SECONDARY;
        }
    }

    const updateSnakePosition = () => {
        const newHeadPosition = getNewHeadPosition();

        const oldTail = board.snake.parts.pop();

        if (oldTail) {
            board.rows[oldTail.y][oldTail.x] = false;
        }
        
        board.snake.parts.unshift(newHeadPosition);
        board.rows[newHeadPosition.y][newHeadPosition.x] = true;

        board.snake.direction = board.snake.direction;

        setTimeout(() => {
            updateSnakePosition();
        }, 250);
    }

    const getNewHeadPosition = () => {
        const newHead = Object.assign({}, board.snake.parts[0]);

        if (board.snake.direction === Direction.LEFT) {
            newHead.x -= 1;
        } else if (board.snake.direction === Direction.RIGHT) {
            newHead.x += 1;
        } else if (board.snake.direction === Direction.UP) {
            newHead.y -= 1;
        } else if (board.snake.direction === Direction.DOWN) {
            newHead.y += 1;
        }

        return newHead;
    }

    const listenDeviceMotion = () => {
        setSubscriptionDeviceMotion(
          DeviceMotion.addListener(deviceMotionData => {
            console.log(deviceMotionData.rotation);
          })
        );
    };

    const removeListeningDeviceMotion = () => {
        subscriptionDeviceMotion && subscriptionDeviceMotion.remove();
        setSubscriptionDeviceMotion(null);
    };

    useEffect(() => {
        setupGame();
        return () => removeListeningDeviceMotion();
    }, []);

    return (
        <View style={styles.board}>
            {
                board.rows.map((row, rowIndex) => (
                    <View 
                        key={`ROW_${rowIndex}`}
                        style={styles.row}>
                        {
                            row.map((piece, pieceIndex) => <View 
                                key={`PIEACE_${pieceIndex}`}
                                style={{
                                    ... styles.boardPiece,
                                    backgroundColor: getBoardPieceColor(rowIndex, pieceIndex)
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