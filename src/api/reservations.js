import mockData from '../../mockData.json';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.SERVER_URL;

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      const errData = await response.json();
      throw errData;
    }
  } catch (e) {
    return mockData;
  }
};

const api = {
  fetchReservations: async () => {
    try {
      const result = await request(`${URL}/v1/store/9533/reservations`);
      return result;
    } catch (e) {
      return e;
    }
  },
};

export default api;
