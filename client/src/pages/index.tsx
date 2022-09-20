import { css } from '@emotion/react';
import type { NextPage } from 'next';
import MainImage from '../components/MainImage';
import TabTitle from '../components/TabTitle';
import AddressPicker from '../components/walks/AddressPicker';
import WalksList from '../components/walks/WalksList';

const Home: NextPage = () => {
  const index = css`
    margin-bottom: 4rem;
    .new_walks,
    .hot_walks {
      margin: 1rem;
    }
    .walks_title {
      font-weight: 500;
      font-size: 22px;
    }
  `;
  return (
    <section css={index}>
      <TabTitle prefix="지금 핫한 모임" />
      <MainImage />
      <AddressPicker />
      <div className="new_walks">
        <h2 className="walks_title">✨ 동네 신규 산책</h2>
        <WalksList />
      </div>
      <div className="hot_walks">
        <h2 className="walks_title">🔥 마감 임박 산책 </h2>
        <WalksList />
      </div>
    </section>
  );
};

export default Home;
