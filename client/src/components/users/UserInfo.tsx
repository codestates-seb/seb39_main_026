import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useState } from 'react';
import { UserDefault } from '../../models/UserDefault';
import { skeletonGradient } from '../../styles/GlobalStyle';
import { Theme } from '../../styles/Theme';

export default function UserInfo({
  data,
  isValidated,
}: {
  data: UserDefault;
  isValidated: boolean;
}) {
  const [isNameEditMode, setIsNameEditMode] = useState(false);
  const [name, setName] = useState(data.username);

  const handleNameEdit = async () => {
    if (isNameEditMode === true) {
      // 프로필 이름 수정 api 요청하는 부분
    }
    setIsNameEditMode(!isNameEditMode);
  };

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

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
    input {
      margin-top: 0.4rem;
      font-size: 22px;
      font-weight: 400;
      margin-left: 1rem;
      border: 0;
      border-bottom: 1px solid ${Theme.divisionLineColor};
      padding: 0.4rem 0;
      height: 27px;
      width: 10rem;
      :focus {
        outline: none;
      }
    }
    .icon {
      cursor: pointer;
      margin: 0.5rem 0 0 0.2rem;
      font-size: 1.3rem;
      color: ${Theme.disableColor};
      :hover {
        color: inherit;
      }
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
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/members/img/${data.imgUrl}`}
              width="75px"
              height="75px"
              className="img"
            />
          </div>
          {isNameEditMode ? (
            <input
              type="text"
              defaultValue={name}
              onChange={handleNameChange}
            />
          ) : (
            <p className="username">{data.username}</p>
          )}
          {isValidated && (
            <Icon
              icon="ant-design:edit-outlined"
              className="icon"
              onClick={handleNameEdit}
            />
          )}
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
