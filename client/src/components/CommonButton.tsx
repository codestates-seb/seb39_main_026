import { css } from '@emotion/react';
import { Theme } from '../styles/Theme';

const commonbuttonContainer = (
  buttonColor: string,
  disabled: boolean,
  padding: string,
  fontSize: string,
  borderRadius: string
) => css`
  padding: ${padding};
  width: 100%;
  border: none;
  border-radius: ${borderRadius};
  background: ${disabled ? Theme.disableBgColor : buttonColor};
  color: #fff;
  cursor: ${disabled ? `not-allowed` : `pointer`};
  font-weight: 600;
  font-size: ${fontSize};
  word-break: keep-all;
  letter-spacing: 0.02rem;
  box-shadow: rgb(127 135 144 / 28%) 1px 1px 2px 0px,
    rgb(0 0 0 / 20%) 1px 1px 2px 1px;
  &:active {
    transform: scale(0.95);
  }
`;

export default function CommonButton({
  type,
  children,
  buttonColor = Theme.mainColor,
  onClick,
  className,
  disabled = false,
  padding = '24px',
  fontSize = '1rem',
  borderRadius = '20px',
}: {
  type: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode;
  buttonColor?: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  padding?: string;
  fontSize?: string;
  borderRadius?: string;
}) {
  return (
    <button
      type={type}
      css={commonbuttonContainer(
        buttonColor,
        disabled,
        padding,
        fontSize,
        borderRadius
      )}
      onClick={() => {
        onClick();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
