import React from 'react';
import { StyleSheet, View } from 'react-native';
import BoardComponent from '../components/Board.component';

export default function GamePage() {

    return (
        <View style={styles.container}>
            <BoardComponent />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
});