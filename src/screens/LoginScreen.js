import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native'
import {
    TextInputComponent,
    ButtonComponent
} from '../components/Index';
import { inject, observer } from "mobx-react";

class LoginWindow extends Component {

    handleEmail = (email) => {
        this.props.store.setEmail(email)
    }

    handlePassword = (password) => {
        this.props.store.setPassword(password)
    }

    onPress = async() => {
        await this.props.store.login()
        this.props.navigation.navigate('ChatScreen')
    }

    render (){

        const {
            email,
            password
        } = this.props.store

        return (
            <View>
                <Text>
                    Login
                </Text>
                <TextInputComponent
                placeholder={'email'}
                onChange={this.handleEmail}
                vlaue={email}
                />
                <TextInputComponent
                placeholder={'password'}
                onChange={this.handlePassword}
                value={password}
                />
                <ButtonComponent
                title={'Login'}
                onPress={this.onPress}
                />
            </View>
        )
    }
}

const LoginScreen = inject("store")(observer(LoginWindow));
export {LoginScreen};