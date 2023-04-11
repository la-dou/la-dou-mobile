import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';
import {HTTPS_URL as API_URL} from '../utils/constants';

export const getUser = async (token: string) => {
  const config = {
    method: "get",
    url: `${API_URL}/me`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: "post",
    url: `${API_URL}/update-password`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    data: {
      old_password: oldPassword,
      new_password: newPassword,
    },
  };
  const response = await axios(config);
  return response.data;
}

export const updatePhone = async (oldPassword: string, phoneNumber: string) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: "post",
    url: `${API_URL}/update-phone`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    data: {
      old_password: oldPassword,
      phone_number: phoneNumber,
    },
  };
  const response = await axios(config);
  return response.data;
}