import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useGetWalksQuery } from '../../hooks/WalksListQuery';
import { WalkDefault } from '../../models/WalkDefault';
import { Theme } from '../../styles/Theme';
import WalkItem from './WalkItem';
import LoadingWalkItem from './skeleton/LoadingWalkItem';

export default function WalksList({ query }: { query: string }) {
  const getWalksQuery = useGetWalksQuery(query);

  useEffect(() => {
    getWalksQuery.refetch();
  }, [getWalksQuery]);

  const walksList = css`
    display: grid;
    grid-template-columns: 30% 30% 30%;
    place-content: center;
    p.alert {
      margin: 2rem;
      color: ${Theme.disableColor};
    }
    @media screen and (max-width: 1200px) {
      display: grid;
      grid-template-columns: 45% 45%;
      place-content: center;
    }
    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;

  return (
    <section css={walksList}>
      {getWalksQuery.isLoading && <LoadingWalkItem />}
      {getWalksQuery.isSuccess &&
        getWalksQuery.data.map((walk: WalkDefault) => {
          return <WalkItem key={walk.communityId} walk={walk} />;
        })}
      {getWalksQuery.isSuccess && getWalksQuery.data.length === 0 && (
        <p className="alert">아직 등록된 산책 모임이 없어요!</p>
      )}
    </section>
  );
}
