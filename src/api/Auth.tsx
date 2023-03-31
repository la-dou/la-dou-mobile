import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000';

export const login = async (username: string, password: string) => {
  const config = {
    method: "post",
    url: `${API_URL}/login`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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
  phoneNo: Number,
) => {
  const response = await axios.post(
    'https://reqres.in/api/register',
    {
      rollNo,
      password,
      name,
      gender,
      phoneNo,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export const resetPassword = async (rollNo: Number, password: string, token: string) => {
  const config = {
    method: 'post',
    url: `${API_URL}/reset-password`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      roll_no: rollNo,
      password,
      verification_token: token,
    },
  }
  const response = await axios(config);
  return response.data;
}