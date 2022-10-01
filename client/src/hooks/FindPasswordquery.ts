import axios from 'axios';
import { useMutation } from 'react-query';

export const useFindPasswordMutation = () => {
  return useMutation(async (email: { email: string }) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/members/findpassword`,
      email
    );
  });
};
