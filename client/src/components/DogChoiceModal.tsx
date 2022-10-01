/* eslint-disable @next/next/no-img-element */
import { css, keyframes } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useMyDogsListQuery } from '../hooks/PetsQuery';
import { useJoinWalksMoim } from '../hooks/WalksQuery';
import { Pet } from '../models/UserInfo';
import UserState from '../states/UserState';
import { Theme } from '../styles/Theme';
import CommonButton from './CommonButton';

const modalContainer = (isModalOpen: boolean) => css`
  &.modal-wrapper {
    display: flex;
    align-items: end;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
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
        filter: grayscale(100%);
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
        filter: grayscale(0);
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
  goToWalksWrite,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  goToWalksWrite: boolean;
}) {
  const router = useRouter();
  const { walkId } = router.query as { walkId: string };

  const [user] = useRecoilState(UserState);
  const [pickPetsId, setPickPetsId] = useState<number[]>([]);

  const userData = useMyDogsListQuery(user);

  const { handleJoinWalksMoim } = useJoinWalksMoim();

  // NOTE: type 에러로 일단은 이렇게 해결해놓았습니다. 추후에 수정해야합니다.
  const { petList } = userData || {};

  const handlePickPetClick = (petId: number) => {
    if (pickPetsId.includes(petId)) {
      setPickPetsId(pickPetsId.filter((item) => item !== petId));
    } else {
      setPickPetsId([...pickPetsId, petId]);
    }
  };

  const handleGoTowalkClick = () => {
    if (goToWalksWrite) {
      console.log(pickPetsId);
      router.push('/walks/write');
    } else if (!goToWalksWrite) {
      console.log(pickPetsId);
      handleJoinWalksMoim(walkId, pickPetsId);
      router.reload();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (petList?.length === 0) {
    return (
      <div
        css={modalContainer(isModalOpen)}
        className="modal-wrapper"
        onClick={() => setIsModalOpen(false)}
      >
        <section onClick={(e) => e.stopPropagation()} className="modal">
          <h1>강아지가 없네요 😢</h1>
          <p
            css={css`
              margin: 30px 0;
            `}
          >
            강아지를 등록해주세요!
          </p>
          <Link href={`/users/${user.id}`}>
            <a>
              <CommonButton
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                강아지 등록하러 가기
              </CommonButton>
            </a>
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div
      css={modalContainer(isModalOpen)}
      className="modal-wrapper"
      onClick={() => setIsModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <h1>어떤 강아지랑 산책할 건가요?</h1>
        <ul>
          {petList?.map((pet: Pet) => (
            <li
              key={pet.id}
              onClick={() => handlePickPetClick(pet.id)}
              className={pickPetsId.includes(pet.id) ? 'pick' : ''}
            >
              <img src={pet.imgUrl} alt={`${pet.petName} 사진`} />
              <p>{pet.petName}</p>
            </li>
          ))}
        </ul>
        {pickPetsId.length > 0 ? (
          <CommonButton
            type="button"
            buttonColor={`${Theme.mainColor}`}
            onClick={handleGoTowalkClick}
          >
            산책하러 가기!
          </CommonButton>
        ) : (
          <>
            <CommonButton
              type="button"
              buttonColor={`${Theme.disableColor}`}
              onClick={() => alert('산책할 강아지를 선택해주세요!')}
            >
              산책하러 가기!
            </CommonButton>
          </>
        )}
      </section>
    </div>
  );
}
