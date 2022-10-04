import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import TabTitle from '../components/TabTitle';
import LoginButton from '../components/login/LoginButton';
import LoginModal from '../components/login/LoginModal';
import PasswordModal from '../components/login/PasswordModal';

const signupButtonContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-direction: column;
  align-items: center;
  gap: 16px 0;
  max-width: 400px;
  padding: 0 20px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  word-break: keep-all;

  @media screen and (max-width: 768px) {
    max-width: 300px;
  }

  span svg {
    width: 20px;
    height: 20px;
  }

  button {
    cursor: pointer;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

const loginButton = (gridColumn: string) => css`
  grid-column: ${gridColumn};
  background-color: transparent;
  border: none;
  margin-top: 30px;
  color: #686868;
`;

export default function Login() {
  const handleGoogleLoginClick = (event: MouseEvent) => {
    event.preventDefault();
    console.log('Google login button clicked');
  };

  const handleKakaoLoginClick = (event: MouseEvent) => {
    event.preventDefault();
    console.log('Kakao login button clicked');
  };

  const handlePasswordButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    setIsPasswordModalOpen(!isPasswordModalOpen);
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <TabTitle prefix="로그인" />
      {isLoginModalOpen && (
        <LoginModal
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      )}
      {isPasswordModalOpen && (
        <PasswordModal
          isPasswordModalOpen={isPasswordModalOpen}
          setIsPasswordModalOpen={setIsPasswordModalOpen}
        />
      )}
      <section
        css={css`
          min-height: calc(100vh - 75px);
          position: relative;
        `}
      >
        <h1
          css={css`
            visibility: hidden;
          `}
        >
          로그인 페이지
        </h1>
        <form css={signupButtonContainer}>
          <LoginButton onClick={handleKakaoLoginClick} buttonColor="#FAE100">
            <span>
              <Icon icon="ri:kakao-talk-fill" />
            </span>
            카카오로 계속하기
          </LoginButton>
          <LoginButton onClick={handleGoogleLoginClick} buttonColor="#FDFFFD">
            <span>
              <Icon icon="akar-icons:google-fill" />
            </span>
            구글로 계속하기
          </LoginButton>
          <Link href="/signup">
            <a
              css={css`
                grid-column: 1/4;
              `}
            >
              <LoginButton buttonColor="#ECECEC">
                <span>
                  <Icon icon="ci:mail" />
                </span>
                이메일로 회원가입
              </LoginButton>
            </a>
          </Link>

          <button
            type="submit"
            css={loginButton('1/2')}
            onClick={(e) => {
              e.preventDefault();
              setIsLoginModalOpen(true);
            }}
          >
            이메일로 로그인
          </button>
          <button
            type="submit"
            onClick={handlePasswordButtonClick}
            css={loginButton('3/4')}
          >
            비밀번호 찾기
          </button>
        </form>
      </section>
    </>
  );
}
