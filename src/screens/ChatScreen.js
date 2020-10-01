import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text
} from 'react-native';
import {
    TextInputComponent,
    ButtonComponent
} from '../components/Index'
import { inject, observer } from "mobx-react";

import {
    Query,
    Mutation
} from 'react-apollo';
import MessagesQuery from '../Query/MessagesQuery';
import MessageMutation from '../Mutations/MessageMutation';

class ChatWindow extends Component {

    renderItem = (data) => {
        return <FlatList
            data={data ? data.messages : null}
            renderItem={
                ({ item }) => {
                    return (
                        <Text
                            style={{
                                width: 300,
                                marginVertical: 20
                            }}
                        >
                            {item.text}
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
            keyExtractor={item => item._id}
            inverted
        />
    }

    onChange = (message) => {
        this.props.store.setMessage(message);
    }

    onPress = (sendMessage) => {
        sendMessage().then(this.props.store.setMessage(''))
    }

    render() {

        const {
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
                    <Query
                        query={MessagesQuery}
                    >
                        {({ data, loading }) => {
                            if (loading) <Text>Loading</Text>
                            return this.renderItem(data)
                        }}
                    </Query>
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
                <Mutation
                mutation={MessageMutation}
                variables={{
                    text: messageText
                }}
                >
                    {
                        mutate => {
                            return <ButtonComponent
                            title={'Send'}
                            onPress={() => this.onPress(mutate)}
                        />
                        }
                    }
                </Mutation>
            </View>
        )
    }
}

const ChatScreen = inject("store")(observer(ChatWindow));

export { ChatScreen };