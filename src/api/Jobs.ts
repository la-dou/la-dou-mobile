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

export const postBid = async (jobId: string, bidAmount: Number) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'post',
    url: `${API_URL}/driver/order/bid?order_id=${jobId}&amount=${bidAmount}`,
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}

export const getBids = async () => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'get',
    url: `${API_URL}/customer/order/viewbids`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}

export const acceptBid = async (driver_roll_no: Number) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'post',
    url: `${API_URL}/customer/order/acceptbid?driver_roll_no=${driver_roll_no}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}

export const getOrderHistory = async () => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'get',
    url: `${API_URL}/customer/order/getAllOrders`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}