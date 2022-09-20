import { css } from '@emotion/react';
import { Theme } from '../../../styles/Theme';

const inputContainer = css`
  display: grid;
  grid-template-columns: 1fr 50px;
  gap: 8px;

  input {
    background-color: ${Theme.divisionLineColor};
    border: 1px solid ${Theme.divisionLineColor};
    border-radius: 20px;
    padding: 0 18px;
  }

  button {
    padding: 10px 12px;
    border-radius: 10px;
    border: none;
    background-color: ${Theme.mainColor};
    color: #fff;
    cursor: pointer;
    font-weight: 600;
  }
`;

export default function CommentInput() {
  return (
    <article css={inputContainer}>
      <input type="text" placeholder="댓글을 작성해주세요"></input>
      <button type="button">등록</button>
    </article>
  );
}
