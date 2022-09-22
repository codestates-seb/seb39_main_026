/* eslint-disable @next/next/no-img-element */
import { css, keyframes } from '@emotion/react';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { API } from '../../../apis/api';
import { UserDogInfo } from '../../../models/UserDogInfo';
import { Theme } from '../../../styles/Theme';

const modalContainer = (isModalOpen: boolean) => css`
  &.modal-wrapper {
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    align-items: end;
  }

  &.modal-wrapper section.modal {
    height: 500px;
    width: 100%;
    /* max-width: 1200px; */
    border-radius: 20px 20px 0 0;
    padding: 42px 41px 22px;
    background-color: #fff;
    overflow-y: scroll;
    z-index: 1;

    @media screen and (max-width: 305px) {
      font-size: 1.1rem;
      word-break: keep-all;
    }
  }

  section.modal {
    display: ${isModalOpen ? 'block' : 'none'};
    animation: ${isModalOpen ? fadeIn : fadeOut} 0.4s ease-out;
  }

  section.modal {
    h1 {
      color: ${Theme.mainColor};
      font-size: 1.5rem;
      margin-bottom: 40px;

      @media screen and (max-width: 324px) {
        font-size: 1.2rem;
        margin-bottom: 10px;
      }
    }

    ul {
      list-style: none;
    }
  }
`;

const fadeIn = keyframes`
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0px);
  }
`;

const fadeOut = keyframes`
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(100%);
  }
`;

export default function DogChoiceModal({
  isDogInfoModalOpen,
  setIsDogInfoModalOpen,
  petId,
}: {
  isDogInfoModalOpen: boolean;
  setIsDogInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  petId: number;
}) {
  const [dogInfoData, setDogInfoData] = useState<UserDogInfo>();

  const getDogInfo = async (petId: number) => {
    const response = await axios.get(`${API.PETS}/${petId}`);
    setDogInfoData(response.data);
  };

  useEffect(() => {
    getDogInfo(petId);
  }, [petId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (dogInfoData == null) {
    return <p>loading... </p>;
  }

  return (
    <div
      className="modal-wrapper"
      css={modalContainer(isDogInfoModalOpen)}
      onClick={() => setIsDogInfoModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <h1>🐕 반려 동물 정보</h1>
        <ul
          css={css`
            display: grid;
            grid-template-columns: 80px 1fr;
            font-size: 1.1rem;
            font-weight: 600;
            gap: 20px;

            @media screen and (max-width: 525px) {
              gap: 10px;
            }

            li {
              border-bottom: 1px solid ${Theme.divisionLineColor};
              padding: 10px 6px;
            }

            li:nth-of-type(2n) {
              text-align: center;
              color: ${Theme.mainColor};
            }

            @media screen and (max-width: 525px) {
              font-size: 1rem;
            }
          `}
        >
          <li
            css={css`
              grid-column: 1 / 3;
              padding: 0;
              border-bottom: none !important;
            `}
          >
            <img
              src={dogInfoData.imgUrl}
              alt={`${dogInfoData.petName}의 사진`}
              css={css`
                width: 100px;
                height: 100px;
                object-fit: cover;
                border-radius: 50%;
              `}
            />
          </li>
          <li>이름</li>
          <li>{dogInfoData.petName}</li>
          <li>나이</li>
          <li>{dogInfoData.petAge}</li>
        </ul>
        <ul
          css={css`
            li:nth-of-type(2n - 1) {
              border-bottom: 1px solid ${Theme.divisionLineColor};
              padding: 10px 6px;
              margin-top: 20px;
              color: ${Theme.mainColor};
              text-align: center;
              font-size: 1.1rem;
              font-weight: 600;

              @media screen and (max-width: 525px) {
                margin-top: 10px;
                font-size: 1rem;
              }
            }

            li:nth-of-type(2n) {
              border-radius: 20px;
              padding: 10px 6px;
              text-align: center;
              font-size: 1.1rem;
              font-weight: 600;
            }

            li:last-of-type {
              word-break: keep-all;
            }
          `}
        >
          <li>성별</li>
          <li>{dogInfoData.petGender}</li>
          <li>중성화</li>
          <li>{dogInfoData.neuter}</li>
          <li>우리 강아지는 어떤 성향인가요?</li>
          <li>{dogInfoData.personality}</li>
          <li>우리 강아지를 소개해주세요!</li>
          <li>{dogInfoData.about}</li>
        </ul>
      </section>
    </div>
  );
}
