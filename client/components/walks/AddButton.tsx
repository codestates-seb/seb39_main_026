import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import React from 'react';

export default function AddButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const iconContainer = css`
    position: fixed;
    bottom: 15%;
    right: 10%;
    border: 0;
    background-color: transparent;
    .icon {
      font-size: 55px;
      cursor: pointer;
    }
  `;
  return (
    <button css={iconContainer} onClick={onClick}>
      <Icon
        icon="ant-design:plus-circle-filled"
        color="DC602A"
        className="icon"
      />
    </button>
  );
}
