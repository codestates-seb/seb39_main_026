import { css, keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Theme } from '../styles/Theme';
import CommonButton from './CommonButton';

const modalContainer = (isModalOpen: boolean) => css`
  &.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.modal-wrapper section.modal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 250px;
    width: 100%;
    max-width: 350px;
    border-radius: 20px;
    padding: 40px;
    margin: 10px;
    background-color: #fff;
    z-index: 1;
    word-break: keep-all;
  }

  section.modal {
    display: ${isModalOpen ? 'block' : 'none'};
    animation: ${isModalOpen ? fadeIn : fadeOut} 0.4s ease-out;
  }

  section.modal {
    h1 {
      color: ${Theme.mainColor};
      font-size: 1.3rem;
      margin-bottom: 20px;

      @media screen and (max-width: 324px) {
        font-size: 1.2rem;
      }
    }

    h1 + div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      word-break: keep-all;
      gap: 10px;

      @media screen and (max-width: 400px) {
        grid-template-columns: 1fr;
      }
    }
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

export default function LoginOfferModal({
  isLoginOfferModalOpen,
  setIsLoginOfferModalOpen,
}: {
  isLoginOfferModalOpen: boolean;
  setIsLoginOfferModalOpen: (isLoginOfferModalOpen: boolean) => void;
}) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="modal-wrapper"
      css={modalContainer(isLoginOfferModalOpen)}
      onClick={() => setIsLoginOfferModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <h1>로그인이 필요해요!</h1>
        <div>
          <CommonButton
            type="button"
            padding="14px 0"
            fontSize="0.9rem"
            borderRadius="13px"
            onClick={() => router.push('/login')}
          >
            로그인 하러 가기
          </CommonButton>
          <CommonButton
            type="button"
            padding="14px 0px"
            fontSize="0.9rem"
            onClick={() => setIsLoginOfferModalOpen(false)}
            borderRadius="13px"
            buttonColor={`${Theme.disableColor}`}
          >
            닫기
          </CommonButton>
        </div>
      </section>
    </div>
  );
}
