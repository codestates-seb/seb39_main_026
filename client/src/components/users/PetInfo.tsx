import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { MyPets } from '../../models/MyPets';
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
  const [isPetAddMode, setIsPetAddMode] = useState(false);
  const [petId, setPetId] = useState(-1);

  const mypet = css`
    margin-bottom: 1.2rem;
    display: flex;
    .petInfo {
      cursor: pointer;
      margin-right: 0.5rem;
      background-color: transparent;
      border: 0;
      .petImgWrapper {
        overflow: hidden;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        background-color: ${Theme.disableBgColor};
      }
      .petImg {
        object-fit: cover;
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
    .noPets {
      font-weight: 500;
      color: ${Theme.disableColor};
    }
    .firstAddButton {
      cursor: pointer;
      background-color: #fafafa;
      border: 1px solid #c6c6c6;
      padding: 0.5rem;
      border-radius: 15px;
      display: flex;
      align-items: center;
      font-weight: 500;
      .firstAddIcon {
        font-size: 0.8rem;
        margin-right: 0.2rem;
        color: ${Theme.mainColor};
      }
    }
  `;

  return (
    <>
      {pets && (
        <div css={mypet}>
          {pets.map((pet: MyPets) => {
            return (
              <React.Fragment key={pet.id}>
                <button
                  className="petInfo"
                  onClick={() => {
                    setIsPetEditMode(!isPetEditMode);
                    setPetId(pet.id);
                  }}
                >
                  <div className="petImgWrapper">
                    <Image
                      src={pet.imgUrl}
                      height="50px"
                      width="50px"
                      alt={`${pet.petName}`}
                      className="petImg"
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk5HSrBwABNADReNJYZwAAAABJRU5ErkJggg=="
                    />
                  </div>
                  <p className="petName">{pet.petName}</p>
                </button>
              </React.Fragment>
            );
          })}
          {isValidated && pets.length > 0 && (
            <button
              type="button"
              className="addButton"
              onClick={() => {
                setIsPetAddMode(true);
              }}
            >
              <Icon icon="akar-icons:plus" className="icon" />
            </button>
          )}
          {!isValidated && pets.length === 0 && (
            <p className="noPets">아직 등록한 반려동물이 없어요!</p>
          )}
          {isValidated && pets.length === 0 && (
            <button
              type="button"
              className="firstAddButton"
              onClick={() => {
                setIsPetAddMode(true);
              }}
            >
              <Icon icon="akar-icons:plus" className="firstAddIcon" />
              반려동물 등록하기
            </button>
          )}
          {isValidated && isPetEditMode && (
            <PetEditOverlay setIsPetEditMode={setIsPetEditMode} id={petId} />
          )}
          {isValidated && isPetAddMode && (
            <PetEditOverlay setIsPetEditMode={setIsPetAddMode} id={-1} />
          )}
          {!isValidated && isPetEditMode && (
            <DogChoiceModal
              isDogInfoModalOpen={isPetEditMode}
              setIsDogInfoModalOpen={setIsPetEditMode}
              petId={petId}
            />
          )}
        </div>
      )}
    </>
  );
}
