import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../apis/api';

export function useGetUsersQuery() {
  const { status, data, error } = useQuery('users', async () => {
    const { data } = await axios.get(`${API.USERS}`);
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
