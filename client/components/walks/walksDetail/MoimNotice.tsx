import { css } from '@emotion/react';
// import { skeletonGradient } from '../../../styles/GlobalStyle';

const contentContainer = css`
  padding: 36px 32px;

  p {
    min-height: 100px;
  }
`;
export default function MoimNotice() {
  return (
    <>
      <article css={contentContainer}>
        {/* <p
          css={css`
            border-radius: 10px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loading
        </p> */}
        <p>내용</p>
      </article>
    </>
  );
}
