import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { API } from '../apis/api';

export function useGetUsersQuery(id: string) {
  return useQuery(
    'users',
    async () =>
      await axios.get(`${API.USERS}/${id}`).then(async (res) => {
        return res.data;
      })
  );
}

export function useUpdateUsernameMutation() {
  return useMutation(
    async ({
      id,
      body,
      accessToken,
    }: {
      id: number;
      body: string;
      accessToken: string;
    }) => {
      await axios.patch(
        `${API.USERS}/${id}`,
        { username: body },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
    }
  );
}
