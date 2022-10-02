/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useScrollTop } from '../../../hooks/Scroll';
import { useWalksDetailQuery } from '../../../hooks/WalksQuery';
import UserState from '../../../states/UserState';
import CommonButton from '../../CommonButton';
import DogChoiceModal from '../../DogChoiceModal';
import Carousel from '../Carousel';
import DogInfoModal from './DogInfoModal';
import Information from './Information';
import PageNav from './PageNav';
import ParticipantsInfo from './ParticipantsInfo';
import StickyInfo from './StickyInfo';
import Title from './Title';
import Comments from './comment/Comments';

export default function DetailLayout({
  walkId,
  children,
}: {
  walkId: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const walkDetail = useWalksDetailQuery(walkId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDogInfoModalOpen, setIsDogInfoModalOpen] = useState(false);
  const [petInfoId, setPetInfoId] = useState(1);
  const [user] = useRecoilState(UserState);

  const top = useScrollTop();

  const getPetId = (petId: number) => {
    setPetInfoId(petId);
  };

  function getMoimState() {
    // 시간이 지남 => 모집마감
    // 참여자 >= 모집인원 => 모집마감

    if (walkDetail == null) {
      return;
    }

    if (walkDetail?.dateInfo != null) {
      const year = Number(walkDetail.dateInfo.split('.')[0]);
      const month = Number(walkDetail.dateInfo.split('.')[1]);
      const day = Number(walkDetail.dateInfo.split('.')[2]);
      const moimDate = new Date(year, month, day);

      if (new Date() > moimDate) {
        return '모집마감';
      }
    }

    if (walkDetail.capacity <= walkDetail.participant) {
      return '모집마감';
    }

    return '모집중';
  }

  if (walkDetail == null) {
    return;
  }

  return (
    <>
      <div
        css={css`
          @media screen and (min-width: 881px) {
            display: none;
          }
        `}
      >
        <Carousel carouselDefaultHeight={'400px'} walkDetail={walkDetail} />
      </div>
      <section css={sancheckDetailLayout}>
        <div>
          <Title walkDetail={walkDetail} getMoimState={getMoimState()} />
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
          <StickyInfo
            walkDetail={walkDetail}
            setIsModalOpen={setIsModalOpen}
            getMoimState={getMoimState()}
          />
        </div>
        <div css={mobileMoimJoin(top)}>
          {user && walkDetail?.member.id === user.id ? (
            <></>
          ) : (
            <CommonButton
              type="button"
              onClick={() => {
                if (user == null) {
                  router.push('/login');
                  return;
                }
                return setIsModalOpen(true);
              }}
              className={
                getMoimState() === '모집마감' ? 'disabled-join-button' : ''
              }
            >
              {getMoimState() === '모집중' ? '모임 참여하기' : '다음 기회에...'}
            </CommonButton>
          )}
        </div>
      </section>
      {isModalOpen && (
        <DogChoiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          goToWalksWrite={false}
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
  min-height: calc(100vh - 75px);

  .disabled-join-button {
    background-color: #969696;
    pointer-events: none;
  }

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
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    padding: 0 20px;
    opacity: ${top === 0 || top === 75 ? '1' : '0'};
    animation: ${top === 0 || top === 75 ? 'fadeIn 0.3s' : 'fadeOut 0.3s'};
    z-index: ${top === 0 || top === 75 ? '1' : '-1'};
  }

  @media screen and (max-width: 769px) {
    bottom: 100px;
    opacity: ${top === 0 ? '1' : '0'};
    animation: ${top === 0 ? 'fadeIn 0.3s' : 'fadeOut 0.3s'};
    z-index: ${top === 0 ? '1' : '-1'};
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
