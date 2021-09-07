import React from 'react';
import * as Progress from 'react-native-progress';

interface ProgressBarComponentProps {
    progress: number;
} 

export default function ProgressBarComponent(props: ProgressBarComponentProps) {

    return (
        <Progress.Bar 
            progress={props.progress} 
            height={18}
            borderColor="#000"
            color="#000"
            borderRadius={0}
        />
    );
}