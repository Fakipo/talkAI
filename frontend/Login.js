import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';
import CharacterSelection from './CharacterSelection';
import RegisterScreen from './RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLoginCheck } from './CheckJWT';
import { NavigationActions } from 'react-navigation';





export default function Login() {

  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function checkUserLogin() {
      const result = await userLoginCheck();
      setIsLoggedIn(result);
    }
    checkUserLogin();
  }, []);
  
  useEffect(() => {
    if (isLoggedIn) {
      // Reset the navigation stack so the user can't go back to the login screen
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          { name: 'CharacterSelection' },
        ],
      });
      navigation.dispatch(resetAction);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {

    fetch('http://192.168.29.144:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      })
    }).then(response => 
      {
        console.log('status = ' +  response.status);
        if (response.status === 200){
          return response.json()
        }else{
          console.log('we are ');
          throw new Error('Wrong email Id or Password');
      }
      })
    .then(data => {
      const token = data.token;
      console.log(token);
      console.log('we are here?');
      console.log(data);
      alert('successfully logged in');
      AsyncStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      navigation.navigate('CharacterSelection');
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          { name: 'CharacterSelection' },
        ],
      });
      navigation.dispatch(resetAction);
    })
    .catch(error => {
      console.log(error);
      alert('Wrong email id or password');
    });
    // Your login logic here
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')} // use handleRegister instead of navigation.navigate
      >
        <Text style={styles.registerButtonText}>
          Don't have an account? Sign up here.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20,
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 10,
  },
  registerButtonText: {
      color: '#000',
      fontSize: 16,
    },
  });