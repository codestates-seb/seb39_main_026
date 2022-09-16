import { css } from '@emotion/react';
import WalkItem from './WalkItem';
import { useGetWalksQuery } from './WalksListQuery';

interface WalkDefault {
  projectId: number;
  title: string;
  time: string;
  address: string;
  imgUrl: string;
  capacity: number;
  participant: number;
}

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
