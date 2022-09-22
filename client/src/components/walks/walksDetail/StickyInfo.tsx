import { css } from '@emotion/react';
import { format } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import { WalkDetail } from '../../../models/WalkDefault';
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
  if (walkDetail == null || walkDetail.imgUrls == null) {
    return <LoadingStickyInfo />;
  }
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
            background-image: url(${walkDetail.imgUrls[0]});
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
          <CommonButton type="button" onClick={() => setIsModalOpen(true)}>
            모임 참여하기
          </CommonButton>
        </div>
      </aside>
    </div>
  );
}
