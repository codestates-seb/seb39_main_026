import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../apis/api';

export function useGetUsersQuery(id: string) {
  const { status, data, error } = useQuery('users', async () => {
    const { data } = await axios.get(`${API.USERS}/${id}`);
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
