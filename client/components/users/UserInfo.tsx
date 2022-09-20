import { css } from '@emotion/react';
import Image from 'next/image';
import { UserDefault } from '../../models/UserDefault';

export default function UserInfo({ data }: UserDefault) {
  const userInfo = css`
    display: flex;
    margin-bottom: 1.5rem;
    .img {
      border-radius: 50%;
      object-fit: cover;
    }
    .username {
      margin-top: 0.4rem;
      font-size: 22px;
      font-weight: 400;
      margin-left: 1rem;
    }
  `;
  return (
    <div css={userInfo}>
      <div className="img">
        <Image
          alt={`${data.username}'s profile`}
          src={data.imgUrl}
          width="75px"
          height="75px"
          className="img"
        />
      </div>
      <p className="username">{data.username}</p>
    </div>
  );
}
