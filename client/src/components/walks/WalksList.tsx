/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useGetWalksQuery } from '../../hooks/WalksQuery';
import { WalkDefault } from '../../models/WalkDefault';
import { Theme } from '../../styles/Theme';
import WalkItem from './WalkItem';
import LoadingWalkItem from './skeleton/LoadingWalkItem';

const walksList = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 350px));
  justify-items: center;
  justify-content: center;
  grid-gap: 1rem;
  margin-top: 2rem;

  p.alert {
    margin: 2rem;
    color: ${Theme.disableColor};
  }

  @media screen and (max-width: 350px) {
    grid-template-columns: minmax(250px, 1fr);
  }
`;

export default function WalksList({ query }: { query: string }) {
  const getWalksQuery = useGetWalksQuery(query);

  useEffect(() => {
    getWalksQuery.refetch();
  }, [query]);

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
