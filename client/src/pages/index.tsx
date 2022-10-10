import { css } from '@emotion/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import MainImage from '../components/MainImage';
import TabTitle from '../components/TabTitle';
import AddressPicker from '../components/walks/AddressPicker';
import WalksList from '../components/walks/WalksList';
import { Theme } from '../styles/Theme';

const index = css`
  margin-bottom: 4rem;
  margin-top: calc(30vh + 75px + 1rem);

  @media screen and (max-width: 768px) {
    margin-top: calc(30vh + 1rem);
  }

  .new_walks,
  .hot_walks {
    margin: 1rem;
  }
  .walks_title {
    font-weight: 500;
    font-size: 22px;
  }
  .alert {
    text-align: center;
    margin: 2rem;
    color: ${Theme.disableColor};
  }
`;

const Home: NextPage = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    setAddress(localStorage.getItem('currentAddress') || '');
  }, []);

  return (
    <>
      <TabTitle prefix="지금 핫한 모임" />
      <section css={index}>
        <MainImage />
        <AddressPicker setAddress={setAddress} />
        <div className="new_walks">
          <h2 className="walks_title">✨ 동네 신규 산책</h2>
          {address ? (
            <WalksList
              query={`/new?si=${address?.split(' ')[0]}&gu=${
                address?.split(' ')[1]
              }&dong=${address?.split(' ')[2]}`}
            />
          ) : (
            <p className="alert">동네를 선택하세요</p>
          )}
        </div>
        <div className="hot_walks">
          <h2 className="walks_title">🔥 마감 임박 산책 </h2>
          {address ? (
            <WalksList
              query={`/hot?si=${address?.split(' ')[0]}&gu=${
                address?.split(' ')[1]
              }&dong=${address?.split(' ')[2]}`}
            />
          ) : (
            <p className="alert">동네를 선택하세요</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
