import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../apis/api';

export const useGetWalksQuery = (query: string) => {
  let url: string;
  if (query) {
    url = `${API.WALKS}/?name=${query}`;
  } else {
    url = API.WALKS;
  }

  const { status, data, error } = useQuery('walks', async () => {
    const { data } = await axios.get(url);
    return data;
  });
  if (status === 'loading') {
    return 'loading';
  }
  if (status === 'error') {
    return error;
  }
  if (status === 'success') {
    return data;
  }
};
