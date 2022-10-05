/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import React from 'react';
import { skeletonGradient } from '../../../../styles/GlobalStyle';

export default function ParticipantsInfo() {
  return (
    <>
      <h2>
        참여 중인 강아지{' '}
        <span
          css={css`
            border-radius: 10px;
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
          <div
            css={css`
              width: 40px;
              height: 40px;
              border-radius: 50%;
              -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
              animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            `}
          />
        </li>
        <li>
          <div
            css={css`
              width: 40px;
              height: 40px;
              border-radius: 50%;
              -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
              animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            `}
          />
        </li>
        <li>
          <div
            css={css`
              width: 40px;
              height: 40px;
              border-radius: 50%;
              -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
              animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            `}
          />
        </li>
      </ul>
    </>
  );
}
