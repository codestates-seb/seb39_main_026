import { css } from '@emotion/react';
import { WalkDefault } from '../../models/WalkDefault';
import WalkItem from './WalkItem';
import { useGetWalksQuery } from './WalksListQuery';

export default function WalksList() {
  const data = useGetWalksQuery();
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
      {data.communities
        ? data.communities.map((walk: WalkDefault) => {
            return <WalkItem key={walk.communityId} walk={walk} />;
          })
        : ''}
    </section>
  );
}