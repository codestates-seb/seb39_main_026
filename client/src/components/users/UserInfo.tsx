import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';
import {
  useUpdateUserImgMutation,
  useUpdateUsernameMutation,
} from '../../hooks/UsersQuery';
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
  const { mutate: updateUsernameMutate } = useUpdateUsernameMutation();
  const { mutate: updateUserImgMutate } = useUpdateUserImgMutation();
  const [isNameEditMode, setIsNameEditMode] = useState(false);
  const [name, setName] = useState(data.username);
  const [imgSrc, setImgSrc] = useState(data.imgUrl);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleNameEdit = () => {
    if (isNameEditMode === true) {
      updateUsernameMutate({ id: data.id, username: name });
    }
    setIsNameEditMode(!isNameEditMode);
  };

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const onUploadImgClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      updateUserImgMutate({ id: data.id, file: e.target.files[0], setImgSrc });
    }
  };

  useEffect(() => {
    setName(data.username);
    setImgSrc(data.imgUrl);
  }, [data]);

  const userInfo = css`
    display: flex;
    margin-bottom: 1.5rem;
    .imgWrapper {
      border-radius: 50%;
      width: 75px;
      height: 75px;
      background-color: ${Theme.disableBgColor};
      position: relative;
    }
    .img {
      border-radius: 50%;
      width: 75px;
      height: 75px;
      object-fit: cover;
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
    .imgUpload {
      display: none;
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
    .camera {
      color: ${Theme.disableColor};
      position: absolute;
      top: 65%;
      left: 37%;
      font-size: 1.3rem;
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
      {data ? (
        <div css={userInfo}>
          <div className="imgWrapper" onClick={onUploadImgClick}>
            <Image
              alt={`${name}'s profile`}
              src={imgSrc || ''}
              width="75px"
              height="75px"
              className="img"
            />
            {isValidated && (
              <Icon icon="ant-design:camera-twotone" className="camera" />
            )}
          </div>
          {isNameEditMode ? (
            <input
              type="text"
              defaultValue={name}
              onChange={handleNameChange}
            />
          ) : (
            <p className="username">{name}</p>
          )}
          {isValidated && (
            <>
              <Icon
                icon="ant-design:edit-outlined"
                className="icon"
                onClick={handleNameEdit}
              />
              <input
                type="file"
                accept="image/*"
                className="imgUpload"
                onChange={onUploadImage}
                ref={inputRef}
              />
            </>
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
