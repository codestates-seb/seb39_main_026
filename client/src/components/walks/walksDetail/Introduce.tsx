import { css } from '@emotion/react';
import { WalkDetail } from '../../../models/WalkDefault';
import { skeletonGradient } from '../../../styles/GlobalStyle';

const contentContainer = css`
  padding: 36px 0px;
  min-height: 200px;
`;
export default function Introduce({ walkDetail }: { walkDetail?: WalkDetail }) {
  if (walkDetail == null) {
    return (
      <article css={contentContainer}>
        <p
          css={css`
            border-radius: 10px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loading
        </p>
      </article>
    );
  }

  return (
    <article css={contentContainer}>
      <p>{walkDetail.body}</p>
    </article>
  );
}
