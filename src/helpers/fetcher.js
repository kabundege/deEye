import AsyncStorage from "@react-native-async-storage/async-storage";
import Fetch from "node-fetch";
import env from '../helpers/env'

const { REACT_APP_API_URL } = env;

export const controller = new AbortController()

export const Fetcher = async (Body, url, method) => {

  const { signal } = controller
  const ip = await AsyncStorage.getItem("user-ip")
  const token = await AsyncStorage.getItem("user-token")
  const country = await AsyncStorage.getItem("user-country")
  
  const headers = {
    ip,
    country,
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : '',
  }

  const response = await Fetch(REACT_APP_API_URL+url, {
    headers,
    method,
    signal,
    body:JSON.stringify(Body),
  })
  
  return response.json();
};