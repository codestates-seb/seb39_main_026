import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../apis/api';

export function useWalksDetailQuery(communityId: string) {
  const { status, data, error } = useQuery('communityDetail', async () => {
    const { data } = await axios.get(`${API.COMMUNITYDETAIL}/${communityId}`);
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
