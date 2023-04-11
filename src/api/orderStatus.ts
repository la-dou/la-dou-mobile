import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {HTTPS_URL as API_URL} from '../utils/constants';

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

export const updateOrderStatus = async (order_status: string) => {
    const token = await EncryptedStorage.getItem('token');
    const config = {
    method: 'post',
    url: `${API_URL}/driver/order/updatestatus/${order_status}/`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
    };
    const response = await axios(config);

    let status = response.data;

    return status;
}