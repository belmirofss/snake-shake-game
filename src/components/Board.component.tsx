import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/Colors.constant';
import { SHADOW } from '../theme/Shadow.constant';

const BOARD_SIZE = 15;
const SQUARE_SIZE = 24;

export default function BoardComponent() {

    const [board, setBoard] = useState<boolean[][]>([]);

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

    useEffect(() => {
        createBoard();
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
        width: BOARD_SIZE * SQUARE_SIZE,
        ... SHADOW.LEVEL_1
    },
    row: {
        height: SQUARE_SIZE,
        backgroundColor: COLORS.BOARD_BACKGROUND,
        flexDirection: 'row'
    },
    boardPiece: {
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        borderWidth: 1,
        borderColor: COLORS.SECONDARY
    }
});