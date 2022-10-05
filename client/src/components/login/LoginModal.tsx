import { css, keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLogin } from '../../hooks/UsersQuery';
import { UserLogin } from '../../models/UserLogin';
import { LoginState } from '../../states/LoginState';
import UserState from '../../states/UserState';
import { Theme } from '../../styles/Theme';
import CommonButton from '../CommonButton';

export default function LoginModal({
  isLoginModalOpen,
  setIsLoginModalOpen,
}: {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleLogin } = useLogin();
  const methods = useForm<UserLogin>({
    mode: 'onChange',
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
    reset,
  } = methods;

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const setUser = useSetRecoilState(UserState);

  const onClickLogin = async (value: UserLogin) => {
    try {
      const user = await handleLogin(value);

      setUser(user);
      localStorage.setItem(
        'currentAddress',
        `${user.address.si} ${user.address.gu} ${user.address.dong}`
      );

      setIsLoggedIn(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.status === 401) {
        reset();
        // backend 에서 메세지를 잘 내려주면 아래 처럼 그걸 출력하고
        // alert(error.response.data.error);
        // 아니면 아래처럼 한다.
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        return;
      }
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (document.referrer && document.referrer.indexOf('/') !== -1) {
        history.back(); // 뒤로가기
      } else {
        router.replace('/'); // 메인페이지로
      }
    }
  }, [isLoggedIn, router]);

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
      css={modalContainer(isLoginModalOpen)}
      onClick={() => setIsLoginModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <form>
          <dl>
            <label htmlFor="user-email">
              <dt>이메일</dt>
              <dd>
                <input
                  id="user-email"
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  {...register('email', {
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
              </dd>
            </label>

            <dd className="error-area">
              {errors.email && <p>{errors.email.message}</p>}
            </dd>

            <label htmlFor="user-password">
              <dt>비밀번호</dt>
              <dd>
                <input
                  id="user-password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  {...register('password', {
                    validate: {
                      empty: (v) =>
                        (v != null && v !== '') || '비밀번호를 입력해주세요.',
                    },
                  })}
                />
              </dd>
            </label>

            <dd className="error-area">
              {errors.password && <p>{errors.password.message}</p>}
            </dd>
          </dl>
          <CommonButton
            type="button"
            onClick={handleSubmit(onClickLogin)}
            disabled={!isValid}
          >
            로그인
          </CommonButton>
        </form>
      </section>
    </div>
  );
}

const modalContainer = (isLoginModalOpen: boolean) => css`
  &.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.modal-wrapper section.modal {
    height: 400px;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    padding: 50px 40px;
    background-color: #fff;
    overflow-y: scroll;
    z-index: 1;
    margin: 0 20px;

    @media screen and (max-width: 305px) {
      font-size: 1.1rem;
      word-break: keep-all;
    }
  }

  section.modal {
    display: ${isLoginModalOpen ? 'block' : 'none'};
    animation: ${isLoginModalOpen ? fadeIn : fadeOut} 0.3s ease-out;
  }

  section.modal {
    h1 {
      color: ${Theme.mainColor};
      font-size: 1.5rem;
      margin-bottom: 40px;

      @media screen and (max-width: 324px) {
        font-size: 1.2rem;
        margin-bottom: 10px;
      }
    }

    ul {
      list-style: none;
    }
  }

  form dl label {
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;
    padding: 20px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${Theme.mainColor};
    gap: 0px 10px;

    input {
      width: 100%;
      height: 100%;
      padding: 6px 10px;
      border: none;
      border-bottom: 1px solid ${Theme.divisionLineColor};
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
    justify-content: space-between;
    height: 100%;
  }

  dd.error-area {
    height: 20px;
    text-align: center;
    color: ${Theme.errorMessagesColor};
    font-size: 0.9rem;
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
