import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../apis/api';

export const useGetWalksQuery = (query: string) => {
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
      })
  );
};
