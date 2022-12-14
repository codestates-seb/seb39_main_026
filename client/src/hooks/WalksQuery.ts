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
  const { data, error } = useQuery(
    'communityDetail',
    async () => {
      const { data } = await axios.get<WalkDetail>(
        `${API.WALKS}/${communityId}`
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (error != null) {
    throw error;
  }

  return data;
}

export function useJoinWalksMoim() {
  const handleJoinWalksMoim = async (communityId: string, petId: number[]) => {
    const res = await axios.post(`${API.WALKS}/${communityId}`, [...petId], {
      headers: {
        authorization: localStorage.getItem('accessToken') || '',
        refresh_token: localStorage.getItem('refreshToken') || '',
      },
    });

    if (res.headers.authorization && res.headers.refresh_token) {
      localStorage.setItem('accessToken', res.headers.authorization);
      localStorage.setItem('refreshToken', res.headers.refresh_token);
    }
    return res;
  };
  return { handleJoinWalksMoim } as const;
}
