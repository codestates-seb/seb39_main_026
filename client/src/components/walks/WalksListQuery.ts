import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../apis/api';

export function useGetWalksQuery() {
  const { status, data, error } = useQuery('walks', async () => {
    const { data } = await axios.get(API.WALKS);
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
}
