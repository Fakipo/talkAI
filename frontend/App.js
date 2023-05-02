import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';

import React from 'react';
import Login from './Login';
import AppNavigator from './AppNavigator';


// const Stack = createStackNavigator();

// function LoginStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />
//     </Stack.Navigator>
//   );
// }

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//     </Stack.Navigator>
//   );
// }

// function AppNavigator() {
//   const isLoggedIn = false; // set this to true if user is logged in
//   return (
//     <NavigationContainer>
//       {isLoggedIn ? <HomeStack /> : <LoginStack />}
//     </NavigationContainer>
//   );
// }

// export default AppNavigator;

export default function App() {
  return (
    // <Login /> 
    <AppNavigator />
    );
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello worldstat?</Text>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
