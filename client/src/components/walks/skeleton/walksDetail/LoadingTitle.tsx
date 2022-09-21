import { css } from '@emotion/react';
import { skeletonGradient } from '../../../../styles/GlobalStyle';

const postOwnerContainer = css`
  display: flex;
  align-items: center;
  margin: 25px 0 28px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 14px;
  }

  p {
    font-weight: 600;
    font-size: 0.88rem;
  }

  p + p {
    &::before {
      content: '·';
      margin: 0 5px;
    }
  }

  p:last-of-type {
    &::before {
      content: '|';
      margin: 0 5px;
    }
  }
`;

export default function LoadingTitle() {
  return (
    <div>
      <div
        css={css`
          display: flex;
          gap: 18px;
          align-items: center;
        `}
      >
        <h1
          css={css`
            border-radius: 10px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loadging... loadging...
        </h1>
      </div>
      <div css={postOwnerContainer}>
        <div
          css={css`
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 14px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
          `}
        />
        <p
          css={css`
            border-radius: 10px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loadging
        </p>
        <p
          css={css`
            border-radius: 10px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loadging
        </p>
      </div>
    </div>
  );
}
