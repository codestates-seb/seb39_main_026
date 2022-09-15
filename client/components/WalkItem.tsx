import { css } from '@emotion/react';
import Image from 'next/image';

interface EachWalk {
  walk: {
    title: string;
    time: string;
    address: string;
    imgUrl: string;
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
      font-size: 1rem;
    }
    .walk_des {
      display: inline;
      font-weight: 300;
      font-size: 0.8rem;
    }
    span {
      padding: 0rem 0.2rem;
    }
    @media screen and (max-width: 768px) {
      width: 147px;
      height: 216px;
      background-color: white;
      line-height: 1.2rem;
      span {
        display: none;
      }
    }
  `;
  return (
    <div css={walkitem}>
      <Image src={walk.imgUrl} alt="산책 모임 대표 이미지" />
      <h1 className="walk_title">{walk.title}</h1>
      <h3 className="walk_des">{walk.time}</h3>
      <span>|</span>
      <h3 className="walk_des">{walk.address}</h3>
    </div>
  );
}
