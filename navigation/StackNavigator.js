import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../pages/MainPage';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#091B31",
                    borderBottomColor: "#091B31",
                    shadowColor: "#091B31",
                    height: 100,
                },
                headerTintColor: "#FFFFFF",
                headerBackTitleVisible: true,
            }}>
            <Stack.Screen name="What's Today?" component={MainPage} />
        </Stack.Navigator>
    )
}

export default StackNavigator;