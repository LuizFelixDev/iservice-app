import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

let API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.31:8404';

if (__DEV__) {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    API_URL = `http://${ip}:8404`;
  }
}

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await SecureStore.getItemAsync('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('user_token');
      await SecureStore.deleteItemAsync('user_role');
    }
    return Promise.reject(error);
  }
);

export default api;