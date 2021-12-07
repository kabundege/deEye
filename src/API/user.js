import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fetcher } from '../helpers/fetcher'

export const Login = async (creds) => {
    return await Fetcher(
        creds,
        '/login',
        "POST"
      );
}

//
export const SignUp = async (creds) => {
  return await Fetcher(
      creds,
      '/signup',
      "POST"
    );
}

//
export const ForgotPassword = async (body) => {
  return await Fetcher(
      body,
      '/forgot',
      "POST"
    );
}

//
export const getUserInfo = async () => {
  const phone_number = await AsyncStorage.getItem("phone_number")
  return await Fetcher(
      { phone_number },
      '/getInfo',
      "POST"
    );
}


//
export const sendNotification = async (body) => {
  return await Fetcher(
      body,
      '/sms',
      "POST"
    );
}