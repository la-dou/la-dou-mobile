import axios from "axios"

const API_URL = 'http://10.0.2.2:8000';

export const addDeviceToken = async (authToken: string, token: string) => {
  const config = {
    method: 'post',
    url: `${API_URL}/fcm/add?token=${token}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };
  const response = await axios(config);
  return response;
}

export const removeDeviceToken = async (authToken: string, token: string) => {
  const config = {
    method: 'post',
    url: `${API_URL}/fcm/remove?token=${token}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };
  const response = await axios(config);
  return response;
}