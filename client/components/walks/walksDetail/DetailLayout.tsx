import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useWalksDetailQuery } from '../../../hooks/WalksDetailQuery';
import { WalkDetail } from '../../../models/WalkDefault';
import Comments from './Comments';
import Information from './Information';
import PageNav from './PageNav';
import ParticipantsInfo from './ParticipantsInfo';
import Title from './Title';

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const walkId = router.query.walkId as string;
  const walksData: WalkDetail = useWalksDetailQuery(walkId);
  return (
    <section
      css={css`
        padding: 80px 36px 50px;
        ul {
          list-style: none;
        }
        max-width: 800px;
      `}
    >
      <Title walksData={walksData} />
      <Information walksData={walksData} />
      <PageNav />
      {children}
      <ParticipantsInfo walksData={walksData} />
      <Comments walksData={walksData} />
    </section>
  );
}
