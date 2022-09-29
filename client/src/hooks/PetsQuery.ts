import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';

export const useUpdatePetImgMutation = () => {
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
};
