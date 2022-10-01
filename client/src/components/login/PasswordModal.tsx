/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, keyframes } from '@emotion/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFindPasswordMutation } from '../../hooks/FindPasswordquery';
import { Theme } from '../../styles/Theme';
import CommonButton from '../CommonButton';

export default function PasswordModal({
  isPasswordModalOpen,
  setIsPasswordModalOpen,
}: {
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const methods = useForm<{ email: string }>({
    mode: 'onChange',
  });
  const { mutate: findPasswordMutate } = useFindPasswordMutation();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = methods;

  const [responseErr, setResponseErr] = useState('');

  const onClickPassword = (value: { email: string }) => {
    findPasswordMutate(value, {
      onSuccess: () => setResponseErr('임시 비밀번호가 발급되었습니다.'),
      onError: (err: any) => {
        if (err.response.status === 404) {
          setResponseErr('존재하지 않는 이메일입니다.');
        }
      },
    });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <div
      className="modal-wrapper"
      css={modalContainer(isPasswordModalOpen)}
      onClick={() => setIsPasswordModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <form>
          <label htmlFor="user-email">
            <input
              id="user-email"
              type="text"
              placeholder="이메일을 입력해주세요"
              {...register('email', {
                onChange: () => setResponseErr(''),
                validate: {
                  empty: (v) =>
                    (v != null && v !== '') || '이메일을 입력해주세요.',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
          </label>
          <span className="error-area">
            {errors.email && <p>{errors.email.message}</p>}
            {responseErr}
          </span>
          <CommonButton
            type="button"
            disabled={!isValid}
            onClick={handleSubmit(onClickPassword)}
          >
            임시 비밀번호 발급
          </CommonButton>
        </form>
      </section>
    </div>
  );
}

const modalContainer = (isLoginModalOpen: boolean) => css`
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
    height: 300px;
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
    display: ${isLoginModalOpen ? 'block' : 'none'};
    animation: ${isLoginModalOpen ? fadeIn : fadeOut} 0.3s ease-out;
  }

  form label {
    padding: 20px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${Theme.mainColor};
    gap: 0px 10px;

    input {
      width: 100%;
      height: 100%;
      padding: 6px 10px;
      border: 0;
      border-bottom: 1px solid ${Theme.divisionLineColor};
      :focus {
        outline: none;
      }
    }

    @media screen and (max-width: 464px) {
      grid-template-columns: 1fr;
      gap: 10px 0px;
      padding: 10px 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .error-area {
    height: 10px;
    text-align: center;
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
    margin-bottom: 1.3rem;
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
