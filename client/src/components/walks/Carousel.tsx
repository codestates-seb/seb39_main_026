/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { WalkDetail } from '../../models/WalkDefault';
import { Theme } from '../../styles/Theme';

const imgCarouselContainer = (
  index: number,
  carouselDefaultHeight?: string
) => css`
  @media screen and (max-width: 768px) {
    height: 400px;
  }

  @media screen and (max-width: 600px) {
    height: 300px;
  }

  @media screen and (max-width: 385px) {
    height: 200px;
  }

  position: relative;
  overflow: hidden;
  height: 200px;
  height: ${carouselDefaultHeight};
  width: 100%;

  p {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 2px 6px;
    background-color: ${Theme.mainColor};
    border-radius: 5px;
    color: #fff;
    font-size: 0.8rem;
    z-index: 1;
  }

  section {
    display: flex;
    min-width: 100%;
    height: 100%;
    transform: translateX(-${index * 100}%);

    img {
      width: 100%;
      object-fit: cover;
      font-size: 0;
    }

    transition: all 0.3s ease-out;
  }

  button {
    position: absolute;
    top: 50%;
    border: none;
    background-color: transparent;
    color: ${Theme.mainColor};
    font-size: 2rem;
    cursor: pointer;
  }

  button:first-of-type {
    left: 0;
  }

  button:nth-of-type(2) {
    right: 0;
  }
`;

export default function Carousel({
  walkDetail,
  carouselDefaultHeight,
}: {
  walkDetail?: WalkDetail;
  carouselDefaultHeight?: string;
}) {
  const [imgCarouselIndex, setImgCarouselIndex] = useState(0);
  const [slideStart, setSlideStart] = useState(0);
  const [slideEnd, setSlideEnd] = useState(0);

  const handleCarouselButtonClick = (type: string) => {
    if (walkDetail) {
      if (type === 'next') {
        if (imgCarouselIndex === walkDetail.imgUrls.length - 1) {
          return;
        } else {
          setImgCarouselIndex(imgCarouselIndex + 1);
        }
      } else if (type === 'prev') {
        if (imgCarouselIndex === 0) {
          return;
        } else {
          setImgCarouselIndex(imgCarouselIndex - 1);
        }
      }
    }
  };

  const handleCarouselSlide = () => {
    if (slideEnd === 0 || slideStart === 0) {
      return;
    }

    if (slideStart - slideEnd > 40) {
      handleCarouselButtonClick('next');
    } else if (slideStart - slideEnd < -50) {
      handleCarouselButtonClick('prev');
    }
  };

  return (
    <article
      css={imgCarouselContainer(imgCarouselIndex, carouselDefaultHeight)}
    >
      <p>
        {imgCarouselIndex + 1} / {walkDetail?.imgUrls.length}
      </p>
      <section
        onTouchStart={(e) => {
          setSlideStart(e.changedTouches[0].clientX);
        }}
        onTouchEnd={(e) => {
          setSlideEnd(e.changedTouches[0].clientX);
          handleCarouselSlide();
        }}
      >
        {walkDetail?.imgUrls.map((img) => (
          <div
            key={img}
            css={css`
              min-width: 100%;
            `}
          >
            <img src={img} alt="walk" />
          </div>
        ))}
      </section>
      <button
        onClick={() => handleCarouselButtonClick('prev')}
        css={css`
          display: ${imgCarouselIndex === 0 ? 'none' : 'block'};
        `}
      >
        <Icon icon="ooui:next-rtl" />
      </button>
      <button
        onClick={() => handleCarouselButtonClick('next')}
        css={css`
          display: ${imgCarouselIndex + 1 === walkDetail?.imgUrls.length
            ? 'none'
            : 'block'};
        `}
      >
        <Icon icon="ooui:next-ltr" />
      </button>
    </article>
  );
}
