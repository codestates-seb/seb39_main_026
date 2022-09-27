import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import DogChoiceModal from '../../components/DogChoiceModal';
import SearchInput from '../../components/SearchInput';
import TabTitle from '../../components/TabTitle';
import AddButton from '../../components/walks/AddButton';
import AddressPicker from '../../components/walks/AddressPicker';
import WalksList from '../../components/walks/WalksList';
import UserState from '../../states/UserState';

export default function Walks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useRecoilState(UserState);
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState(
    localStorage.getItem('currentAddress') || ''
  );
  const router = useRouter();

  const handleModalClick = () => {
    if (user == null) {
      router.push('/login');
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

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
    h2 {
      font-weight: 500;
      font-size: 22px;
      text-align: center;
    }
  `;

  return (
    <>
      {isModalOpen && (
        <DogChoiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
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
        <TabTitle prefix="모임 둘러보기" />
        <div css={header}>
          <SearchInput setQuery={setQuery} />
          <AddressPicker setAddress={setAddress} />
        </div>
        <div css={walksWrapper}>
          <h2>🐕 모든 산책 보기</h2>
          <WalksList
            query={`?si=${address?.split(' ')[0]}&gu=${
              address?.split(' ')[1]
            }&dong=${address?.split(' ')[2]}${query}`}
          />
          <AddButton onClick={handleModalClick} />
        </div>
      </section>
    </>
  );
}
