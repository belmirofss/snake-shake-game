import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/Home.page';
import GamePage from '../pages/Game.page';

export default function Routes() {

    const StackNavigator = createStackNavigator();

    return (
        <NavigationContainer>
            <StackNavigator.Navigator 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#fff',
                        padding: 24
                    },
                    headerShown: false
                }}
                initialRouteName="HomePage"
            >
                <StackNavigator.Screen 
                    name="HomePage" 
                    component={HomePage}
                />

                <StackNavigator.Screen 
                    name="GamePage" 
                    component={GamePage}
                />
            </StackNavigator.Navigator>
        </NavigationContainer>
    );
}