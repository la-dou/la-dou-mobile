import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000';

export const sendDriverRating = async (roll_no: Number, rating: Number) => {
  //console.log('Sending Driver Rating');
  const config = {
    method: 'post',
    url: `${API_URL}/rate/driver?roll_no=${roll_no}&rating=${rating}`,
  };
  //console.log(config);
  const response = await axios(config);
  return response;
};

export const sendCustomerRating = async (roll_no: Number, rating: Number) => {
  const config = {
    method: 'post',
    url: `${API_URL}/rate/customer?roll_no=${roll_no}&rating=${rating}`,
  };

  const response = await axios(config);
  return response;
};
