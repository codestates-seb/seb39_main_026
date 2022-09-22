import { css } from '@emotion/react';
import Image from 'next/image';
import { MyPets } from '../../models/MyPets';
import { Theme } from '../../styles/Theme';
import SelectButton from './SelectButton';

export default function PetEditInfo({ pet }: { pet: MyPets }) {
  const petInfo = css`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: ${Theme.disableBgColor};
      object-fit: cover;
    }
    dl {
      display: grid;
      grid-template-columns: 50% 50%;
      font-size: 18px;
      dt {
        padding: 1rem;
        border-bottom: 1px solid ${Theme.divisionLineColor};
      }
      dd {
        padding: 1rem;
        border-bottom: 1px solid ${Theme.divisionLineColor};
        input {
          font-size: 18px;
          border: 0;
          text-align: right;
          :focus {
            outline: none;
          }
        }
      }
    }
  `;

  return (
    <div css={petInfo}>
      <div className="img">
        <Image
          alt={`${pet.petName}`}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/pets/img/${pet.imgUrl}`}
          width="100px"
          height="100px"
        />
      </div>
      <dl>
        <dt>이름</dt>
        <dd>
          <input type="text" defaultValue={pet.petName} />
        </dd>
        <dt>생일</dt>
        <dd>
          {pet.petAges.years}년 {pet.petAges.months}월 {pet.petAges.days}일
        </dd>
        <dt>성별</dt>
        <dd>
          <SelectButton left="여" right="남" select={pet.petGender} />
        </dd>
        <dt> 견종</dt>
        <dd>
          <input type="text" defaultValue={pet.breed} />
        </dd>
        <dt>중성화를 했나요?</dt>
        <dd>
          <SelectButton left="O" right="X" select={pet.neuter} />
        </dd>
        <dt>우리 강아지는 어떤 성향인가요?</dt>
        <dd>
          <ul>
            {pet.personality}
            <li>느긋해요</li>
            <li>사교적이에요</li>
            <li>독립적이에요</li>
            <li>고집이 세요</li>
            <li>겁이 많아요</li>
          </ul>
        </dd>
        <dt>우리 강아지를 소개해주세요!</dt>
        <dd>
          <input type="text" defaultValue={pet.about} />
        </dd>
      </dl>
    </div>
  );
}
