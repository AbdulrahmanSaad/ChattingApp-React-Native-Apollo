import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    AsyncStorage
} from 'react-native';
import {
    TextInputComponent,
    ButtonComponent
} from '../components/Index'
import { inject, observer } from "mobx-react";

import Echo from "laravel-echo"
import Pusher from 'pusher-js/react-native';

class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.props.store.getMessages()
    }

    componentDidMount() {
        let token = this.props.store.token
        const socketConfig = {
            key: '685f9cd237d05a1944b8',
            cluster: 'eu',
            encrypted: true,
            authEndpoint: 'http://192.168.1.9:8000/api/broadcasting/auth',
            auth: {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            },
            broadcaster: 'pusher',
        }

        const client = new Pusher('685f9cd237d05a1944b8', socketConfig)

        let echo = new Echo({ ...socketConfig, client });
        echo
            .private('chat')
            .listen('MessageSent', ev => {
                this.props.store.addMessage(ev.message)
            });
    }

    onChange = (message) => {
        this.props.store.setMessage(message);
    }

    onPress = () => {
        this.props.store.sendMessage()
    }

    render() {

        const {
            messages,
            messageText
        } = this.props.store
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <View>
                    <FlatList
                        data={messages ? messages : null}
                        renderItem={
                            ({ item }) => {
                                return (
                                    <Text
                                        style={{
                                            width: 300,
                                            marginVertical: 20
                                        }}
                                    >
                                        {item.message}
                                    </Text>
                                )
                            }
                        }
                        style={{
                            height: 400,
                            position: 'absolute',
                            alignSelf: 'center',
                            bottom: 20
                        }}
                        keyExtractor={item => item.id}
                        inverted
                    />
                </View>
                <TextInputComponent
                    onChange={this.onChange}
                    style={{
                        width: '100%',
                        height: 30,
                        marginTop: 10
                    }}
                    value={messageText}
                    placeholder={'Message'}
                />
                <ButtonComponent
                    title={'Send'}
                    onPress={this.onPress}
                />
            </View>
        )
    }
}

const ChatScreen = inject("store")(observer(ChatWindow));

export { ChatScreen };