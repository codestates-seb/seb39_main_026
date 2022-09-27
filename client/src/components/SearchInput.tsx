import { css } from '@emotion/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Theme } from '../styles/Theme';

export default function SearchInput({
  setWalks,
}: {
  setWalks: Dispatch<SetStateAction<string>>;
}) {
  const [searchInput, setSearchInput] = useState('');
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value);
  };
  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setWalks(event.currentTarget.value);
    }
  };
  const searchContainer = css`
    display: flex;
    justify-content: center;
    input {
      margin-top: 1.5rem;
      border: 0;
      background-color: ${Theme.inputBgColor};
      height: 45px;
      width: 250px;
      border-radius: 25px;
      padding-left: 2rem;
      :focus {
        outline: none;
      }
    }
  `;
  return (
    <div css={searchContainer}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={handleInputChange}
        onKeyDown={handleSubmit}
        value={searchInput}
      />
    </div>
  );
}
