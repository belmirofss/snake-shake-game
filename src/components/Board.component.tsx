import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function BoardComponent() {

    const BOARD_SIZE = 18;

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
                            row.map((boardPiece, index) => {
                                <View 
                                    key={`BOARD_PIEACE_${index}`}
                                    style={styles.boardPiece}>
                                </View>
                            })
                        }
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    board: {
        backgroundColor: '#000',
        width: '100%'
    },
    row: {
        height: 26
    },
    boardPiece: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: 'gainsboro'   
    }
});