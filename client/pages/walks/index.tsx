import { useState } from 'react';
import DogChoiceModal from '../../components/DogChoiceModal';
import TabTitle from '../../components/TabTitle';

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
        <h1>산책 공고 페이지 입니다!</h1>
        <button type="button" onClick={handleModalClick}>
          산책 모임 만들기
        </button>
      </section>
    </>
  );
}
