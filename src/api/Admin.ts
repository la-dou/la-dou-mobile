import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {HTTPS_URL as API_URL} from '../utils/constants';

export const adminGetUsers = async (search: string) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'get',
    url: `${API_URL}/admin/search?search=${search}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  // console.log(response.data);
  // console.log(typeof response.data);
  return response.data;
};

export const toggleDriver = async (rollNumber: Number) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'post',
    url: `${API_URL}/admin/toggle/driver?roll_no=${rollNumber}`,
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  // console.log(response.data);
  // console.log(typeof response.data);
  return response.data;
};

export const toggleCustomer = async (rollNumber: Number) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'post',
    url: `${API_URL}/admin/toggle/customer?roll_no=${rollNumber}`,
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  // console.log(response.data);
  // console.log(typeof response.data);
  return response.data;
};
