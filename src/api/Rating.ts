import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000';

export const sendDriverRating = async (roll_no: Number, rating: Number) => {
  const config = {
    method: 'post',
    url: `${API_URL}/rate/driver`,
    data: {
      roll_no,
      rating,
    },
  };
  //console.log(config);
  const response = await axios(config);
  console.log(response);
  return response;
};
