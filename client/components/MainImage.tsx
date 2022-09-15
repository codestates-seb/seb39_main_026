import { css } from '@emotion/react';

export default function MainImage() {
  const img = css`
    width: 100%;
    background-color: #dc602a;
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
  return (
    <section css={img}>
      <div className="text">
        <h2 className="image_title">산책 전, 이것만은 지켜주세요!</h2>
        <h3 className="image_subtitle">슬기로운 산책을 위한 5가지 약속</h3>
      </div>
    </section>
  );
}
