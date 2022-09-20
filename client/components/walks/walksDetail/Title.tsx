/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { WalkDetail } from '../../../models/WalkDefault';
import { Theme } from '../../../styles/Theme';
import MoimState from '../../MoimState';
import LoadingTitle from '../skeleton/walksDetail/LoadingTitle';

const titleContainer = css`
  border-bottom: 1px solid ${Theme.divisionLineColor};

  h1 {
    font-size: 1.6rem;
    letter-spacing: 0.4px;
  }
`;

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

export default function Title({ walksData }: { walksData: WalkDetail }) {
  function getMoimState() {
    // 참여자 < 모집인원 && 시간이 지나지 않음 -> 모집중
    if (
      walksData.participant < walksData.capacity &&
      new Date(walksData.time) > new Date()
    ) {
      return '모집중';
    }
    return '모집마감';
  }
  console.log(walksData);
  return (
    <article css={titleContainer}>
      {walksData == null ? (
        <LoadingTitle />
      ) : (
        <>
          <div
            css={css`
              display: flex;
              gap: 18px;
              align-items: center;
            `}
          >
            <MoimState status={getMoimState()}>{getMoimState()}</MoimState>
            <h1>{walksData.title}</h1>
          </div>
          <div css={postOwnerContainer}>
            <img
              src="/main_image.jpg"
              alt={`작성자 ${walksData.representMember}사진`}
            />
            {walksData.pets.map((pet) =>
              pet.username === walksData.representMember ? (
                <p key={pet.petName}>{pet.petName}</p>
              ) : null
            )}
            <p>{walksData.representMember}</p>
          </div>
        </>
      )}
    </article>
  );
}
