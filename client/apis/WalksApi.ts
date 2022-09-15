import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const API = {
  WALKS: `${BASE_URL}/communities`,
};

const Walks = {
  getAllWalks: async () => {
    try {
      const { data } = await axios.get(API.WALKS);
      return data;
    } catch (error) {
      return error;
    }
  },
};

export default { Walks };
