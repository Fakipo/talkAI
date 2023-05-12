import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Answer from './Answer';

export default function CharacterSelection() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    navigation.navigate('Answer', { character: selectedOption });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your character:</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={() => {
        // Handle logout
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