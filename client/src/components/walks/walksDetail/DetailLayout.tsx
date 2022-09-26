import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
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
        <div css={mobileMoimJoin}>
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
    padding-bottom: 90px;

    .sticky-info-container {
      display: none;
    }
  }

  @media screen and (max-width: 525px) {
    padding: 60px 26px 50px;
  }

  @media screen and (max-width: 324px) {
    padding: 40px 16px 50px;
  }

  ul {
    list-style: none;
  }
`;

const mobileMoimJoin = css`
  display: none;
  @media screen and (max-width: 880px) {
    display: block;
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    padding: 0 20px;
  }

  @media screen and (max-width: 768px) {
    bottom: 100px;
  }
`;
