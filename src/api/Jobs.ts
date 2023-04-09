import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'http://10.0.2.2:8000';

export const postJob = async (
  pickup: string,
  dropoff: string,
  deliveryPrice: string,
  cashToCollect: string,
  deliveryNotes: string,
) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'post',
    url: `${API_URL}/customer/order/create`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      deliver_to: dropoff,
      deliver_from: pickup,
      notes: deliveryNotes,
      delivery_price: Number(deliveryPrice),
      order_amount: Number(cashToCollect),
      placed_at: new Date(),
    },
  };
  const response = await axios(config);
  return response.data;
};

export const getJobs = async () => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'get',
    url: `${API_URL}/driver/order/viewall`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  return response.data;
};
