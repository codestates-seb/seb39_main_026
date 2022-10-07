/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useGetUsersQuery } from '../../../hooks/UsersQuery';
import { useWalksDetailQuery } from '../../../hooks/WalksQuery';
import UserState from '../../../states/UserState';
import { Theme } from '../../../styles/Theme';
import CommonButton from '../../CommonButton';
import DogChoiceModal from '../../DogChoiceModal';
import LoginOfferModal from '../../LoginOfferModal';
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
  const walkDetail = useWalksDetailQuery(walkId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDogInfoModalOpen, setIsDogInfoModalOpen] = useState(false);
  const [isLoginOfferModalOpen, setIsLoginOfferModalOpen] = useState(false);
  const [petInfoId, setPetInfoId] = useState(1);
  const [moimState, setMoimState] = useState(true);
  const [joinedMoimState, setJoinedMoimState] = useState(false);
  const [user] = useRecoilState(UserState);
  const userData = useGetUsersQuery(user?.id);

  const getPetId = (petId: number) => {
    setPetInfoId(petId);
  };

  const handleMoimJoimButtonClick = () => {
    if (user == null) {
      setIsLoginOfferModalOpen(true);
      return;
    }
    return setIsModalOpen(true);
  };

  const getMoimState = () => {
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
        return setMoimState(false);
      }
    }

    if (walkDetail.capacity <= walkDetail.participant) {
      return setMoimState(false);
    }

    return setMoimState(true);
  };

  const getJoinedMoimState = () => {
    if (walkDetail && userData.isSuccess) {
      userData.data.memberCommunityList.map(
        (community: { communityId: number }) => {
          if (community.communityId === walkDetail.communityId) {
            setJoinedMoimState(true);
          }
        }
      );
    }
  };

  useEffect(() => {
    getMoimState();
    getJoinedMoimState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walkDetail, moimState, joinedMoimState]);

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
      <section css={sancheckDetailLayout(moimState, joinedMoimState)}>
        <div>
          <Title walkDetail={walkDetail} moimState={moimState} />
          <Information walkDetail={walkDetail} />
          {user && walkDetail?.member.id === user.id ? (
            <></>
          ) : (
            <CommonButton
              type="button"
              onClick={handleMoimJoimButtonClick}
              className="moim-join-button"
            >
              {joinedMoimState
                ? '참여한 모임입니다'
                : moimState
                ? '모임 참여하기'
                : '다음 기회에...'}
            </CommonButton>
          )}
          <PageNav />
          {children}
          <ParticipantsInfo
            walkDetail={walkDetail}
            setIsDogInfoModalOpen={setIsDogInfoModalOpen}
            getPetId={getPetId}
          />
          <Comments
            walkDetail={walkDetail}
            setIsLoginOfferModalOpen={setIsLoginOfferModalOpen}
          />
        </div>
        <div className="sticky-info-container">
          <StickyInfo
            walkDetail={walkDetail}
            setIsModalOpen={setIsModalOpen}
            moimState={moimState}
            joinedMoimState={joinedMoimState}
            setIsLoginOfferModalOpen={setIsLoginOfferModalOpen}
          />
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
      {isLoginOfferModalOpen && (
        <LoginOfferModal
          isLoginOfferModalOpen={isLoginOfferModalOpen}
          setIsLoginOfferModalOpen={setIsLoginOfferModalOpen}
        />
      )}
    </>
  );
}

const sancheckDetailLayout = (
  moimState: boolean,
  joinedMoimState: boolean
) => css`
  display: grid;
  grid-template-columns: 1fr 310px;
  gap: 0 20px;
  margin: 110px 36px 10px;
  padding-bottom: 30px;

  ul {
    list-style: none;
  }

  @media screen and (max-width: 880px) {
    margin: 30px 20px;
    grid-template-columns: 1fr;
    display: block;

    .sticky-info-container {
      display: none;
    }
  }

  // 모임 참여하기 버튼 css
  @media screen and (max-width: 300px) {
    margin: 20px 20px 0px;
  }

  .moim-join-button {
    background-color: ${joinedMoimState
      ? '#969696'
      : moimState
      ? Theme.mainColor
      : '#969696'};

    pointer-events: ${joinedMoimState ? 'none' : moimState ? '' : 'none'};

    @media screen and (min-width: 881px) {
      display: none;
    }

    @media screen and (max-width: 450px) {
      padding: 18px;
      border-radius: 12px;
      font-size: 0.9rem;
    }

    @media screen and (max-width: 324px) {
      padding: 13px;
      font-size: 0.7rem;
    }
  }
`;
