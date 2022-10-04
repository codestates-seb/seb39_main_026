import { css } from '@emotion/react';
import { Theme } from '../styles/Theme';

const moimStateContainer = (moimState: boolean) => css`
  display: inline-block;
  border-radius: 5px;
  background-color: ${moimState ? Theme.mainColor : Theme.moimCloseBgColor};
  padding: 6.5px 17px;
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  font-weight: 600;
  word-break: keep-all;
`;

export default function MoimStateButton({
  moimState,
  children,
  className,
}: {
  moimState: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div css={moimStateContainer(moimState)} className={className}>
      {children}
    </div>
  );
}
