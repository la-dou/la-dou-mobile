import axios from 'axios';
import {HTTPS_URL as API_URL} from '../utils/constants';

export const login = async (username: string, password: string) => {
  const config = {
    method: 'post',
    url: `${API_URL}/login`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      username,
      password,
    },
  };
  const response = await axios(config);
  return response.data;
};

export const register = async (
  rollNo: Number,
  password: string,
  name: string,
  gender: string,
  phoneNo: string,
) => {
  const config = {
    method: 'post',
    url: `${API_URL}/signup`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      roll_no: rollNo,
      password,
      name,
      gender,
      phone_number: phoneNo,
    },
  };
  const response = await axios(config);
  return response.data;
};

export const resetPassword = async (
  rollNo: Number,
  password: string,
  token: string,
) => {
  const config = {
    method: 'post',
    url: `${API_URL}/reset-password`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      roll_no: rollNo,
      password,
      verification_token: token,
    },
  };
  const response = await axios(config);
  return response.data;
};
