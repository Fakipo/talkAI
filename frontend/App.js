import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';

import React from 'react';
import Login from './Login';
import AppNavigator from './AppNavigator';



export default function App() {
  return (
    <AppNavigator />
    );
}
