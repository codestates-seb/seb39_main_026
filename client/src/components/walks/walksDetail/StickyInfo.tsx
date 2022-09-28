import { css } from '@emotion/react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { WalkDetail } from '../../../models/WalkDefault';
import UserState from '../../../states/UserState';
import { Theme } from '../../../styles/Theme';
import CommonButton from '../../CommonButton';
import LoadingStickyInfo from '../skeleton/walksDetail/LoadingStickyInfo';

const infoContainer = css`
  position: sticky;
  top: 100px;
  right: 0;
  border-radius: 20px;
  overflow: hidden;
  word-break: break-all;
  width: 310px;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 5%), 0 1px 4px hsl(0deg 0% 0% / 5%),
    0 2px 8px hsl(0deg 0% 0% / 5%);

  .info-content {
    padding: 20px 30px;
    background-color: #f7f7f5;

    h1 {
      margin-bottom: 10px;
      font-size: 1.3rem;
    }

    p {
      color: #969696;
    }

    p:last-of-type {
      color: ${Theme.mainColor} !important;
      font-weight: 600;
      font-size: 1.3rem;
      margin: 18px 0 28px;
    }
  }

  p.everyweek-moim {
    span:first-of-type {
      margin-left: 6px;
    }

    span + span {
      &::before {
        content: '•';
        margin-left: 3px;
        margin-right: 3px;
      }
    }
  }
`;

export default function StickyInfo({
  walkDetail,
  setIsModalOpen,
}: {
  walkDetail?: WalkDetail;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [user] = useRecoilState(UserState);
  const router = useRouter();

  if (walkDetail == null || walkDetail.imgUrls == null) {
    return <LoadingStickyInfo />;
  }

  const imgUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/community/img/${walkDetail.imgUrls[0]}`;

  return (
    <div
      css={css`
        position: relative;
        height: 100%;
      `}
    >
      <aside css={infoContainer}>
        <div
          css={css`
            background-image: url(${imgUrl});
            background-size: cover;
            background-position: center;
            height: 200px;
          `}
        ></div>
        <div className="info-content">
          <h1>{walkDetail.name}</h1>
          <>
            {walkDetail.dateInfo != null ? (
              format(new Date(walkDetail?.dateInfo), 'yyyy년 MM월 dd일')
            ) : (
              <p className="everyweek-moim">
                매주
                {walkDetail?.dayInfo?.map((x) => (
                  <span key={`${x}`}>{x}</span>
                ))}
              </p>
            )}
          </>
          <p>{walkDetail.place}</p>
          <p>{walkDetail.capacity - walkDetail.participant}자리 남았어요!</p>
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
      </aside>
    </div>
  );
}
