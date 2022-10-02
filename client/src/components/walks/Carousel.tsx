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
    height: unset;
  }

  position: relative;
  overflow: hidden;
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
    height: 100%;
    align-items: center;
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
  // walkDetail,
  carouselDefaultHeight,
}: {
  walkDetail: WalkDetail;
  carouselDefaultHeight?: string;
}) {
  const [imgCarouselIndex, setImgCarouselIndex] = useState(0);
  const [slideStart, setSlideStart] = useState(0);
  const [slideEnd, setSlideEnd] = useState(0);

  const handleCarouselButtonClick = (type: string) => {
    if (type === 'next') {
      // if (imgCarouselIndex === walkDetail.imgUrls.length - 1) {
      if (imgCarouselIndex === 2) {
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
  };

  const handleCarouselSlide = () => {
    console.log('slideStart', slideStart);
    console.log('slideEnd', slideEnd);
    console.log(slideStart - slideEnd);
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
        {/* {imgCarouselIndex + 1} / {walkDetail.imgUrls.length} */}
        {imgCarouselIndex + 1} / 3
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
        {/* {walkDetail.imgUrls.map((img) => (
          <img src={img} alt="walk" key={img} />
        ))} */}
        <img
          src="https://cdn.pixabay.com/photo/2022/08/21/21/24/colours-7402147_960_720.jpg"
          alt="기타치는 할아버지"
        />
        <img
          src="https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_960_720.jpg"
          alt="코기"
        />
        <img
          src="https://cdn.pixabay.com/photo/2016/03/27/20/51/dogs-1284238_960_720.jpg"
          alt="자고 있는 겸둥이 강쥐들"
        />
      </section>
      <button onClick={() => handleCarouselButtonClick('prev')}>
        <Icon icon="ooui:next-rtl" />
      </button>
      <button onClick={() => handleCarouselButtonClick('next')}>
        <Icon icon="ooui:next-ltr" />
      </button>
    </article>
  );
}
