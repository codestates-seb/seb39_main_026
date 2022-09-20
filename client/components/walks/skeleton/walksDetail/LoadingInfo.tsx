import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { skeletonGradient } from '../../../../styles/GlobalStyle';

export default function LoadingInfo() {
  return (
    <>
      <li>
        <span>
          <Icon icon="clarity:date-solid" />
        </span>
        일시
      </li>
      <li
        css={css`
          border-radius: 10px;
          -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
          animation: ${skeletonGradient} 1.8s infinite ease-in-out;
          color: transparent;
        `}
      >
        loading
      </li>
      <li>
        <span>
          <Icon icon="clarity:alarm-clock-solid" />
        </span>
        시간대
      </li>
      <li
        css={css`
          border-radius: 10px;
          -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
          animation: ${skeletonGradient} 1.8s infinite ease-in-out;
          color: transparent;
        `}
      >
        loading ~
      </li>
      <li>
        <span>
          <Icon icon="ic:baseline-place" width="1em" height="1em" />
        </span>
        장소
      </li>
      <li
        css={css`
          border-radius: 10px;
          -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
          animation: ${skeletonGradient} 1.8s infinite ease-in-out;
          color: transparent;
        `}
      >
        loading
      </li>
    </>
  );
}
