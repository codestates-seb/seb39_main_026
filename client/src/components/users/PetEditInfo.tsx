import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, {
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRecoilState } from 'recoil';
import {
  useDeletePetMutation,
  usePostPetMutation,
  useUpdatePetImgMutation,
  useUpdatePetMutation,
} from '../../hooks/PetsQuery';
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
  const { username } = user;
  const { id } = pet;
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
  const { mutate: updatePetMutation } = useUpdatePetMutation();
  const { mutate: postPetMutation } = usePostPetMutation();
  const { mutate: deletePetMutation } = useDeletePetMutation();
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
      petName: petName,
      petGender: petGender,
      breed: petBreed,
      neuter: petNeuter,
      personality: petPersonality,
      about: petAbout,
      birthDay: petBirthday,
      imgUrl: petImgUrl,
    };
    if (pet.id === -1) {
      postPetMutation({ username, editedData, setIsPetEditMode });
    } else {
      updatePetMutation({ id, editedData, setIsPetEditMode });
    }
  };

  const handleDeleteClick = () => {
    deletePetMutation({ id, setIsPetEditMode });
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 1rem auto;
    background-color: white;

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
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
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
          width: 100%;
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
        select {
          border: 0;
          font-size: 1rem;
          margin-right: 0.3rem;
          cursor: pointer;
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
      margin-top: 2rem;
    }
    .submitBtn + .deleteBtn {
      margin-top: 1rem;
    }
    .deleteBtn {
      margin-bottom: 7rem;
    }

    @media screen and (max-width: 768px) {
      dl {
        display: block;
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
