import { useMutation } from 'react-query';

export const useUpdatePetImgMutation = () => {
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
            `${process.env.NEXT_PUBLIC_BASE_URL}/members/img/${id}`,
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
  