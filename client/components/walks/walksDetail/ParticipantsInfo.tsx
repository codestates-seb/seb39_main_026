/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import React from 'react';
import { WalkDetail } from '../../../models/WalkDefault';

export default function ParticipantsInfo({
  walksData,
}: {
  walksData: WalkDetail;
}) {
  return (
    <article>
      <h2>
        참여 중인 강아지 {`${walksData?.pets?.length}/${walksData.capacity}`}
      </h2>
      <ul>
        {walksData.pets == null ? (
          <span>로딩</span>
        ) : (
          walksData.pets.map((pet) => (
            <li key={pet.petName}>
              <img
                src="/main_image.jpg"
                css={css`
                  width: 35px;
                  height: 35px;
                  object-fit: cover;
                `}
                alt={pet.petName}
              />
            </li>
          ))
        )}
      </ul>
    </article>
  );
}
