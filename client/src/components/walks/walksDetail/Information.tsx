import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { WalkDetail } from '../../../models/WalkDefault';
import LoadingInfo from '../skeleton/walksDetail/LoadingInfo';

const informationContainer = css`
  display: grid;
  grid-template-columns: 180px 1fr;
  padding: 32px 23px;
  gap: 20px 0;
  align-items: center;

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

export default function Information({ walksData }: { walksData: WalkDetail }) {
  const moimDate = walksData?.dayInfo;
  const moimTime = walksData?.time;
  return (
    <ul css={informationContainer}>
      {walksData == null ? (
        <LoadingInfo />
      ) : (
        <>
          <li>
            <span>
              <Icon icon="clarity:date-solid" />
            </span>
            일시
          </li>
          <li>{moimDate}</li>
          <li>
            <span>
              <Icon icon="clarity:alarm-clock-solid" />
            </span>
            시간대
          </li>
          <li>{moimTime} ~</li>
          <li>
            <span>
              <Icon icon="ic:baseline-place" width="1em" height="1em" />
            </span>
            장소
          </li>
          <li>{walksData.place}</li>
        </>
      )}
    </ul>
  );
}
