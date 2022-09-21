import axios from 'axios';
import { useQuery } from 'react-query';

export function usePetInfoQuery(petId: string) {
  const { status, data, error } = useQuery('communityDetail', async () => {
    const { data } = await axios.get(`/member/pet/${petId}.json`);
    // const { data } = await axios.get(`/member/pet/${petId}`);
    return data;
  });

  if (status === 'loading') {
    return data;
  }

  if (status === 'error') {
    return error;
  }

  if (status === 'success') {
    return data;
  }
}
