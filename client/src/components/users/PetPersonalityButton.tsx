import { css } from '@emotion/react';
import { Theme } from '../../styles/Theme';

export default function PetPersonalityButton({
  select,
  onClick,
}: {
  select: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const personalities = [
    '느긋해요',
    '사교적이에요',
    '독립적이에요',
    '고집이 세요',
    '겁이 많아요',
  ];
  const personalityBtn = css`
    border-radius: 20px;
    background-color: #f7f7f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 100%;
      list-style: none;
      text-align: center;
      button {
        cursor: pointer;
        border: 0;
        font-size: 16px;
        font-weight: 500;
        background-color: #f7f7f5;
        padding: 1.5rem;
      }
      .selected {
        color: ${Theme.mainColor};
      }
    }
  `;

  return (
    <ul css={personalityBtn}>
      {personalities.map((p) => {
        return (
          <li key={p}>
            <button
              type="button"
              className={p === select ? 'selected' : ''}
              onClick={onClick}
            >
              {p}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
