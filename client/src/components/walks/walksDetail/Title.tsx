import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { WalkDetail } from '../../../models/WalkDefault';
import { Theme } from '../../../styles/Theme';
import MoimState from '../../MoimState';
import LoadingTitle from '../skeleton/walksDetail/LoadingTitle';

const titleContainer = css`
  border-bottom: 1px solid ${Theme.divisionLineColor};

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
`;

const postOwnerContainer = css`
  display: flex;
  align-items: center;
  margin: 25px 0 28px;
  gap: 14px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  p {
    font-weight: 600;
    font-size: 0.88rem;
  }
`;

export default function Title({
  walkDetail,
  getMoimState,
}: {
  walkDetail?: WalkDetail;
  getMoimState: string | undefined;
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
      <div
        css={css`
          display: flex;
          gap: 18px;
          align-items: center;
        `}
      >
        <MoimState status={getMoimState}>{getMoimState}</MoimState>
        <h1>{walkDetail.name}</h1>
      </div>
      <div css={postOwnerContainer}>
        <Image
          src={walkDetail.member.imgUrl}
          alt={`작성자 ${walkDetail.member.username}의 사진`}
          width="32px"
          height="32px"
          onClick={() => router.push(`/users/${walkDetail.member.id}`)}
        />
        <p>{walkDetail.member.username}</p>
      </div>
    </article>
  );
}
