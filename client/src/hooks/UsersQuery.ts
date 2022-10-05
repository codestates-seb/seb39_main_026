import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API } from '../apis/api';
import { UserDefault } from '../models/UserDefault';
import { UserInfo } from '../models/UserInfo';
import { UserLogin } from '../models/UserLogin';
import { UserSignup } from '../models/UserSignup';

export function useSignup() {
  const handleSignup = async (data: UserSignup) => {
    const res = await axios.post(API.SINGUP, {
      ...data,
    });
    return res;
  };

  return { handleSignup } as const;
}

export function useLogin() {
  const handleLogin = async ({ email, password }: UserLogin) => {
    const res = await axios.post<UserInfo>(API.LOGIN, {
      email,
      password,
    });

    localStorage.setItem('accessToken', res.headers.authorization);
    localStorage.setItem('refreshToken', res.headers.refresh_token);

    return res.data;
  };

  return { handleLogin } as const;
}

export function useGetUsersQuery(id: string) {
  return useQuery(
    'users',
    async () =>
      await axios.get(`${API.USERS}/${id}`).then(async (res) => {
        return res.data;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function useUpdateUsernameMutation() {
  return useMutation(async (body: UserDefault) => {
    const { id, username } = body;
    await axios.patch(
      `${API.USERS}/${id}`,
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
}

export function useUpdateUserImgMutation() {
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
        .patch(`${API.USERS}/image/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: localStorage.getItem('accessToken') || '',
            refresh_token: localStorage.getItem('refreshToken') || '',
          },
        })
        .then(() => {
          setImgSrc(URL.createObjectURL(uploadImg));
        });
    }
  );
}

export const useFindPasswordMutation = () => {
  return useMutation(async (email: { email: string }) => {
    await axios.post(`${API.USERS}/findpassword`, email);
  });
};

export function useDeleteUserMutation() {
  return useMutation(async (id: string) => {
    await axios.delete(`${API.USERS}/${id}`, {
      headers: {
        authorization: localStorage.getItem('accessToken') || '',
        refresh_token: localStorage.getItem('refreshToken') || '',
      },
    });
  });
}
