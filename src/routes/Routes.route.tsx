import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/Home.page';

export default function Routes() {

    const StackNavigator = createStackNavigator();

    return (
        <NavigationContainer>
            <StackNavigator.Navigator screenOptions={{
                cardStyle: {
                    backgroundColor: '#fff',
                    padding: 24
                }
            }}>
                <StackNavigator.Screen 
                    name="HomePage" 
                    component={HomePage}
                    options={{
                        headerShown: false
                    }}
                />
            </StackNavigator.Navigator>
        </NavigationContainer>
    );
}