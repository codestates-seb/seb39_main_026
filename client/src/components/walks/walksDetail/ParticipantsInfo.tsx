/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
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
    }
  }
`;

export default function ParticipantsInfo({
  walksData,
  setIsDogInfoModalOpen,
  getPetId,
}: {
  walksData: WalkDetail;
  setIsDogInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  getPetId: (petId: string) => void;
}) {
  return (
    <>
      <article css={participantContainer}>
        {walksData == null ? (
          <LoadingParticipantInfo />
        ) : (
          <>
            <h2>
              참여 중인 강아지
              <span
                css={css`
                  color: ${walksData?.pets?.length > 0
                    ? Theme.mainColor
                    : '#000'};
                  margin-left: 4px;
                  letter-spacing: 2px;
                `}
              >
                {walksData?.pets?.length}
              </span>
              <span
                css={css`
                  letter-spacing: 2px;
                `}
              >
                /{walksData.capacity}
              </span>
            </h2>
            <ul>
              {walksData?.pets?.map((pet) => (
                <li
                  key={pet.petName}
                  onClick={() => {
                    setIsDogInfoModalOpen(true);
                    getPetId('1');
                  }}
                >
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
              ))}
            </ul>
          </>
        )}
      </article>
    </>
  );
}
