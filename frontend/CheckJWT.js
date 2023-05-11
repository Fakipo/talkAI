import AsyncStorage from '@react-native-async-storage/async-storage';


export const userLoginCheck = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        const response = await fetch('http://192.168.29.144:5000/check_token', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (json.message === 'Token is valid') {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };