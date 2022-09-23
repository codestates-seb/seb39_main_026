import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../../apis/api';
import { UserDefault } from '../../models/UserDefault';

export function useGetUsersQuery(userId: string) {
  const { status, data, error } = useQuery('users', async () => {
    const { data } = await axios.get(`${API.USERS}/${userId}`);
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

export function usePatchUserQuery(userId: string, body: UserDefault) {
  const { status, data, error } = useQuery('users', async () => {
    const { data } = await axios.patch(`${API.USERS}/${userId}`, body);
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

