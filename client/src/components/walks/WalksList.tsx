import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WalkDefault } from '../../models/WalkDefault';
import { Theme } from '../../styles/Theme';
import WalkItem from './WalkItem';
import LoadingWalkItem from './skeleton/LoadingWalkItem';

export default function WalksList({ query }: { query: string }) {
  const [walks, setWalks] = useState<WalkDefault[]>();
  let url: string;
  if (query) {
    url = `${process.env.NEXT_PUBLIC_BASE_URL}/community${query}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_BASE_URL}/community`;
  }

  useEffect(() => {
    axios.get(url).then((res) => {
      setWalks(res.data.communityList);
      console.log(res);
    });
  }, [url]);

  const walksList = css`
    display: flex;
    justify-content: center;
    p.alert {
      margin: 2rem;
      color: ${Theme.disableColor};
    }
    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;
  useEffect(() => {
    console.log(walks);
  }, []);
  return (
    <section css={walksList}>
      {walks === undefined && <LoadingWalkItem />}
      {walks &&
        walks.length > 0 &&
        walks.map((walk: WalkDefault) => {
          return <WalkItem key={walk.communityId} walk={walk} />;
        })}
      {walks && walks.length === 0 && (
        <p className="alert">아직 등록된 산책 모임이 없어요!</p>
      )}
    </section>
  );
}
