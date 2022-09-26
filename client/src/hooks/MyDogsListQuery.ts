import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../apis/api';
import { UserInfo } from '../models/UserInfo';

export function useMyDogsListQuery({ id }: { id: number }) {
  const { data, error } = useQuery('pets', async () => {
    const { data } = await axios.get<UserInfo>(`${API.USERS}/${id}`);
    return data;
  });

  if (error != null) {
    throw error;
  }

  return data;
}
