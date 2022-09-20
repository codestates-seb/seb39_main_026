import { css } from '@emotion/react';
import { skeletonGradient } from '../../../../styles/GlobalStyle';

export default function LoadingComment() {
  return (
    <>
      <h2>
        댓글
        <span
          css={css`
            border-radius: 10px;
            margin-left: 4px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loading
        </span>
      </h2>
      <ul>
        <li>
          <div>
            <div
              css={css`
                width: 40px;
                height: 40px;
                border-radius: 50%;
                -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
                animation: ${skeletonGradient} 1.8s infinite ease-in-out;
                color: transparent;
              `}
            />
            <div>
              <p
                css={css`
                  width: 100px;
                  border-radius: 10px;
                  -webkit-animation: ${skeletonGradient} 1.8s infinite
                    ease-in-out;
                  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
                  color: transparent;
                `}
              >
                loading
              </p>
              <p
                css={css`
                  width: 300px;
                  border-radius: 10px;
                  -webkit-animation: ${skeletonGradient} 1.8s infinite
                    ease-in-out;
                  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
                  color: transparent;
                `}
              >
                loading
              </p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div
              css={css`
                width: 40px;
                height: 40px;
                border-radius: 50%;
                -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
                animation: ${skeletonGradient} 1.8s infinite ease-in-out;
                color: transparent;
              `}
            />
            <div>
              <p
                css={css`
                  width: 100px;
                  border-radius: 10px;
                  -webkit-animation: ${skeletonGradient} 1.8s infinite
                    ease-in-out;
                  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
                  color: transparent;
                `}
              >
                loading
              </p>
              <p
                css={css`
                  width: 300px;
                  border-radius: 10px;
                  -webkit-animation: ${skeletonGradient} 1.8s infinite
                    ease-in-out;
                  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
                  color: transparent;
                `}
              >
                loading
              </p>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
