import { css } from '@emotion/react';
import { skeletonGradient } from '../../../../styles/GlobalStyle';

const infoContainer = css`
  position: sticky;
  top: 100px;
  right: 0;
  border-radius: 20px;
  overflow: hidden;
  word-break: break-all;
  width: 310px;

  .info-content {
    padding: 20px 30px;
    background-color: #f7f7f5;

    h2 {
      margin-bottom: 10px;
      font-size: 1.3rem;
      -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      color: transparent;
    }

    p {
      color: #969696;
      -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      color: transparent;
    }

    p:last-of-type {
      font-size: 1.3rem;
      margin: 18px 0 28px;
      animation: unset;
      color: transparent;
    }
  }
`;

export default function StickyInfo() {
  return (
    <div
      css={css`
        position: relative;
        height: 100%;
      `}
    >
      <aside css={infoContainer}>
        <div
          css={css`
            height: 200px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
          `}
        ></div>
        <div className="info-content">
          <h2>loading</h2>
          <p>loading</p>
          <p>몇 자리 남았을까요? 두근두근</p>
          <div
            css={css`
              border-radius: 20px;
              width: 250px;
              height: 67px;
              -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
              animation: ${skeletonGradient} 1.8s infinite ease-in-out;
              color: transparent;
            `}
          >
            loading
          </div>
        </div>
      </aside>
    </div>
  );
}
