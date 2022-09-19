import axios from 'axios';
import { useQuery } from 'react-query';

export function useMyPetsListQuery() {
  const { status, data, error } = useQuery('pets', async () => {
    const { data } = await axios.get('/data/members/pets.json');
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
