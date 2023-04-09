import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'http://10.0.2.2:8000';

export const getOrderStatus = async () => {
    const token = await EncryptedStorage.getItem('token');
    const config = {
    method: 'get',
    url: `${API_URL}/customer/order/getStatus/`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
    };
    const response = await axios(config);

    let status = response.data;

    return status;
}
