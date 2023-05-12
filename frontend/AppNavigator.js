import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import Login from './Login';
import RegisterScreen from './RegisterScreen';

import React from 'react';
import CharacterSelection from './CharacterSelection';
import Answer from './Answer';

const Stack = createStackNavigator();
import { createNavigationContainerRef } from '@react-navigation/native';
import { userLoginCheck } from './CheckJWT';
// const navigationRef = createNavigationContainerRef();



function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="CharacterSelection" component={CharacterSelection} />
      <Stack.Screen name="Answer" component={Answer} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CharacterSelection" component={CharacterSelection} />
      <Stack.Screen name="Answer" component={Answer} />
    </Stack.Navigator>
  );
}

function AppNavigator() {

  return (
    <NavigationContainer>
        <LoginStack />
    </NavigationContainer>
  );
}

export default AppNavigator;