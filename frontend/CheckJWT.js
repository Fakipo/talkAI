import AsyncStorage from '@react-native-async-storage/async-storage';



export const userLoginCheck = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token == null) {
      return false;
    }
    const response = await fetch('http://192.168.29.144:5000/check_token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (json.message === 'Token is valid') {
      console.log('we are here token valid');
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};