import { css } from '@emotion/react';
import { skeletonGradient } from '../../../styles/GlobalStyle';

export default function LoadingPets() {
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
  );
}
