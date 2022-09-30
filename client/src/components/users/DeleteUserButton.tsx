import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useDeleteUserMutation } from '../../hooks/UsersQuery';
import { LoginState } from '../../states/LoginState';
import UserState from '../../states/UserState';
import { Theme } from '../../styles/Theme';

export default function DeleteUserButton({ id }: { id: string }) {
  const { mutate: deleteUserMutate } = useDeleteUserMutation();
  const [, setIsLogin] = useRecoilState(LoginState);
  const [, setUserState] = useRecoilState(UserState);
  const router = useRouter();

  const handleDeleteUser = () => {
    deleteUserMutate(id, {
      onSuccess: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('currentAddress');
        setIsLogin(false);
        setUserState(null);
        router.push('/');
      },
    });
  };

  const deleteUser = css`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: ${Theme.divisionLineColor};
    position: relative;
    float: right;
    margin-top: 0.5rem;
  `;
  return (
    <button css={deleteUser} type="button" onClick={handleDeleteUser}>
      회원탈퇴
    </button>
  );
}
