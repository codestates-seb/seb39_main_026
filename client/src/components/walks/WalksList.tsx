import { css } from '@emotion/react';
import { WalkDefault } from '../../models/WalkDefault';
import WalkItem from './WalkItem';
import { useGetWalksQuery } from './WalksListQuery';
import LoadingWalkItem from './skeleton/LoadingWalkItem';

export default function WalksList() {
  const { communityList } = useGetWalksQuery();
  const walksList = css`
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;

  return (
    <section css={walksList}>
      {communityList ? (
        communityList.map((walk: WalkDefault) => {
          return <WalkItem key={walk.communityId} walk={walk} />;
        })
      ) : (
        <LoadingWalkItem />
      )}
    </section>
  );
}
