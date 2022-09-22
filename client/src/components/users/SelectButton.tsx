import { css } from '@emotion/react';
import { Theme } from '../../styles/Theme';
export default function SelectButton({
  left,
  right,
  select,
}: {
  left: string;
  right: string;
  select: string;
}) {
  const selectBtn = css`
    button {
      cursor: pointer;
      border: 0;
      width: 100px;
      height: 50px;
      font-size: 16px;
      font-weight: 500;
    }
    .left {
      border-radius: 20px 0 0 20px;
    }
    .right {
      border-radius: 0 20px 20px 0;
    }
    .selected {
      background-color: ${Theme.mainColor};
      color: white;
    }
  `;
  return (
    <div css={selectBtn}>
      <button className={`left ${left === select && 'selected'}`}>
        {left}
      </button>
      <button className={`right ${right === select && 'selected'}`}>
        {right}
      </button>
    </div>
  );
}
