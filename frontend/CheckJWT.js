import AsyncStorage from '@react-native-async-storage/async-storage';



export const userLoginCheck = () => {
  return AsyncStorage.getItem('token')
    .then(token => {
      console.log(token);
      if (token == null) {
        return false;
      }
      return fetch('http://192.168.29.144:5000/check_token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then(response => response.json())
    .then(json => {
      if (json.message === 'Token is valid') {
        console.log('we are here token valid');
        return false;
      }
      return false;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};

// export const userLoginCheck = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       console.log(token);
//       if(token == null){
//         return false;
//       }
//       if (token !== null) {
//         const response = await fetch('http://192.168.29.144:5000/check_token', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const json = await response.json();
//         if (json.message === 'Token is valid') {
//           console.log(' we ar ehere token valid')
//           return false;
//         }
//       }
//       return false;
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   };