import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { MyPets } from '../../models/MyPets';
import { skeletonGradient } from '../../styles/GlobalStyle';
import { Theme } from '../../styles/Theme';
import DogChoiceModal from '../walks/walksDetail/DogInfoModal';
import PetEditOverlay from './PetEditOverlay';

export default function PetInfo({
  pets,
  isValidated,
}: {
  pets: MyPets[];
  isValidated: boolean;
}) {
  const [isPetEditMode, setIsPetEditMode] = useState(false);
  const [petId, setPetId] = useState(0);
  const mypet = css`
    margin-bottom: 1.2rem;
    display: flex;
    .petInfo {
      cursor: pointer;
      margin-right: 0.5rem;
      background-color: transparent;
      border: 0;
      .petImg {
        border-radius: 50%;
        object-fit: cover;
        height: 50px;
        width: 50px;
        background-color: ${Theme.disableBgColor};
      }
      .petName {
        font-size: 0.8rem;
        text-align: center;
        font-weight: 500;
      }
    }
    .addButton {
      cursor: pointer;
      border: 1px dashed ${Theme.disableColor};
      border-radius: 50%;
      height: 50px;
      width: 50px;
      background-color: #efefef;
      .icon {
        font-size: 1.5rem;
        color: ${Theme.disableColor};
      }
    }
  `;

  const loadingPets = css`
    margin-bottom: 1.2rem;
    display: flex;
    .petInfo {
      margin-right: 0.5rem;
      .petImg {
        border-radius: 50%;
        object-fit: cover;
        height: 50px;
        width: 50px;
        -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        color: transparent;
      }
      .petName {
        font-size: 0.8rem;
        text-align: center;
        font-weight: 500;
        -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        color: transparent;
      }
    }
  `;

  return (
    <>
      {pets ? (
        <div css={mypet}>
          {pets?.map((pet: MyPets) => {
            return (
              <React.Fragment key={pet.id}>
                <button
                  className="petInfo"
                  onClick={() => {
                    setIsPetEditMode(!isPetEditMode);
                    setPetId(pet.id);
                  }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/pets/img/${pet.imgUrl}`}
                    height="50px"
                    width="50px"
                    alt={`${pet.petName}`}
                    className="petImg"
                  />
                  <p className="petName">{pet.petName}</p>
                </button>
              </React.Fragment>
            );
          })}
          {isValidated && (
            <button type="button" className="addButton">
              <Icon icon="akar-icons:plus" className="icon" />
            </button>
          )}
          {isValidated && isPetEditMode ? (
            <PetEditOverlay setIsPetEditMode={setIsPetEditMode} id={petId} />
          ) : (
            ''
          )}
          {!isValidated && isPetEditMode ? (
            <DogChoiceModal
              isDogInfoModalOpen={isPetEditMode}
              setIsDogInfoModalOpen={setIsPetEditMode}
              petId={petId}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        <div css={loadingPets}>
          <div className="petInfo">
            <div className="petImg"></div>
            <p className="petName">🐾</p>
          </div>
          <div className="petInfo">
            <div className="petImg"></div>
            <p className="petName">🐾</p>
          </div>
        </div>
      )}
    </>
  );
}
