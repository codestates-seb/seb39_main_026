import { css } from '@emotion/react';
import { Theme } from '../styles/Theme';

const commonbuttonContainer = (buttonColor: string, disabled: boolean) => css`
  padding: 27px;
  width: 100%;
  border: none;
  border-radius: 20px;
  background: ${disabled ? Theme.disableBgColor : buttonColor};
  color: #fff;
  cursor: ${disabled ? `not-allowed` : `pointer`};
  font-weight: 600;
  font-size: 1rem;
  word-break: keep-all;
  letter-spacing: 0.02rem;
`;

export default function CommonButton({
  type,
  children,
  buttonColor = Theme.mainColor,
  onClick,
  className,
  disabled = false,
}: {
  type: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode;
  buttonColor?: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      css={commonbuttonContainer(buttonColor, disabled)}
      onClick={() => {
        onClick();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
