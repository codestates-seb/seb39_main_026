import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';
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
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}/members/img/${data.id}`
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleNameEdit = async () => {
    if (isNameEditMode === true) {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/members/${data.id}`,
          { username: name },
          {
            headers: {
              authorization: localStorage.getItem('accessToken') || '',
              refresh_token: localStorage.getItem('refreshToken') || '',
            },
          }
        )
        .then((res) => setName(res.data.username))
        .catch((err) => {
          if (err.response.headers.authorization) {
            localStorage.setItem(
              'accessToken',
              err.response.headers.authorization
            );
          }
        });
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

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    const uploadImg = e.target.files[0];
    const formData = new FormData();
    formData.append('imgFile', uploadImg);
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/members/img/${data.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: localStorage.getItem('accessToken') || '',
            refresh_token: localStorage.getItem('refreshToken') || '',
          },
        }
      )
      .then((response) => {
        setImgSrc(URL.createObjectURL(uploadImg));
        console.log(response.data);
      })
      .catch((err) => {
        if (err.response.headers.authorization) {
          localStorage.setItem(
            'accessToken',
            err.response.headers.authorization
          );
        }
        console.error(err);
      });
  };

  useEffect(() => {
    setName(data.username);
    setImgSrc(data.imgUrl);
  }, [data]);

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
          <div className="img" onClick={onUploadImgClick}>
            <Image
              alt={`${name}'s profile`}
              src={imgSrc}
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
