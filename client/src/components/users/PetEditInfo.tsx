import { css } from '@emotion/react';
import { Icon } from '@iconify/react';

import axios from 'axios';
import Image from 'next/image';
import Router from 'next/router';
import React, {
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useRecoilState } from 'recoil';
import { API } from '../../apis/api';
import { useUpdatePetImgMutation } from '../../hooks/PetsQuery';
import { MyPets } from '../../models/MyPets';
import UserState from '../../states/UserState';
import { Theme } from '../../styles/Theme';
import CommonButton from '../CommonButton';
import PetBirthdaySelector from './PetBirthdaySelector';
import PetPersonalityButton from './PetPersonalityButton';
import SelectButton from './SelectButton';

export default function PetEditInfo({
  pet,
  setIsPetEditMode,
}: {
  pet: MyPets;
  setIsPetEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const [user] = useRecoilState(UserState);
  const [petName, setPetName] = useState(pet.petName);
  const [petGender, setPetGender] = useState(pet.petGender);
  const [petBreed, setPetBreed] = useState(pet.breed);
  const [petNeuter, setPetNeuter] = useState(pet.neuter);
  const [petPersonality, setPetPersonality] = useState(pet.personality);
  const [petAbout, setPetAbout] = useState(pet.about);
  const [petBirthday, setPetBirthday] = useState(pet.petAges.birthDay);
  const [petImgUrl, setPetImgUrl] = useState('');
  const [imgSrc, setImgSrc] = useState(pet.imgUrl);
  const { mutate: updatePetImgMutate } = useUpdatePetImgMutation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImgClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      updatePetImgMutate({
        id: pet.id,
        file: e.target.files[0],
        setImgSrc,
        setPetImgUrl,
      });
    }
  };

  const handleSubmitClick = () => {
    const editedData = {
      petName,
      petGender: petGender,
      breed: petBreed,
      neuter: petNeuter,
      personality: petPersonality,
      about: petAbout,
      birthDay: petBirthday,
      imgUrl: petImgUrl,
    };
    if (pet.id === 909090) {
      axios.post(`${API.PETS}/post/?username=${user.username}`, editedData, {
        headers: {
          authorization: localStorage.getItem('accessToken') || '',
          refresh_token: localStorage.getItem('refreshToken') || '',
        },
      });
    } else {
      axios.patch(`${API.PETS}/${pet.id}`, editedData, {
        headers: {
          authorization: localStorage.getItem('accessToken') || '',
          refresh_token: localStorage.getItem('refreshToken') || '',
        },
      });
    }
    setIsPetEditMode(false);
    Router.reload();
  };

  const handleDeleteClick = () => {
    axios.delete(`${API.PETS}/${pet.id}`, {
      headers: {
        authorization: localStorage.getItem('accessToken') || '',
        refresh_token: localStorage.getItem('refreshToken') || '',
      },
    });
    setIsPetEditMode(false);
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
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: ${Theme.disableBgColor};
      object-fit: cover;
    }
    .camera {
      color: #ffffff80;
      position: absolute;
      top: 35%;
      left: 35%;
      font-size: 2rem;
    }
    .preview {
      border-radius: 50%;
    }
    .imgUpload {
      display: none;
    }
    dl {
      width: 80%;
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
      .birthday {
        text-align: right;
        width: 100%;
        select {
          border: 0;
          font-size: 1rem;
          margin-right: 0.3rem;
          :focus {
            outline: none;
          }
        }
        span {
          margin-right: 0.3rem;
          font-weight: 500;
        }
      }
    }
    .submitBtn {
      margin: 2rem 2rem 0 2rem;
      width: 70%;
    }
    .deleteBtn {
      margin: 2rem;
      margin: 1rem 2rem 7rem 2rem;
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

  useEffect(() => {
    console.log(pet);
  }, []);

  return (
    <div css={petInfo}>
      <div className="img" onClick={onUploadImgClick}>
        <Image
          alt={`${pet.petName}`}
          src={imgSrc}
          width="100px"
          height="100px"
          className="preview"
        />
        <Icon icon="ant-design:camera-twotone" className="camera" />
        <input
          type="file"
          accept="image/*"
          className="imgUpload"
          onChange={onUploadImage}
          ref={inputRef}
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
        <dd className="birthday">
          <PetBirthdaySelector
            petBirthday={petBirthday}
            setPetBirthday={setPetBirthday}
          />
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
      <CommonButton
        type="submit"
        className="deleteBtn"
        onClick={handleDeleteClick}
        buttonColor="#b4b4b4"
      >
        삭제하기
      </CommonButton>
    </div>
  );
}
