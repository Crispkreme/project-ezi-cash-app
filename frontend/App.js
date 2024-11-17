import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './app/pages/Main';
import RegisterOTP from './app/pages/auth/RegisterOTP';
import OpenAccount from './app/pages/auth/OpenAccount';
import RegisterAccount from './app/pages/auth/RegisterAccount';
import "./globals.css";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="RegisterOTP" component={RegisterOTP} />
                <Stack.Screen name="OpenAccount" component={OpenAccount} />
                <Stack.Screen name="RegisterAccount" component={RegisterAccount} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
