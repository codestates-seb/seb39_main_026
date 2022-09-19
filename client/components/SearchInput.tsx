import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Theme } from '../styles/Theme';

export default function SearchInput() {
  const [searchInput, setSearchInput] = useState('');
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value);
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
        value={searchInput}
      />
    </div>
  );
}
