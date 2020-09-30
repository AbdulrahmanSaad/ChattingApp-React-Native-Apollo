import React from 'react';
import 'react-native-gesture-handler';
import StackNavigator from './src/navigation/StackNavigator'
import {Provider} from 'mobx-react'
import Store from './src/store/Store'

export default function App() {
  return (
    <Provider store={Store}>
    <StackNavigator/>
    </Provider>
  )}