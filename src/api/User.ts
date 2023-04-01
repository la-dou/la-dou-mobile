import axios from "axios";

const API_URL = 'http://10.0.2.2:8000';

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