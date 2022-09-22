import { css } from '@emotion/react';
// import axios from 'axios';
import Image from 'next/image';
import React, { useState, Dispatch, SetStateAction } from 'react';
// import { API } from '../../apis/api';
import { MyPets } from '../../models/MyPets';
import { Theme } from '../../styles/Theme';
import CommonButton from '../CommonButton';
import PetPersonalityButton from './PetPersonalityButton';
import SelectButton from './SelectButton';

export default function PetEditInfo({
  pet,
  setIsPetEditMode,
}: {
  pet: MyPets;
  setIsPetEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const [petName, setPetName] = useState(pet.petName);
  const [petGender, setPetGender] = useState(pet.petGender);
  const [petBreed, setPetBreed] = useState(pet.breed);
  const [petNeuter, setPetNeuter] = useState(pet.neuter);
  const [petPersonality, setPetPersonality] = useState(pet.personality);
  const [petAbout, setPetAbout] = useState(pet.about);

  const handleSubmitClick = () => {
    const editedData = {
      petName,
      gender: petGender,
      breed: petBreed,
      neuter: petNeuter,
      personality: petPersonality,
      about: petAbout,
    };
    console.log(editedData);
    setIsPetEditMode(false);
    // axios.patch(`${API.USERS}/${pet.id}`, editedData);
  };
  const handlePetNameEdit = (event: React.FormEvent<HTMLInputElement>) => {
    setPetName(event.currentTarget.value);
  };
  const handleGenderSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPetGender(event.currentTarget.innerText);
  };
  const handleNeuterSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPetNeuter(event.currentTarget.innerText);
  };
  const handlePersonliatySelect = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPetPersonality(event.currentTarget.innerText);
  };
  const handlePetAboutEdit = (event: React.FormEvent<HTMLInputElement>) => {
    setPetAbout(event.currentTarget.value);
  };
  const handlePetBreedEdit = (event: React.FormEvent<HTMLInputElement>) => {
    setPetBreed(event.currentTarget.value);
  };

  const petInfo = css`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: ${Theme.disableBgColor};
      object-fit: cover;
    }
    dl {
      display: grid;
      grid-template-columns: 50% 50%;
      font-size: 18px;
      dt {
        font-weight: 600;
        padding: 1rem;
        border-bottom: 1px solid ${Theme.divisionLineColor};
      }
      dd {
        padding: 1rem;
        border-bottom: 1px solid ${Theme.divisionLineColor};
        text-align: right;
        input {
          text-align: right;
          font-size: 18px;
          border: 0;
          :focus {
            outline: none;
          }
        }
        .about {
          width: 100%;
        }
      }
    }
    .submitBtn {
      margin: 2rem;
      width: 70%;
    }
    @media screen and (max-width: 768px) {
      dl {
        grid-template-columns: 100%;
        width: 80%;
        dt {
          border-bottom: 0;
        }
        dd {
          text-align: left;
          margin-bottom: 1rem;
          input {
            text-align: left;
          }
        }
      }
    }
  `;

  return (
    <div css={petInfo}>
      <div className="img">
        <Image
          alt={`${pet.petName}`}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/pets/img/${pet.imgUrl}`}
          width="100px"
          height="100px"
        />
      </div>
      <dl>
        <dt>이름</dt>
        <dd>
          <input
            type="text"
            defaultValue={petName}
            onChange={handlePetNameEdit}
          />
        </dd>
        <dt>생일</dt>
        <dd>
          {pet.petAges.years}년 {pet.petAges.months}월 {pet.petAges.days}일
        </dd>
        <dt>성별</dt>
        <dd>
          <SelectButton
            left="여"
            right="남"
            select={petGender}
            onClick={handleGenderSelect}
          />
        </dd>
        <dt> 견종</dt>
        <dd>
          <input
            type="text"
            defaultValue={petBreed}
            onChange={handlePetBreedEdit}
          />
        </dd>
        <dt>중성화를 했나요?</dt>
        <dd>
          <SelectButton
            left="O"
            right="X"
            select={petNeuter}
            onClick={handleNeuterSelect}
          />
        </dd>
        <dt>우리 강아지는 어떤 성향인가요?</dt>
        <dd>
          <PetPersonalityButton
            select={petPersonality}
            onClick={handlePersonliatySelect}
          />
        </dd>
        <dt>우리 강아지를 소개해주세요!</dt>
        <dd>
          <input
            className="about"
            type="text"
            defaultValue={petAbout}
            onChange={handlePetAboutEdit}
          />
        </dd>
      </dl>
      <CommonButton
        type="submit"
        className="submitBtn"
        onClick={handleSubmitClick}
      >
        저장하기
      </CommonButton>
    </div>
  );
}
