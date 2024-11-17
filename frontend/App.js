import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './app/pages/Main';
import Register from './app/pages/Register';
import Login from './app/pages/Login';
import Update from './app/pages/Update';
import RegisterOTP from './app/pages/auth/RegisterOTP';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Update" component={Update} />
                <Stack.Screen name="RegisterOTP" component={RegisterOTP} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
