import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { LoginState } from '../../states/LoginState';
import UserState from '../../states/UserState';
import { Theme } from '../../styles/Theme';

export default function LogoutButton() {
  const [, setIsLogin] = useRecoilState(LoginState);
  const [, setUserState] = useRecoilState(UserState);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('currentAddress');
    setIsLogin(false);
    setUserState(null);
    router.push('/');
  };

  const logout = css`
    cursor: pointer;
    z-index: 0;
    background-color: transparent;
    border: 0;
    color: ${Theme.disableColor};
    position: relative;
    margin-top: 2rem;
    float: right;
  `;
  return (
    <button css={logout} type="button" onClick={handleLogout}>
      로그아웃
    </button>
  );
}
