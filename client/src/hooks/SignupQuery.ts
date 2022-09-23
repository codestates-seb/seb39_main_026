import axios from 'axios';
import { API } from '../apis/api';
import { UserSignup } from '../models/UserSignup';

export default function useSignup() {
  const handleSignup = async (data: UserSignup) => {
    const res = await axios.post(API.Signup, {
      ...data,
    });
    return res;
  };

  return { handleSignup } as const;
}
