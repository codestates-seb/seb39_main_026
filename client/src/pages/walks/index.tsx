import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import DogChoiceModal from '../../components/DogChoiceModal';
import LoginOfferModal from '../../components/LoginOfferModal';
import SearchInput from '../../components/SearchInput';
import TabTitle from '../../components/TabTitle';
import AddButton from '../../components/walks/AddButton';
import AddressPicker from '../../components/walks/AddressPicker';
import WalksList from '../../components/walks/WalksList';
import UserState from '../../states/UserState';
import { Theme } from '../../styles/Theme';

const header = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const walksWrapper = css`
  margin: 0 1rem;
  padding-bottom: 100px;

  h2 {
    font-weight: 500;
    font-size: 22px;
    text-align: center;
  }

  .alert {
    text-align: center;
    margin: 2rem;
    color: ${Theme.disableColor};
  }
`;

export default function Walks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useRecoilState(UserState);
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState('');
  const [isLoginOfferModalOpen, setIsLoginOfferModalOpen] = useState(false);

  const handleModalClick = () => {
    if (user == null) {
      setIsLoginOfferModalOpen(true);
      return;
    }

    if (!localStorage.getItem('currentAddress')) {
      alert('동네를 선택해주세요');
      return;
    }

    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setAddress(localStorage.getItem('currentAddress') || '');
  }, []);

  return (
    <>
      <TabTitle prefix="모임 둘러보기" />

      <h1
        css={css`
          cursor: default;
          font-size: 1px;
          opacity: 0%;
        `}
      >
        모임 둘러보기
      </h1>
      <section>
        <div css={header}>
          <SearchInput setQuery={setQuery} />
          <AddressPicker setAddress={setAddress} />
        </div>
        <div css={walksWrapper}>
          <h2>🐕 모든 산책 보기</h2>
          {address ? (
            <WalksList
              query={`?si=${address?.split(' ')[0]}&gu=${
                address?.split(' ')[1]
              }&dong=${address?.split(' ')[2]}${query}`}
            />
          ) : (
            <p className="alert">동네를 선택하세요</p>
          )}
          <AddButton onClick={handleModalClick} />
        </div>
      </section>

      {isLoginOfferModalOpen && (
        <LoginOfferModal
          isLoginOfferModalOpen={isLoginOfferModalOpen}
          setIsLoginOfferModalOpen={setIsLoginOfferModalOpen}
        />
      )}

      {isModalOpen && (
        <DogChoiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          goToWalksWrite={true}
        />
      )}
    </>
  );
}
