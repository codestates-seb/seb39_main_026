import { css } from '@emotion/react';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main
        css={css`
          max-width: 1200px;
          margin: 75px auto 0;

          @media screen and (max-width: 768px) {
            margin: 0px auto 75px;
          }
        `}
      >
        {children}
      </main>
    </>
  );
}
