import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/Colors.constant';
import { FONTS } from '../theme/Fonts.constant';
import { SHADOW } from '../theme/Shadow.constant';

interface ButtonComponentProps {
    text: string;
    onPress(): void;
}

export default function ButtonComponent(props: ButtonComponentProps) {
    
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.PRIMARY,
        width: '100%',
        paddingVertical: 12,
        ... SHADOW.LEVEL_1
    },
    buttonText: {
        color: '#fff',
        fontSize: 28,
        textAlign: 'center',
        fontFamily: FONTS.REGULAR
    }
});