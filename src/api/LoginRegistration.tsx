import axios from 'axios';

const API_URL = 'https://reqres.in/api/login';

export const login = async (rollNo: Number, password: string) => {
  const response = await axios.post(
    'https://reqres.in/api/login',
    {
      rollNo,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
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
