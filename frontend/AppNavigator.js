import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';

import React from 'react';
import Login from './Login';
import CharacterSelection from './CharacterSelection';
import Answer from './Answer';
const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterScreen} />
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
  const isLoggedIn = false; // set this to true if user is logged in
  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  );
}

export default AppNavigator;