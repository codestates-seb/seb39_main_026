import { css } from '@emotion/react';
import { useState } from 'react';
import DogChoiceModal from '../../components/DogChoiceModal';
import SearchInput from '../../components/SearchInput';
import TabTitle from '../../components/TabTitle';
import AddButton from '../../components/walks/AddButton';
import AddressPicker from '../../components/walks/AddressPicker';
import WalksList from '../../components/walks/WalksList';

export default function Walks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const header = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2rem;
  `;

  return (
    <>
      {isModalOpen && (
        <DogChoiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <section>
        <TabTitle prefix="모임 둘러보기" />
        <div css={header}>
          <SearchInput />
          <AddressPicker />
        </div>
        <h1>모든 산책 보기</h1>
        <WalksList />
        <AddButton onClick={handleModalClick} />
      </section>
    </>
  );
}
