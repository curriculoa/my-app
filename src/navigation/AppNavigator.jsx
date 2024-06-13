import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import NewsScreen from '../screens/NewsScreen';
import RegistroScreen from '../screens/RegistroScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="RegistroScreen" component={RegistroScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="News" component={NewsScreen} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}