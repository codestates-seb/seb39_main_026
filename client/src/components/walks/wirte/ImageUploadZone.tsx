/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { Theme } from '../../../styles/Theme';

const imageUploadZoneContainer = css`
  display: flex;
  align-items: center;
  gap: 14px;
  overflow: scroll;
  padding-bottom: 16px;

  li {
    width: 150px;
    min-width: 150px;
    height: 200px;
    background-color: #f7f7f5;
    border-radius: 15px;
    padding: 10px;

    input[type='file'] {
      display: none;
    }

    label {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  li.image-box {
    position: relative;

    .image-delete-button {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.4rem;
      color: ${Theme.mainColor};
      cursor: pointer;
    }
  }
`;

export default function ImageUploadZone({
  moimImages,
  setMoimImages,
}: {
  moimImages: File[];
  setMoimImages: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  // 이미지 관련
  const handleMoimImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const imageFile = event.target.files;

      if (imageFile['length'] > 3) {
        alert('이미지는 최대 3개까지 등록 가능합니다.');
        return;
      }
      if (moimImages.length > 2) {
        alert('이미지는 최대 3개까지 등록 가능합니다.');
        return;
      }
      if (moimImages.length + imageFile['length'] > 3) {
        alert('이미지는 최대 3개까지 등록 가능합니다.');
        return;
      } else {
        setMoimImages([...moimImages, ...Array.from(imageFile)]);
      }
    }
  };

  return (
    <>
      <label
        css={css`
          font-size: 1.1rem;
          font-weight: 600;
        `}
      >
        모임의 대표 사진을 올려주세요.
      </label>
      <ul css={imageUploadZoneContainer}>
        <li>
          <label htmlFor="moimImage">
            <Icon icon="ant-design:camera-twotone" className="camera" />
            <p>{moimImages.length} / 3</p>
          </label>
          <input
            id="moimImage"
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => handleMoimImageChange(e)}
          />
        </li>
        {moimImages.map((image, index) => (
          <li key={`${image['name']}-${index}`} className="image-box">
            <Icon
              icon="ant-design:close-circle-filled"
              className="image-delete-button"
              onClick={() => {
                setMoimImages(moimImages.filter((_, i) => i !== index));
              }}
            />
            <img src={URL.createObjectURL(image)} alt={image['name']} />
          </li>
        ))}
      </ul>
    </>
  );
}
