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
import {
    Mutation
} from 'react-apollo';
import LoginMutation from '../Mutations/LoginMutation';
import AsyncStorage from '@react-native-community/async-storage';

class LoginWindow extends Component {

    handleEmail = (email) => {
        this.props.store.setEmail(email)
    }

    handlePassword = (password) => {
        this.props.store.setPassword(password)
    }

    onPress = (login) => {

        const {
            navigate
        } = this.props.navigation

        login().then((res) => {
            AsyncStorage.setItem('token', res.data.login.token)
        }).then(() => {
            navigate('ChatScreen')
        })
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
                <Mutation
                    variables={{
                        email,
                        password
                    }}
                    mutation={LoginMutation}
                >
                    {mutate => {
                        return (
                            <ButtonComponent
                                title={'Login'}
                                onPress={() => this.onPress(mutate)}
                            />
                        )
                    }}

                </Mutation>
            </View>
        )
    }
}

const LoginScreen = inject("store")(observer(LoginWindow));
export {LoginScreen};