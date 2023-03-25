import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000';

export const sendEmailOtp = async (roll_no: string) => {
  const config = {
    method: "post",
    url: `${API_URL}/otp/email/generate?roll_no=${roll_no}`,
  };
  console.log(config)
  const response = await axios(config);
  return response;
}

export const verifyEmailOtp = async (rollNo: string, otp: string) => {
  const config = {
    method: "post",
    url: `${API_URL}/otp/email/verify`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      roll_no: rollNo,
      otp,
    },
  };
  const response = await axios(config);
  return response;
}