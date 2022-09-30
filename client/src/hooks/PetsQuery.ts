import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useQuery, useMutation } from 'react-query';
import { API } from '../apis/api';
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
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/pets/post/image`, formData, {
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
