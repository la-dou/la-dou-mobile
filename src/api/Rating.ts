import axios from 'axios';
import {HTTPS_URL as API_URL} from '../utils/constants';

export const sendDriverRating = async (roll_no: Number, rating: Number) => {
  const config = {
    method: 'post',
    url: `${API_URL}/rating/rate/driver?roll_no=${roll_no}&rating=${rating}`,
    data: {
      roll_no,
      rating,
    },
  };
  const response = await axios(config);
  return response;
};
