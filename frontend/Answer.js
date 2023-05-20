import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';
import { userLoginCheck } from './CheckJWT';


export default function Answer (){

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    async function checkUserLogin() {
      const result = await userLoginCheck();
      setIsLoggedIn(result);
    }
    checkUserLogin();
  }, []);
  
  useEffect(() => {
    if (!isLoggedIn) {
      // Reset the navigation stack so the user can't go back to the login screen
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' },
        ],
      });
      navigation.dispatch(resetAction);
    }
  }, [isLoggedIn]);


  const route = useRoute();
  const { character } = route.params;

  console.log('our selected character is', character);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    console.log('we are here');
    fetch('http://192.168.29.144:5000/api_call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: `${inputText}`,
        character: `${character}`
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('we are here in the answer??')
      console.log(data);
      setOutputText(data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.characterLabel}>Selected Character:</Text>
      <Text style={styles.characterText}>{character}</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={handleInputChange}
        placeholder="Ask your question"
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.output}>{outputText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 60, // Increase the height
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontWeight: 'bold', // Make the text bold
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  output: {
    marginTop: 20,
    fontSize: 20,
  },
  characterLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  characterText: {
    fontSize: 30, // Increase the font size
    fontWeight: 'bold', // Make the text bold
    marginTop: 10, // Adjust the spacing above the input box
    paddingVertical: 10, // Increase the padding
    paddingHorizontal: 20, // Increase the padding
    marginBottom: 50, // Increase the marginBottom value
  },
});