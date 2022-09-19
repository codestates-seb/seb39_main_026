import { css } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Address {
  code: string;
  name: string;
}

export default function AddressPicker() {
  const [allcities, setAllCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [alltowns, setAllTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState('');
  const [allVillages, setAllVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState('');

  const handleRegion1Select = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region1Code = event.target.value.substring(0, 2);
    setSelectedCity(region1Code);
  };
  const handleRegion2Select = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region2Code = event.target.value.substring(0, 4);
    setSelectedTown(region2Code);
  };

  const handleRegion3Select = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVillage(event.target.value);
    console.log(selectedVillage);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_ADDRESS_API_URL}*00000000`)
      .then((res) => setAllCities(res.data.regcodes));
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

  const AddressPickerContainer = css`
    display: flex;
    justify-content: flex-end;
  `;

  return (
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
  );
}
