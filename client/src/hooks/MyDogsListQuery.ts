import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../apis/api';

export function useMyDogsListQuery() {
  const { data, error } = useQuery('pets', async () => {
    const { data } = await axios.get(API.PICKPET);
    return data;
  });

  if (error != null) {
    throw error;
  }

  return data;
}
