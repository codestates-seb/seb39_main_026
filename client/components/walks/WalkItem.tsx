import { css } from '@emotion/react';
import Image from 'next/image';

interface EachWalk {
  walk: {
    title: string;
    time: string;
    address: string;
    imgUrl: string;
    capacity: number;
    participant: number;
  };
}

export default function WalkItem({ walk }: EachWalk) {
  const walkitem = css`
    width: 320px;
    height: 216px;
    box-shadow: 4px 4px 30px #00000020;
    border-radius: 1rem;
    margin: 1rem 0.5rem;
    padding: 1rem;
    .walk_title {
      font-weight: 500;
      font-size: 14px;
    }
    .walk_des {
      display: inline;
      font-weight: 300;
      font-size: 10px;
    }
    span {
      padding: 0rem 0.2rem;
      font-size: 10px;
    }
    .status {
      float: right;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: 8px;
        margin-bottom: 0.2rem;
        color: #dc602a;
      }
      button {
        font-size: 14px;
        height: 30px;
        width: 74px;
        border-radius: 0.5rem;
        border: none;
        background-color: #dc602a;
        color: white;
      }
    }
    @media screen and (max-width: 768px) {
      width: 147px;
      height: 216px;
      background-color: white;
      line-height: 1.2rem;
      .walk_des {
        display: block;
      }
      .status {
        display: none;
      }
      span {
        display: none;
      }
    }
  `;
  return (
    <div css={walkitem}>
      <Image
        src={walk.imgUrl}
        alt="산책 모임 대표 이미지"
        height="120px"
        width="321px"
        priority={true}
      />
      <h1 className="walk_title">{walk.title}</h1>
      <h3 className="walk_des">{walk.time}</h3>
      <span>|</span>
      <h3 className="walk_des">{walk.address}</h3>
      <div className="status">
        <p>
          {' '}
          {walk.capacity <= walk.participant
            ? '다음 기회에...'
            : `${walk.capacity - walk.participant}자리 남았어요!`}
        </p>
        <button>
          {walk.capacity <= walk.participant ? '모집마감' : '모집중'}
        </button>
      </div>
    </div>
  );
}
