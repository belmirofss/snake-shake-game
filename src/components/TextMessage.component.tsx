import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONTS } from '../theme/Fonts.constant';

interface TextMessageComponentProps {
    children: ReactNode;
}

export default function TextMessageComponent(props: TextMessageComponentProps) {
    
    return (
        <Text style={styles.messageText}>
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
    messageText: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: FONTS.REGULAR
    }
});