/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useScrollTop } from '../../../hooks/Scroll';
import { useWalksDetailQuery } from '../../../hooks/WalksDetailQuery';
import UserState from '../../../states/UserState';
import CommonButton from '../../CommonButton';
import DogChoiceModal from '../../DogChoiceModal';
import Comments from './Comments';
import DogInfoModal from './DogInfoModal';
import Information from './Information';
import PageNav from './PageNav';
import ParticipantsInfo from './ParticipantsInfo';
import StickyInfo from './StickyInfo';
import Title from './Title';

export default function DetailLayout({
  walkId,
  children,
}: {
  walkId: string;
  children: React.ReactNode;
}) {
  const walkDetail = useWalksDetailQuery(walkId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDogInfoModalOpen, setIsDogInfoModalOpen] = useState(false);
  const [petInfoId, setPetInfoId] = useState(1);
  const [user] = useRecoilState(UserState);
  const router = useRouter();

  const getPetId = (petId: number) => {
    setPetInfoId(petId);
  };

  const top = useScrollTop();

  return (
    <>
      <section css={sancheckDetailLayout}>
        <div>
          <Title walkDetail={walkDetail} />
          <Information walkDetail={walkDetail} />
          <PageNav />
          {children}
          <ParticipantsInfo
            walkDetail={walkDetail}
            setIsDogInfoModalOpen={setIsDogInfoModalOpen}
            getPetId={getPetId}
          />
          <Comments walkDetail={walkDetail} />
        </div>
        <div className="sticky-info-container">
          <StickyInfo walkDetail={walkDetail} setIsModalOpen={setIsModalOpen} />
        </div>
        <div css={mobileMoimJoin(top)}>
          <CommonButton
            type="button"
            onClick={() => {
              if (user == null) {
                router.push('/login');
                return;
              }
              return setIsModalOpen(true);
            }}
          >
            모임 참여하기
          </CommonButton>
        </div>
      </section>
      {isModalOpen && (
        <DogChoiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isDogInfoModalOpen && (
        <DogInfoModal
          isDogInfoModalOpen={isDogInfoModalOpen}
          setIsDogInfoModalOpen={setIsDogInfoModalOpen}
          petId={petInfoId}
        />
      )}
    </>
  );
}

const sancheckDetailLayout = css`
  display: grid;
  grid-template-columns: 1fr 310px;
  gap: 0 20px;
  padding: 80px 36px 50px;

  @media screen and (max-width: 880px) {
    grid-template-columns: 1fr;
    padding: 28px 36px 36px;

    .sticky-info-container {
      display: none;
    }
  }

  @media screen and (max-width: 525px) {
    padding: 28px 26px 50px;
  }

  @media screen and (max-width: 324px) {
    padding: 28px 16px 50px;
  }

  ul {
    list-style: none;
  }
`;

const mobileMoimJoin = (top: number) => css`
  opacity: 0;

  @media screen and (max-width: 880px) {
    opacity: ${top === 75 ? '1' : '0'};
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    padding: 0 20px;
    animation: ${top === 0 ? 'fadeIn 0.3s' : 'fadeOut 0.3s'};
  }

  @media screen and (max-width: 768px) {
    opacity: ${top === 0 ? '1' : '0'};
    bottom: 100px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
