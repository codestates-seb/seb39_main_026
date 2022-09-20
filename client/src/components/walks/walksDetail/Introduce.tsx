import { css } from '@emotion/react';
import { WalkDetail } from '../../../models/WalkDefault';
import { skeletonGradient } from '../../../styles/GlobalStyle';

const contentContainer = css`
  padding: 36px 0px;

  p {
    min-height: 100px;
  }
`;
export default function Introduce({ walksData }: { walksData: WalkDetail }) {
  return (
    <>
      <article css={contentContainer}>
        {walksData == null ? (
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
        ) : (
          <p>{walksData.body}</p>
        )}
      </article>
    </>
  );
}
