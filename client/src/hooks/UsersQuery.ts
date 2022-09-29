import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { API } from '../apis/api';
import { UserDefault } from '../models/UserDefault';

export function useGetUsersQuery(id: string) {
  return useQuery(
    'users',
    async () =>
      await axios.get(`${API.USERS}/${id}`).then(async (res) => {
        return res.data;
      })
  );
}

export const useUpdateUsernameMutation = () => {
  return useMutation(async (body: UserDefault) => {
    const { id, username } = body;
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/members/${id}`,
        {
          username,
        },
        {
          headers: {
            authorization: localStorage.getItem('accessToken') || '',
            refresh_token: localStorage.getItem('refreshToken') || '',
          },
        }
      )
      .then((res) => console.log(res));
  });
};
