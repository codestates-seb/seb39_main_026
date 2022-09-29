import { css } from '@emotion/react';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import { WalkDetail } from '../../../models/WalkDefault';
import { Theme } from '../../../styles/Theme';
import LoadingParticipantInfo from '../skeleton/walksDetail/LoadingParticipantInfo';

const participantContainer = css`
  h2 {
    font-size: 1rem;
    border-bottom: 1px solid ${Theme.divisionLineColor};
    padding-bottom: 15px;
  }

  ul {
    display: flex;
    gap: 6px;
    margin: 18px 0 38px;
    overflow-x: scroll;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    }
  }
`;

export default function ParticipantsInfo({
  walkDetail,
  setIsDogInfoModalOpen,
  getPetId,
}: {
  walkDetail?: WalkDetail;
  setIsDogInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  getPetId: (petId: number) => void;
}) {
  if (walkDetail == null) {
    return (
      <article css={participantContainer}>
        <LoadingParticipantInfo />
      </article>
    );
  }

  return (
    <article css={participantContainer}>
      <h2>
        참여 중인 강아지
        <span
          css={css`
            color: ${walkDetail.communityPetList.length > 0
              ? Theme.mainColor
              : '#000'};
            margin-left: 4px;
            letter-spacing: 2px;
          `}
        >
          {walkDetail.communityPetList.length}
        </span>
        <span
          css={css`
            letter-spacing: 2px;
          `}
        >
          /{walkDetail.capacity}
        </span>
      </h2>
      <ul>
        {walkDetail.communityPetList.map((pet) => (
          <li
            key={pet.petName}
            onClick={() => {
              setIsDogInfoModalOpen(true);
              getPetId(pet.id);
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/pets/img/${pet.id}`}
              // src={`${process.env.NEXT_PUBLIC_BASE_URL}/pets/image/${pet.id}`}
              width="35px"
              height="35px"
              alt={`${pet.petName} 의 사진`}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
