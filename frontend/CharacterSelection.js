import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Answer from './Answer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';
import { userLoginCheck } from './CheckJWT';

export default function CharacterSelection() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    navigation.navigate('Answer', { character: selectedOption });
  };

  const handleLogout = async () => {

    const token = await AsyncStorage.getItem('token');

    fetch('http://192.168.29.144:5000/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if (response.ok) {
      // remove token from AsyncStorage or wherever it's stored
      AsyncStorage.removeItem('token')
        .then(() => {
          // navigate to login screen or home screen
          alert('successfully logged out');
          navigation.navigate('Login');
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Login' },
            ],
          });
          navigation.dispatch(resetAction);
        })
        .catch(error => console.error(error))
    } else {
      console.error('Error logging out')
      navigation.navigate('Login');
    }
  })
  .catch(error => console.error(error))
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your character:</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={() => {
        handleLogout();
      }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === 'Naruto' && styles.selectedButton,
        ]}
        onPress={() => handleOptionSelect('Naruto')}
      >
        <Text style={styles.buttonText}>Naruto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === 'Spongebob' && styles.selectedButton,
        ]}
        onPress={() => handleOptionSelect('Spongebob')}
      >
        <Text style={styles.buttonText}>Spongebob</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === 'Mickey Mouse' && styles.selectedButton,
        ]}
        onPress={() => handleOptionSelect('Mickey Mouse')}
      >
        <Text style={styles.buttonText}>Mickey Mouse</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === 'Batman' && styles.selectedButton,
        ]}
        onPress={() => handleOptionSelect('Batman')}
      >
        <Text style={styles.buttonText}>Batman</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
        disabled={!selectedOption}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  nextButton: {
    width: 200,
    height: 40,
    backgroundColor: '#D0D3D4', // Change the color here
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});