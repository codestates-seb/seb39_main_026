import { css } from '@emotion/react';
import { Theme } from '../styles/Theme';

const moimStateContainer = (status: string) => css`
  display: inline-block;
  border-radius: 5px;
  background-color: ${status === '모집마감'
    ? Theme.moimCloseBgColor
    : Theme.mainColor};
  padding: 6.5px 17px;
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  font-weight: 600;
  word-break: keep-all;
`;

export default function MoimState({
  status,
  children,
}: {
  children: React.ReactNode;
  status: string;
}) {
  return <div css={moimStateContainer(status)}>{children}</div>;
}
