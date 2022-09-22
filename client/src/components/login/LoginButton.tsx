import { css } from '@emotion/react';

const loginButton = (buttonColor?: string) => css`
  background-color: ${buttonColor};
  width: 100%;
  height: 80px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 5%), 0 1px 4px hsl(0deg 0% 0% / 5%),
    0 2px 8px hsl(0deg 0% 0% / 5%);
  grid-column: 1/4;

  display: grid;
  grid-template-columns: 20px 120px;
  align-items: center;
  justify-content: center;
`;

export default function LoginButton({
  children,
  onClick,
  buttonColor,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  buttonColor?: string;
}) {
  return (
    <button type="submit" onClick={onClick} css={loginButton(buttonColor)}>
      {children}
    </button>
  );
}
