import { css } from '@emotion/react';
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

    h2 {
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
`;

export default function StickyInfo({
  walksData,
  setIsModalOpen,
}: {
  walksData: WalkDetail;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const imgUrl = 'https://images.unsplash.com/photo-1585938389612-a552a28d6914';

  return (
    <div
      css={css`
        position: relative;
        height: 100%;
      `}
    >
      <aside css={infoContainer}>
        {walksData == null ? (
          <LoadingStickyInfo />
        ) : (
          <>
            <div
              css={css`
                background-image: url(${imgUrl});
                background-size: cover;
                background-position: center;
                height: 200px;
              `}
            ></div>
            <div className="info-content">
              <h2>{walksData?.name}</h2>
              <p>{walksData?.dayInfo}</p>
              <p>{walksData?.place}</p>
              <p>
                {walksData?.capacity - walksData?.participant}자리 남았어요!
              </p>
              <CommonButton type="button" onClick={() => setIsModalOpen(true)}>
                모임 참여하기
              </CommonButton>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
