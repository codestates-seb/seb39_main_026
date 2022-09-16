import { css } from '@emotion/react';
import { WalkDefault } from '../../models/WalkDefault';
import WalkItem from './WalkItem';
import { useGetWalksQuery } from './WalksListQuery';

export default function WalksList() {
  const data = useGetWalksQuery();
  const walksList = css`
    display: flex;
  `;

  return (
    <section css={walksList}>
      {data.communities
        ? data.communities.map((walk: WalkDefault) => {
            return <WalkItem key={walk.projectId} walk={walk} />;
          })
        : ''}
    </section>
  );
}
