const URL = 'https://frontend.tabling.co.kr';

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errData = await response.json();
      throw errData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
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
