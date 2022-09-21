import { css } from '@emotion/react';
import Image from 'next/image';
import { MyPets } from '../../models/MyPets';
import { skeletonGradient } from '../../styles/GlobalStyle';
import { Theme } from '../../styles/Theme';

export default function PetInfo({ pets }: { pets: MyPets[] }) {
  const mypet = css`
    margin-bottom: 1.2rem;
    display: flex;
    .petInfo {
      margin-right: 0.5rem;
      .petImg {
        border-radius: 50%;
        object-fit: cover;
        height: 50px;
        width: 50px;
        background-color: ${Theme.disableBgColor};
      }
      .petName {
        font-size: 0.8rem;
        text-align: center;
        font-weight: 500;
      }
    }
  `;

  const loadingPets = css`
    margin-bottom: 1.2rem;
    display: flex;
    .petInfo {
      margin-right: 0.5rem;
      .petImg {
        border-radius: 50%;
        object-fit: cover;
        height: 50px;
        width: 50px;
        -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        color: transparent;
      }
      .petName {
        font-size: 0.8rem;
        text-align: center;
        font-weight: 500;
        -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        color: transparent;
      }
    }
  `;

  return (
    <>
      {pets ? (
        <div css={mypet}>
          {pets?.map((pet: MyPets) => {
            return (
              <div className="petInfo" key={pet.id}>
                <Image
                  src=""
                  // 서버에서 imgUrl 보내주면 교체할 것
                  height="50px"
                  width="50px"
                  alt={`${pet.petName}'s picture`}
                  className="petImg"
                />
                <p className="petName">{pet.petName}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div css={loadingPets}>
          <div className="petInfo">
            <div className="petImg"></div>
            <p className="petName">🐾</p>
          </div>
          <div className="petInfo">
            <div className="petImg"></div>
            <p className="petName">🐾</p>
          </div>
        </div>
      )}
    </>
  );
}
