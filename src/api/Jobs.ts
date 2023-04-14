import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { HTTPS_URL as API_URL } from '../utils/constants';

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
    url: `${API_URL}/orders/customer/create`,
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
    url: `${API_URL}/orders/pending`,
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
    url: `${API_URL}/orders/bid?order_id=${jobId}&amount=${bidAmount}`,
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
};

export const getBids = async () => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'get',
    url: `${API_URL}/orders/inprogress/bids/view`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
};

export const acceptBid = async (driver_roll_no: Number) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'post',
    url: `${API_URL}/orders/inprogress/bid/accept?driver_roll_no=${driver_roll_no}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
};

export const getOrderHistory = async () => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'get',
    url: `${API_URL}/orders/customer/getAllOrders`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
};

export const getInProgressOrderStatus = async () => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'get',
    url: `${API_URL}/orders/inprogress`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}


export const updateInProgressOrderStatus = async (order_status: string) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'post',
    url: `${API_URL}/orders/inprogress/update?status=${order_status}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}

export const cancelInProgressOrder = async () => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'post',
    url: `${API_URL}/orders/inprogress/cancel`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}

export const getOrderStatus = async (order_id: string|null) => {
  const token = await EncryptedStorage.getItem('token');
  const config = {
    method: 'get',
    url: `${API_URL}/orders/status?id=${order_id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
}
