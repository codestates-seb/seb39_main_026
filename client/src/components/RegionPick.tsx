import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Address {
  code: string;
  name: string;
}

export default function RegionPick() {
  const [allcities, setAllCities] = useState<Address[]>([]);
  const [alltowns, setAllTowns] = useState<Address[]>([]);
  const [allVillages, setAllVillages] = useState<Address[]>([]);

  const { watch, register } = useFormContext();

  const { si, gu } = watch();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_ADDRESS_API_URL}*00000000`)
      .then((res) => setAllCities(res.data.regcodes));
  }, []);

  useEffect(() => {
    if (si == null || si === '') {
      return;
    }

    const city = allcities.find((x) => x.name.endsWith(si));
    if (city == null) {
      return;
    }

    const code = city.code.slice(0, 2);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_ADDRESS_API_URL}${code}*000000*&is_ignore_zero=true`
      )
      .then((res) => setAllTowns(res.data.regcodes));
  }, [allcities, si]);

  useEffect(() => {
    if (gu == null || gu === '') {
      return;
    }

    console.log({ alltowns });

    const town = alltowns.find((x) => x.name.endsWith(gu));
    if (town == null) {
      return;
    }

    const code = town.code.slice(0, 4);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_ADDRESS_API_URL}${code}*&is_ignore_zero=true`
      )
      .then((res) => {
        setAllVillages(res.data.regcodes);
      });
  }, [alltowns, gu]);

  return (
    <>
      <select
        {...register('si', {
          required: '시/도를 선택해주세요',
          validate: {
            empty: (v) => (v != null && v !== '') || '시/도를 선택해주세요',
          },
        })}
      >
        <option value="">지역을 선택하세요</option>
        {allcities.map((city: Address) => {
          return (
            <option key={city.code} value={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
      <select
        {...register('gu', {
          required: '구역을 선택하세요',
          validate: {
            empty: (v) => (v != null && v !== '') || '구역을 선택해주세요',
          },
        })}
      >
        <option value="">구역을 선택하세요</option>
        {alltowns?.map((town: Address) => {
          return (
            <option
              key={town.code}
              value={town.name.split(' ').slice(1).join(' ')}
            >
              {town.name.split(' ')[1]}
            </option>
          );
        })}
      </select>
      <select
        {...register('dong', {
          required: '동네를 선택하세요',
          validate: {
            empty: (v) => (v != null && v !== '') || '동네를 선택해주세요',
          },
        })}
      >
        <option value="">동네를 선택하세요</option>
        {allVillages?.map((village: Address) => {
          return (
            <option
              key={village.code}
              value={village.name.split(' ').slice(2).join(' ')}
            >
              {village.name.split(' ')[2]} {village.name.split(' ')[3]}
            </option>
          );
        })}
      </select>
    </>
  );
}
