import axios from 'axios';
import { API } from '../apis/api';
import { UserSingup } from '../models/UserSingup';

export default function useSignup() {
  const handleSignup = async (data: UserSingup) => {
    const res = await axios.post(API.Signup, {
      ...data,
    });
    return res;
  };

  return { handleSignup } as const;
}
