import { css } from '@emotion/react';
import Link from 'next/link';
import { WalkDefault } from '../../models/WalkDefault';
import { Theme } from '../../styles/Theme';

export default function WalksInfo({ walks }: { walks: [WalkDefault] }) {
  const mywalks = css`
    p {
      cursor: pointer;
      padding: 1rem;
      color: #00000090;
      font-weight: 500;
      font-size: 0.8rem;
      border-bottom: 1px solid ${Theme.divisionLineColor}95;
    }
  `;
  return (
    <div css={mywalks}>
      {walks?.map((walk) => {
        return (
          <Link href={`/walks/${walk.communityId}`} key={walk.communityId}>
            <p>{walk.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
