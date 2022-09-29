import { css } from '@emotion/react';
import { Theme } from '../../../styles/Theme';

const inputContainer = css`
  display: grid;
  grid-template-columns: 1fr 50px;
  gap: 8px;

  input {
    background-color: #f7f7f5;
    border: 1px solid #f7f7f5;
    border-radius: 20px;
    padding: 0 18px;
    box-shadow: 0 1px 2px hsl(0deg 0% 0% / 5%), 0 1px 4px hsl(0deg 0% 0% / 5%),
      0 2px 8px hsl(0deg 0% 0% / 5%);
  }

  button {
    padding: 10px 12px;
    border-radius: 10px;
    border: none;
    background-color: ${Theme.mainColor};
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    box-shadow: rgb(127 135 144 / 28%) 1px 1px 2px 0px,
      rgb(0 0 0 / 20%) 1px 1px 2px 1px;

    &:active {
      transform: scale(0.95);
    }
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
