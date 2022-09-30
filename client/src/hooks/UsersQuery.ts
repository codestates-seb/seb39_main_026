import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
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
    await axios.patch(
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
    );
  });
};

export const useUpdateUserImgMutation = () => {
  return useMutation(
    async (body: {
      id: number;
      file: File;
      setImgSrc: Dispatch<SetStateAction<string | undefined>>;
    }) => {
      const { id, file, setImgSrc } = body;
      const uploadImg = file;
      const formData = new FormData();
      formData.append('imgFile', uploadImg);
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/members/image/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: localStorage.getItem('accessToken') || '',
              refresh_token: localStorage.getItem('refreshToken') || '',
            },
          }
        )
        .then(() => {
          setImgSrc(URL.createObjectURL(uploadImg));
        });
    }
  );
};

export const useDeleteUserMutation = () => {
  return useMutation(async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/members/${id}`, {
      headers: {
        authorization: localStorage.getItem('accessToken') || '',
        refresh_token: localStorage.getItem('refreshToken') || '',
      },
    });
  });
};
