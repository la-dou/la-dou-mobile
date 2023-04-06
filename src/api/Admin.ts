import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000';

export const adminGetUsers = async (search: string) => {
  const config = {
    method: 'get',
    url: `${API_URL}/admin/search?search=${search}`,
  };
  const response = await axios(config);
  console.log(response.data);
  console.log(typeof response.data);
  return response.data;
};
