import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWalksDetailQuery } from '../../../hooks/WalksDetailQuery';
import { WalkDetail } from '../../../models/WalkDefault';
import CommonButton from '../../CommonButton';
import DogChoiceModal from '../../DogChoiceModal';
import Comments from './Comments';
import DogInfoModal from './DogInfoModal';
import Information from './Information';
import PageNav from './PageNav';
import ParticipantsInfo from './ParticipantsInfo';
// import StickyInfo from './StickyInfo';
import Title from './Title';

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const walkId = router.query.walkId as string;
  const walksData: WalkDetail = useWalksDetailQuery(walkId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDogInfoModalOpen, setIsDogInfoModalOpen] = useState(false);
  const [petInfoId, setPetInfoId] = useState('');

  const getPetId = (petId: string) => {
    setPetInfoId(petId);
  };

  return (
    <>
      <section css={sancheckDetailLayout}>
        <div>
          <Title
            walksData={walksData}
            setIsDogInfoModalOpen={setIsDogInfoModalOpen}
            getPetId={getPetId}
          />
          <Information walksData={walksData} />
          <PageNav />
          {children}
          <ParticipantsInfo
            walksData={walksData}
            setIsDogInfoModalOpen={setIsDogInfoModalOpen}
            getPetId={getPetId}
          />
          <Comments
            walksData={walksData}
            setIsDogInfoModalOpen={setIsDogInfoModalOpen}
            getPetId={getPetId}
          />
        </div>
        <div className="sticky-info-container">
          {/* <StickyInfo walksData={walksData} setIsModalOpen={setIsModalOpen} /> */}
        </div>
        <div css={mobileMoimJoin}>
          <CommonButton type="button" onClick={() => setIsModalOpen(true)}>
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
