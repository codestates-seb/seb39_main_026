import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { WalkDetail } from '../../../models/WalkDefault';
import LoadingInfo from '../skeleton/walksDetail/LoadingInfo';

const informationContainer = css`
  display: grid;
  grid-template-columns: 180px 1fr;
  padding: 32px 23px;
  gap: 20px 0;
  align-items: center;
  font-weight: 500;

  li:nth-of-type(2n - 1) {
    display: flex;
    align-items: center;
    gap: 18px;
    color: #969696;

    span {
      color: #545454;
      font-size: 0;

      svg {
        width: 20px;

        height: 20px;
      }
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

  @media screen and (max-width: 505px) {
    grid-template-columns: 120px 1fr;
    padding: 22px 13px;
  }

  @media screen and (max-width: 398px) {
    font-size: 0.8rem;
    gap: 18px 10px;
    grid-template-columns: 80px 1fr;
    padding: 12px 3px;
  }
`;

export default function Information({
  walkDetail,
}: {
  walkDetail?: WalkDetail;
}) {
  if (walkDetail == null || walkDetail.time == null) {
    return (
      <ul css={informationContainer}>
        <LoadingInfo />
      </ul>
    );
  }

  const [hour, minutes, seconds] = walkDetail.time?.split(':').map(Number);
  const morningOrAfternoon = format(
    new Date(2000, 1, 1, hour, minutes, seconds),
    'a h:mm',
    { locale: ko }
  );
  return (
    <ul css={informationContainer}>
      <>
        <li>
          <span>
            <Icon icon="clarity:date-solid" />
          </span>
          일시
        </li>
        <li>
          {walkDetail.dateInfo != null ? (
            format(new Date(walkDetail?.dateInfo), 'yyyy년 MM월 dd일')
          ) : (
            <p className="everyweek-moim">
              매주
              {walkDetail.dayInfo.map((yoil) => (
                <span key={`${yoil}`}>{yoil}</span>
              ))}
            </p>
          )}
        </li>
        <li>
          <span>
            <Icon icon="clarity:alarm-clock-solid" />
          </span>
          시간대
        </li>
        <li>{morningOrAfternoon} ~</li>
        <li>
          <span>
            <Icon icon="ic:baseline-place" width="1em" height="1em" />
          </span>
          장소
        </li>
        <li>{walkDetail.place}</li>
      </>
    </ul>
  );
}
