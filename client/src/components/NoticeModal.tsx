/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, keyframes } from '@emotion/react';
import { Dispatch, useEffect, SetStateAction } from 'react';
import { Theme } from '../styles/Theme';
import CommonButton from './CommonButton';

export default function NoticeModal({
  isNoticeModalOpen,
  setIsNoticeModalOpen,
}: {
  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="modal-wrapper"
      css={modalContainer(isNoticeModalOpen)}
      onClick={() => setIsNoticeModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <p>
          ❌ 민감한 개인 정보는 KEEP
          <br />
          <span>
            자세한 거주지, 직업 등 산책에 필요하지 않은 정보는 안전을 위해
            보호해주세요.
          </span>
          🐶 모임 주제는 반려견 중심으로 <br />
          <span>
            견주의 관심사나 취미가 아닌 반려견 성향 기반의 모임을 지향합니다.
          </span>
          ✋ 참석 전 참가 신청 필수 <br />
          <span>
            모든 모임에는 정원이 있습니다. 모임장이 확인할 수 있도록 꼭 신청
            버튼을 눌러주세요.
          </span>
          🐕 산책 준비(리드, 배변봉투)는 철저히 <br />
          <span>
            우리 강아지가 편안하게 산책할 수 있도록 기본적인 산책 매너를
            지켜주세요.
          </span>
          👯‍♂️ 참석 전 다른 강아지 성향 체크
          <span>우리 강아지와 친구가 될 수 있을지 미리 확인해주세요. </span>
        </p>
        <CommonButton
          type="button"
          disabled={false}
          onClick={() => setIsNoticeModalOpen(!isNoticeModalOpen)}
          className="close"
        >
          닫기
        </CommonButton>
      </section>
    </div>
  );
}

const modalContainer = (isNoticeModalOpen: boolean) => css`
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
    p {
      font-weight: 500;
      color: ${Theme.mainColor};
      span {
        display: block;
        font-weight: 400;
        font-size: 0.8rem;
        margin: 0.5rem;
        color: black;
      }
    }
    button {
      margin-top: 1rem;
    }
  }

  &.modal-wrapper section.modal {
    height: 450px;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    padding: 50px 40px;
    background-color: #fff;
    overflow-y: scroll;
    z-index: 1;
  }

  section.modal {
    display: ${isNoticeModalOpen ? 'block' : 'none'};
    animation: ${isNoticeModalOpen ? fadeIn : fadeOut} 0.3s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
