import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'http://10.0.2.2:8000';

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
