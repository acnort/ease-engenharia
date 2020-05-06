import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  const jwt = await AsyncStorage.getItem('JWT')

  return jwt
}
