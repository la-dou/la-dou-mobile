import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000';

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
