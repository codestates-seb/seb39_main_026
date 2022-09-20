import { css } from '@emotion/react';
import { skeletonGradient } from '../../../styles/GlobalStyle';

export default function LoadingWalkItem() {
  const walkitem = css`
    cursor: pointer;
    width: 320px;
    box-shadow: 4px 4px 30px #00000020;
    margin: 1rem 0.5rem;
    border-radius: 15px;
    -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
    animation: ${skeletonGradient} 1.8s infinite ease-in-out;
    color: transparent;
    .img {
      border-radius: 15px 15px 0 0;
      height: 120px;
      width: 321px;
      -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      color: transparent;
    }
    .walk_wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 1rem;
      -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      color: transparent;
      border-radius: 0 0 15px 15px;
    }
    .walk_info {
      padding-right: 0.5rem;
      .walk_title {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 0.5rem;
        -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        color: transparent;
      }
      .walk_des {
        font-size: 10px;
        -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        color: transparent;
      }
    }
    span {
      padding: 0rem 0.2rem;
      font-size: 10px;
      -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      color: transparent;
    }
    .status {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: 8px;
        margin-bottom: 0.2rem;
      }
      button {
        font-size: 14px;
        height: 30px;
        width: 74px;
        border-radius: 0.5rem;
        border: none;
        -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        animation: ${skeletonGradient} 1.8s infinite ease-in-out;
        color: transparent;
      }
    }
  `;

  return (
    <div css={walkitem}>
      <div className="img" />
      <div className="walk_wrapper">
        <div className="walk_info">
          <h1 className="walk_title">아직 컴포넌트가 로딩중이에요!</h1>
          <h3 className="walk_des">time</h3>
          <h3 className="walk_des">address</h3>
        </div>
        <div className="status">
          <p>0자리 남았어요!</p>
          <button>모집중</button>
        </div>
      </div>
    </div>
  );
}
