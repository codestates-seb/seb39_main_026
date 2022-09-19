import { useState } from 'react';
import DogChoiceModal from '../../components/DogChoiceModal';
import TabTitle from '../../components/TabTitle';
import AddButton from '../../components/walks/AddButton';
import AddressPicker from '../../components/walks/AddressPicker';
import WalksList from '../../components/walks/WalksList';

export default function Walks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClick = () => {
    setIsModalOpen(!isModalOpen);
  };

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
        <AddressPicker />
        <h1>모든 산책 보기</h1>
        <WalksList />
        <AddButton onClick={handleModalClick} />
      </section>
    </>
  );
}
