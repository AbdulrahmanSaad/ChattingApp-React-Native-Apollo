import React from 'react';
import 'react-native-gesture-handler';
import StackNavigator from './src/navigation/StackNavigator'
import { Provider } from 'mobx-react'
import Store from './src/store/Store'
import {
  ApolloProvider
} from 'react-apollo';
import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import AsyncStorage from '@react-native-community/async-storage';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token
  AsyncStorage.getItem('token').then((res) => {
    token = res
})
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://192.168.1.12:3003`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: 'http://192.168.1.12:3003',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider
      client={client}
    >
      <Provider store={Store}>
        <StackNavigator />
      </Provider>
    </ApolloProvider>
  )
}