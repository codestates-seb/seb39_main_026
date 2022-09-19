import { css, keyframes } from '@emotion/react';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Theme } from '../../styles/Theme';

interface Address {
  code: string;
  name: string;
}

export default function AddressModal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [allcities, setAllCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [alltowns, setAllTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState('');
  const [allVillages, setAllVillages] = useState([]);

  const handleRegion1Select = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region1Code = event.target.value.substring(0, 2);
    setSelectedCity(region1Code);
  };
  const handleRegion2Select = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region2Code = event.target.value.substring(0, 4);
    setSelectedTown(region2Code);
  };

  const handleRegion3Select = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('currentAddress', event.target.value);
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_ADDRESS_API_URL}*00000000`)
      .then((res) => setAllCities(res.data.regcodes));
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ADDRESS_API_URL}${selectedCity}*000000*&is_ignore_zero=true`
      )
      .then((res) => {
        if (selectedCity !== '') {
          setAllTowns(res.data.regcodes);
        }
      });
  }, [selectedCity]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ADDRESS_API_URL}${selectedTown}*&is_ignore_zero=true`
      )
      .then((res) => {
        if (selectedTown !== '') {
          setAllVillages(res.data.regcodes);
        }
      });
  }, [selectedTown]);

  const modalContainer = (isModalOpen: boolean) => css`
    &.modal-wrapper {
      display: flex;
      align-items: end;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    &.modal-wrapper section.modal {
      width: 100%;
      max-width: 1200px;
      border-radius: 20px 20px 0 0;
      padding: 42px 41px 22px;
      background-color: #fff;
      z-index: 1;

      h1 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 1.5rem;

        @media screen and (max-width: 305px) {
          font-size: 1.1rem;
          word-break: keep-all;
        }
      }

      ul {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 19px;
        overflow-x: scroll;
      }

      ul li {
        margin: 28px 0;
      }

      ul li {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          cursor: pointer;
          filter: grayscale(100%);
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
        }

        p {
          font-size: 0.9rem;
          font-weight: 500;
          -ms-user-select: none;
          -moz-user-select: -moz-none;
          -khtml-user-select: none;
          -webkit-user-select: none;
          user-select: none;
        }
      }

      ul li.pick {
        img {
          filter: grayscale(0);
        }

        p {
          color: ${Theme.mainColor};
          font-weight: bold;
        }
      }
    }

    section.modal {
      display: ${isModalOpen ? 'block' : 'none'};
      animation: ${isModalOpen ? fadeIn : fadeOut} 0.4s ease-out;
    }
  `;

  const AddressPickerContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    select {
      background-color: ${Theme.inputBgColor};
      text-align: center;
      font-size: 11px;
      border-radius: 0.5rem;
      border: 0;
      padding: 1rem;
      margin-bottom: 1rem;
      font-weight: 500;
      height: 3rem;
    }
  `;

  const fadeIn = keyframes`
0% {
  transform: translateY(100%);
}

100% {
  transform: translateY(0px);
}
`;

  const fadeOut = keyframes`
0% {
  transform: translateY(0px);
}

100% {
  transform: translateY(100%);
}
`;

  return (
    <div
      css={modalContainer(isModalOpen)}
      className="modal-wrapper"
      onClick={() => setIsModalOpen(false)}
    >
      <section onClick={(e) => e.stopPropagation()} className="modal">
        <h1>산책할 지역을 골라주세요.</h1>
        <div css={AddressPickerContainer}>
          <select name="region1" onChange={handleRegion1Select}>
            <option>지역을 선택하세요</option>
            {allcities.map((city: Address) => {
              return (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              );
            })}
          </select>
          <select name="region2" onChange={handleRegion2Select}>
            <option>동네를 선택하세요</option>
            {alltowns?.map((town: Address) => {
              return (
                <option key={town.code} value={town.code}>
                  {town.name.split(' ')[1]}
                </option>
              );
            })}
          </select>
          <select name="region3" onChange={handleRegion3Select}>
            <option>동네를 선택하세요</option>
            {allVillages?.map((village: Address) => {
              return (
                <option key={village.code} value={village.name}>
                  {village.name.split(' ')[2]}
                </option>
              );
            })}
          </select>
        </div>
      </section>
    </div>
  );
}
