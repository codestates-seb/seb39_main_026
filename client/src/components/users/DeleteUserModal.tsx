/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import { Dispatch, useEffect, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { useDeleteUserMutation } from '../../hooks/UsersQuery';
import { LoginState } from '../../states/LoginState';
import UserState from '../../states/UserState';
import { Theme } from '../../styles/Theme';

import CommonButton from '../CommonButton';

export default function DeleteUserModal({
  isDeleteUserModalOpen,
  setIsDeleteUserModalOpen,
  id,
}: {
  isDeleteUserModalOpen: boolean;
  setIsDeleteUserModalOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}) {
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
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <div
      className="modal-wrapper"
      css={modalContainer(isDeleteUserModalOpen)}
      onClick={() => setIsDeleteUserModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <p>지금 탈퇴하면 모임 정보가 모두 사라져요! 🙀</p>
        <div className="buttons">
          <CommonButton
            type="button"
            disabled={false}
            onClick={() => setIsDeleteUserModalOpen(!isDeleteUserModalOpen)}
            className="close"
          >
            닫기
          </CommonButton>
          <CommonButton
            type="button"
            buttonColor={Theme.disableColor}
            disabled={false}
            onClick={handleDeleteUser}
            className="delete"
          >
            탈퇴하기
          </CommonButton>
        </div>
      </section>
    </div>
  );
}

const modalContainer = (isDeleteUserModalOpen: boolean) => css`
  &.modal-wrapper {
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    align-items: center;
  }

  &.modal-wrapper section.modal {
    height: 200px;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    padding: 50px 40px;
    background-color: #fff;
    overflow-y: scroll;
    z-index: 1;

    @media screen and (max-width: 305px) {
      font-size: 1.1rem;
      word-break: keep-all;
    }
  }

  section.modal {
    display: ${isDeleteUserModalOpen ? 'block' : 'none'};
    animation: ${isDeleteUserModalOpen ? fadeIn : fadeOut} 0.3s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .buttons {
    display: flex;
    width: 100%;
    margin-top: 1.5rem;
  }
  button.close {
  }
  button.delete {
    width: 50%;
    margin-left: 0.5rem;
  }
`;

const fadeIn = keyframes`
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0px);
  }
`;

const fadeOut = keyframes`
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(100%);
  }
`;
