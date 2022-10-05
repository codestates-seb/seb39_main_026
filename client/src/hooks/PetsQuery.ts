import axios from 'axios';
import Router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useQuery, useMutation } from 'react-query';
import { API } from '../apis/api';
import { MyPetsPost } from '../models/MyPets';
import { UserInfo } from '../models/UserInfo';

export function useMyDogsListQuery({ id }: { id: number }) {
  const { data, error } = useQuery('pets', async () => {
    const { data } = await axios.get<UserInfo>(`${API.USERS}/${id}`);
    return data;
  });

  if (error != null) {
    throw error;
  }

  return data;
}

export function usePostPetMutation() {
  return useMutation(
    async (body: {
      username: string;
      editedData: MyPetsPost;
      setIsPetEditMode: Dispatch<SetStateAction<boolean>>;
    }) => {
      const { username, editedData, setIsPetEditMode } = body;
      await axios
        .post(`${API.PETS}/post/?username=${username}`, editedData, {
          headers: {
            authorization: localStorage.getItem('accessToken') || '',
            refresh_token: localStorage.getItem('refreshToken') || '',
          },
        })
        .then(() => {
          setIsPetEditMode(false);
          Router.reload();
        });
    }
  );
}

export function useUpdatePetMutation() {
  return useMutation(
    async (body: {
      id: number;
      editedData: MyPetsPost;
      setIsPetEditMode: Dispatch<SetStateAction<boolean>>;
    }) => {
      const { id, editedData, setIsPetEditMode } = body;
      if (editedData.imgUrl === '') {
        delete editedData.imgUrl;
      }
      await axios
        .patch(`${API.PETS}/${id}`, editedData, {
          headers: {
            authorization: localStorage.getItem('accessToken') || '',
            refresh_token: localStorage.getItem('refreshToken') || '',
          },
        })
        .then(() => {
          setIsPetEditMode(false);
          Router.reload();
        });
    }
  );
}

export function useUpdatePetImgMutation() {
  return useMutation(
    async (body: {
      id: number;
      file: File;
      setImgSrc: Dispatch<SetStateAction<string>>;
      setPetImgUrl: Dispatch<SetStateAction<string>>;
    }) => {
      const { file, setImgSrc, setPetImgUrl } = body;
      const uploadImg = file;
      const formData = new FormData();
      formData.append('imgFile', uploadImg);
      await axios
        .post(`${API.PETS}/post/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: localStorage.getItem('accessToken') || '',
            refresh_token: localStorage.getItem('refreshToken') || '',
          },
        })
        .then((res) => {
          setImgSrc(URL.createObjectURL(uploadImg));
          setPetImgUrl(res.data);
        });
    }
  );
}

export function useDeletePetMutation() {
  return useMutation(
    async (body: {
      id: number;
      setIsPetEditMode: Dispatch<SetStateAction<boolean>>;
    }) => {
      const { id, setIsPetEditMode } = body;
      await axios
        .delete(`${API.PETS}/${id}`, {
          headers: {
            authorization: localStorage.getItem('accessToken') || '',
            refresh_token: localStorage.getItem('refreshToken') || '',
          },
        })
        .then(() => {
          setIsPetEditMode(false);
          Router.reload();
        });
    }
  );
}
