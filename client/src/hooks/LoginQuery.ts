import axios from 'axios';
import { API } from '../apis/api';
import { UserLogin } from '../models/UserLogin';

export default function useLogin() {
  const handleLogin = async ({ email, password }: UserLogin) => {
    const res = await axios.post(API.Login, {
      email,
      password,
    });
    return res;
  };

  return { handleLogin } as const;
}
