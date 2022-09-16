import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import WalksApi from '../apis/WalksApi';
import WalkItem from './WalkItem';

interface WalkDefault {
  createAt: string;
  title: string;
  time: string;
  address: string;
  imgUrl: string;
  capacity: number;
  participant: number;
}

export default function WalksList() {
  const [allWalks, setAllWalks] = useState([]);
  useEffect(() => {
    WalksApi.Walks.getAllWalks().then((data) => setAllWalks(data.communities));
  }, []);

  const walksList = css`
    display: flex;
  `;
  return (
    <section css={walksList}>
      {allWalks
        ? allWalks.map((walk: WalkDefault) => {
            return <WalkItem key={walk.createAt} walk={walk} />;
          })
        : ''}
    </section>
  );
}
