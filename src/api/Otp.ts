import axios from 'axios';
import {HTTPS_URL as API_URL} from '../utils/constants';

export const sendEmailOtp = async (roll_no: Number) => {
  const config = {
    method: 'post',
    url: `${API_URL}/otp/email/generate?roll_no=${roll_no}`,
  };
  console.log(config);
  const response = await axios(config);
  return response;
};

export const verifyEmailOtp = async (
  rollNo: Number,
  otp: Number,
) => {
  const config = {
    method: 'post',
    url: `${API_URL}/otp/email/verify`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      roll_no: rollNo,
      otp,
    },
  };
  const response = await axios(config);
  return response;
};
