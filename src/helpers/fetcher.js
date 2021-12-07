import AsyncStorage from "@react-native-async-storage/async-storage";
import Fetch from "node-fetch";
import env from '../helpers/env'

const { REACT_APP_API_URL } = env;

export const controller = new AbortController()

export const Fetcher = async (Body, url, method) => {

  const { signal } = controller
  const phone_number = await AsyncStorage.getItem("phone_number")
  
  const headers = {
    "phone_number":phone_number,
    "Accept": "application/json",
    "Content-Type": "application/json",
  }

  const response = await Fetch(REACT_APP_API_URL+url, {
    headers,
    method,
    signal,
    body:JSON.stringify(Body),
  })
  
  return response.json();
};