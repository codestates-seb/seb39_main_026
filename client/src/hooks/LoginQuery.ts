import axios from 'axios';
import { API } from '../apis/api';
import { UserInfo } from '../models/UserInfo';
import { UserLogin } from '../models/UserLogin';

export default function useLogin() {
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
