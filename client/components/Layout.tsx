import { css } from '@emotion/react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main
        css={css`
          max-width: 1200px;
          margin: 75px auto 0;
          min-height: calc(100vh - 75px);

          @media screen and (max-width: 768px) {
            margin: 0px 0 72px;
          }
        `}
      >
        {children}
      </main>
    </>
  );
}
