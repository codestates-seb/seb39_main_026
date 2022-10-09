import { css } from '@emotion/react';
import { useState } from 'react';
import NoticeModal from './NoticeModal';

export default function MainImage() {
  const img = css`
    position: absolute;

    @media screen and (max-width: 768px) {
      top: 0px;
    }

    top: 75px;
    left: 0;
    right: 0;
    width: 100%;
    background-size: cover;
    background-position-y: 30%;
    background-image: url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80');
    height: 30vh;
    .text {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1.5rem;
      color: white;
      text-shadow: 0 4px 30px #00000040;
      .image_title {
        font-weight: 500;
      }
      .image_subtitle {
        font-weight: 300;
        font-size: 1rem;
      }
    }
  `;
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const handleNoticeClick = () => {
    setIsNoticeModalOpen(!isNoticeModalOpen);
  };
  return (
    <>
      <section css={img} onClick={handleNoticeClick}>
        <div className="text">
          <h1 className="image_title">산책 전, 이것만은 지켜주세요!</h1>
          <p className="image_subtitle">슬기로운 산책을 위한 5가지 약속</p>
        </div>
      </section>
      {isNoticeModalOpen && (
        <NoticeModal
          setIsNoticeModalOpen={setIsNoticeModalOpen}
          isNoticeModalOpen={isNoticeModalOpen}
        />
      )}
    </>
  );
}
