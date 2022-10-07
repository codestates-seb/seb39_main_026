import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { API } from '../../apis/api';
import { MyPets } from '../../models/MyPets';
import { Theme } from '../../styles/Theme';
import PetEditInfo from './PetEditInfo';
export default function PetEditOverlay({
  setIsPetEditMode,
  id,
}: {
  setIsPetEditMode: Dispatch<SetStateAction<boolean>>;
  id: number;
}) {
  const handleCloseClick = () => {
    setIsPetEditMode(false);
  };

  const overlay = css`
    position: absolute;
    z-index: 1;
    max-width: 1200px;
    margin: 75px auto 0;
    min-height: calc(100vh - 75px);
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: white;
    padding-top: 1rem;
    .closeBtn {
      cursor: pointer;
      border: 0;
      background-color: transparent;
      margin-left: 1rem;
      .closeIcon {
        font-size: 1.5rem;
        color: ${Theme.mainColor};
      }
    }
    @media screen and (max-width: 768px) {
      margin: 0px 0 72px;
    }
  `;
  const [dogInfoData, setDogInfoData] = useState<MyPets>();

  const getDogInfo = async (id: number) => {
    const response = await axios.get(`${API.PETS}/${id}`);
    setDogInfoData(response.data);
  };
  useEffect(() => {
    if (id === -1) {
      setDogInfoData({
        id: -1,
        petName: '',
        breed: '',
        about: '',
        imgUrl: '',
        petGender: '',
        personality: '',
        neuter: '',
        petAges: {
          years: 0,
          months: 0,
          days: 0,
          birthDay: '연도-월-일',
        },
      });
      return;
    }
    getDogInfo(id);
  }, [id]);

  return (
    <>
      {dogInfoData && (
        <section css={overlay}>
          <button onClick={handleCloseClick} className="closeBtn">
            <Icon icon="ci:close-big" className="closeIcon" />
          </button>
          <PetEditInfo pet={dogInfoData} setIsPetEditMode={setIsPetEditMode} />
        </section>
      )}
    </>
  );
}
