import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { WalkDetail } from '../../../models/WalkDefault';
import { Theme } from '../../../styles/Theme';
import MoimStateButton from '../../MoimStateButton';
import LoadingTitle from '../skeleton/walksDetail/LoadingTitle';

const titleContainer = css`
  border-bottom: 1px solid ${Theme.divisionLineColor};

  div.moim-title {
    display: flex;
    gap: 18px;
    align-items: center;

    @media screen and (max-width: 400px) {
      gap: 10px;
    }
  }

  h1 {
    font-size: 1.6rem;
    letter-spacing: 0.4px;

    @media screen and (max-width: 525px) {
      font-size: 1.3rem;
    }

    @media screen and (max-width: 324px) {
      font-size: 1rem;
    }
  }

  .moim-state-button {
    @media screen and (max-width: 400px) {
      padding: 5px 16px;
    }

    @media screen and (max-width: 324px) {
      padding: 4px 12px;
      font-size: 0.7rem;
    }
  }
`;

const postOwnerContainer = css`
  display: flex;
  align-items: center;
  margin: 25px 0px 28px;
  gap: 14px;
  overflow: hidden;

  @media screen and (max-width: 525px) {
    margin: 15px 0 18px;
  }

  div {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  p {
    font-weight: 600;
    font-size: 1rem;

    @media screen and (max-width: 324px) {
      font-size: 0.9rem;
    }
  }
`;

export default function Title({
  walkDetail,
  moimState,
}: {
  walkDetail?: WalkDetail;
  moimState: boolean;
}) {
  const router = useRouter();

  if (walkDetail == null) {
    return (
      <article css={titleContainer}>
        <LoadingTitle />
      </article>
    );
  }

  return (
    <article css={titleContainer}>
      <div className="moim-title">
        <MoimStateButton moimState={moimState} className="moim-state-button">
          {moimState ? '모집중' : '모집마감'}
        </MoimStateButton>
        <h1>{walkDetail.name}</h1>
      </div>
      <div css={postOwnerContainer}>
        <div>
          <Image
            src={walkDetail.member.imgUrl}
            alt={`작성자 ${walkDetail.member.username}의 사진`}
            width="40px"
            height="40px"
            onClick={() => router.push(`/users/${walkDetail.member.id}`)}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk5HSrBwABNADReNJYZwAAAABJRU5ErkJggg=="
          />
        </div>
        <p>{walkDetail.member.username}</p>
      </div>
    </article>
  );
}
