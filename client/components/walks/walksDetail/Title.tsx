/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { WalkDetail } from '../../../models/WalkDefault';

export default function Title({ walksData }: { walksData: WalkDetail }) {
  return (
    <>
      <h1>{walksData.title}</h1>
      <div>
        <div
          css={css`
            width: 35px;
            height: 35px;
          `}
        >
          <img
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `}
            src="/main_image.jpg"
            alt={`작성자 ${walksData.representMember}사진`}
          />
        </div>
        <p>{walksData.representMember}</p>
        <p>
          {walksData.pets == null ? (
            <span>로딩</span>
          ) : (
            walksData.pets.map((pet) =>
              pet['user.name'] === walksData.representMember ? (
                <span key={pet.petName}>{pet.petName}</span>
              ) : null
            )
          )}
        </p>
      </div>
    </>
  );
}
