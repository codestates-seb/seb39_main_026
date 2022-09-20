import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface EachWalk {
  walk: {
    communityId: string;
    title: string;
    time: string;
    address: string;
    imgUrl: string;
    capacity: number;
    participant: number;
  };
}

export default function WalkItem({ walk }: EachWalk) {
  const router = useRouter();
  const handleItemClick = () => {
    router.push(`/walks/${walk.communityId}`);
  };
  const walkitem = css`
    cursor: pointer;
    width: 320px;
    box-shadow: 4px 4px 30px #00000020;
    margin: 1rem 0.5rem;
    border-radius: 15px;
    .img {
      border-radius: 15px 15px 0 0;
    }
    .walk_wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 1rem;
    }
    .walk_info {
      padding-right: 0.5rem;
      .walk_title {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 0.5rem;
      }
      .walk_des {
        font-weight: 300;
        font-size: 10px;
      }
    }
    span {
      padding: 0rem 0.2rem;
      font-size: 10px;
    }
    .status {
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
  `;
  return (
    <div css={walkitem} onClick={handleItemClick}>
      <Image
        className="img"
        src={walk.imgUrl}
        alt="산책 모임 대표 이미지"
        height="120px"
        width="321px"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
      <div className="walk_wrapper">
        <div className="walk_info">
          <h1 className="walk_title">{walk.title}</h1>
          <h3 className="walk_des">{walk.time}</h3>
          <h3 className="walk_des">{walk.address}</h3>
        </div>
        <div className="status">
          <p>
            {walk.capacity <= walk.participant
              ? '다음 기회에...'
              : `${walk.capacity - walk.participant}자리 남았어요!`}
          </p>
          <button>
            {walk.capacity <= walk.participant ? '모집마감' : '모집중'}
          </button>
        </div>
      </div>
    </div>
  );
}
