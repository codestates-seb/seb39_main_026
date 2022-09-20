import { css } from '@emotion/react';
import Image from 'next/image';
import { UserDefault } from '../../models/UserDefault';
import { skeletonGradient } from '../../styles/GlobalStyle';
import { Theme } from '../../styles/Theme';

export default function UserInfo({ data }: UserDefault) {
  const userInfo = css`
    display: flex;
    margin-bottom: 1.5rem;
    .img {
      border-radius: 50%;
      object-fit: cover;
      width: 75px;
      height: 75px;
      background-color: ${Theme.disableBgColor};
    }
    .username {
      margin-top: 0.4rem;
      font-size: 22px;
      font-weight: 400;
      margin-left: 1rem;
    }
  `;

  const LoadingUserInfo = css`
    display: flex;
    margin-bottom: 1.5rem;
    .img {
      border-radius: 50%;
      object-fit: cover;
      width: 75px;
      height: 75px;
      -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      color: transparent;
    }
    .username {
      margin-top: 0.4rem;
      font-size: 22px;
      margin-left: 1rem;
      -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      animation: ${skeletonGradient} 1.8s infinite ease-in-out;
      color: transparent;
    }
  `;
  return (
    <>
      {typeof data !== 'string' ? (
        <div css={userInfo}>
          <div className="img">
            <Image
              alt={`${data.username}'s profile`}
              src={data.imgUrl}
              width="75px"
              height="75px"
              className="img"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          </div>
          <p className="username">{data.username}</p>
        </div>
      ) : (
        <div css={LoadingUserInfo}>
          <div className="img"></div>
          <p className="username">🐾🐾🐾</p>
        </div>
      )}
    </>
  );
}
