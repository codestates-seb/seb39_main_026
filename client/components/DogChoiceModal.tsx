/* eslint-disable @next/next/no-img-element */
import { css, keyframes } from '@emotion/react';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useMyPetsListQuery } from '../hooks/MyPetsListQuery';
import { MyPets } from '../models/MyPets';
import { Theme } from '../styles/Theme';
import CommonButton from './CommonButton';

const modalContainer = (isModalOpen: boolean) => css`
  &.modal-wrapper {
    display: flex;
    align-items: end;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &.modal-wrapper section.modal {
    width: 100%;
    max-width: 1200px;
    border-radius: 20px 20px 0 0;
    padding: 42px 41px 22px;
    background-color: #fff;
    z-index: 1;

    h1 {
      font-size: 1.3rem;
      font-weight: 600;

      @media screen and (max-width: 305px) {
        font-size: 1.1rem;
        word-break: keep-all;
      }
    }

    ul {
      list-style: none;
      display: flex;
      align-items: center;
      gap: 19px;
      overflow-x: scroll;
    }

    ul li {
      margin: 28px 0;
    }

    ul li {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
      }

      p {
        font-size: 0.9rem;
        font-weight: 500;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
      }
    }

    ul li.pick {
      img {
        filter: grayscale(100%);
      }

      p {
        color: ${Theme.mainColor};
        font-weight: bold;
      }
    }
  }

  section.modal {
    display: ${isModalOpen ? 'block' : 'none'};
    animation: ${isModalOpen ? fadeIn : fadeOut} 0.4s ease-out;
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
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const petData = useMyPetsListQuery();

  const [pickPets, setPickPets] = useState<string[]>([]);

  const handlePickPetClick = (pet: string) => {
    if (pickPets.includes(pet)) {
      setPickPets(pickPets.filter((item) => item !== pet));
    } else {
      setPickPets([...pickPets, pet]);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      css={modalContainer(isModalOpen)}
      className="modal-wrapper"
      onClick={() => setIsModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <h1>어떤 강아지랑 산책할 건가요?</h1>
        <ul>
          {(petData.pets ?? []).map((pet: MyPets) => (
            <li
              key={pet.id}
              onClick={() => handlePickPetClick(pet.petName)}
              className={pickPets.includes(pet.petName) ? 'pick' : ''}
            >
              <img src={pet.imgUrl} alt={`${pet.petName} 사진`} />
              <p>{pet.petName}</p>
            </li>
          ))}
        </ul>
        {pickPets.length > 0 ? (
          <Link href="/walks/write">
            <a
              css={css`
                display: block;
              `}
            >
              <CommonButton
                type="button"
                buttonColor={`${Theme.mainColor}`}
                onClick={() =>
                  localStorage.setItem('pickPets', JSON.stringify(pickPets))
                }
              >
                산책하러 가기!
              </CommonButton>
            </a>
          </Link>
        ) : (
          <>
            <CommonButton
              type="button"
              buttonColor={`${Theme.disableColor}`}
              onClick={() => console.log('강아지랑 산책해주세요!')}
            >
              산책하러 가기!
            </CommonButton>
          </>
        )}
      </section>
    </div>
  );
}
