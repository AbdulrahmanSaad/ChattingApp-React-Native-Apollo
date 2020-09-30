import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LoginScreen,
    ChatScreen
} from '../screens/Index'

const Stack = createStackNavigator();
const {
    Navigator,
    Screen
} = Stack

export default class StackNavigator extends Component {

    render() {
        return (
            <NavigationContainer>
                <Navigator>
                        <Screen
                            name="Login"
                            component={LoginScreen}
                        />
                        <Screen
                            name="ChatScreen"
                            component={ChatScreen} />
                </Navigator>
            </NavigationContainer>
        )
    }
}