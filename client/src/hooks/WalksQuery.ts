import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../apis/api';
import { WalkDetail } from '../models/WalkDefault';

export function useGetWalksQuery(query: string) {
  let url: string;

  if (query) {
    url = `${API.WALKS}${query}`;
  } else {
    url = API.WALKS;
  }

  return useQuery(
    'walks',
    async () =>
      await axios.get(url).then(async (res) => {
        return res.data.communityList;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function useWalksDetailQuery(communityId: string) {
  const { data, error } = useQuery('communityDetail', async () => {
    const { data } = await axios.get<WalkDetail>(`${API.WALKS}/${communityId}`);
    return data;
  });

  if (error != null) {
    throw error;
  }

  return data;
}
