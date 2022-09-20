import { css } from '@emotion/react';
import Image from 'next/image';
import { MyPets } from '../../models/MyPets';

export default function PetInfo({ pets }: { pets: [MyPets] }) {
  const mypet = css`
    margin-bottom: 1.2rem;
    display: flex;
    .petInfo {
      margin-right: 0.5rem;
      .petImg {
        border-radius: 50%;
        object-fit: cover;
      }
      .petName {
        font-size: 0.8rem;
        text-align: center;
        font-weight: 500;
      }
    }
  `;
  return (
    <div css={mypet}>
      {pets?.map((pet: MyPets) => {
        return (
          <div className="petInfo" key={pet.id}>
            <Image
              src={pet.imgUrl}
              alt={`${pet.petName}'s picture`}
              height="50px"
              width="50px"
              className="petImg"
            />
            <p className="petName">{pet.petName}</p>
          </div>
        );
      })}
    </div>
  );
}
