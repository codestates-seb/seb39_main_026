import { css } from '@emotion/react';
import React from 'react';
import { WalkDetail } from '../../../models/WalkDefault';
import { skeletonGradient } from '../../../styles/GlobalStyle';

const contentContainer = css`
  padding: 36px 0;
  min-height: 200px;
  p:first-of-type {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;
export default function MoimNotice({
  walkDetail,
}: {
  walkDetail?: WalkDetail;
}) {
  if (walkDetail == null) {
    return (
      <article css={contentContainer}>
        <h1
          css={css`
            border-radius: 10px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loading
        </h1>
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

  if (walkDetail.notices == null) {
    return (
      <article
        css={css`
          padding: 36px 0;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 600;
        `}
      >
        <p>아직 공지사항이 없네요 😢</p>
      </article>
    );
  }

  return (
    <>
      <article css={contentContainer}>
        <p>{walkDetail.notices.title}</p>
        <p>{walkDetail.notices.body}</p>
      </article>
    </>
  );
}
