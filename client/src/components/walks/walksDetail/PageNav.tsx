import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Theme } from '../../../styles/Theme';
import NavLink from '../../NavLink';

const pageNavContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;

  li {
    text-align: center;
    width: 100%;
  }

  a {
    display: block;
    width: 100%;
    padding: 20px 0;
    text-decoration: none;
    color: #909090;
    font-weight: bold;
    border-bottom: 2px solid ${Theme.divisionLineColor};

    &.active {
      border-bottom: 2px solid ${Theme.mainColor};
      color: #000;
    }
  }

  @media screen and (max-width: 880px) {
    margin-top: 32px;
  }

  @media screen and (max-width: 505px) {
    margin-top: 12px;
  }

  @media screen and (max-width: 324px) {
    margin-top: 6px;
    font-size: 0.8rem;
  }
`;

export default function PageNav() {
  const router = useRouter();
  const walkId = router.query.walkId as string;
  return (
    <ul css={pageNavContainer}>
      <li>
        <NavLink href={`/walks/${walkId}`} scroll={false}>
          모임 소개
        </NavLink>
      </li>
      <li>
        <NavLink href={`/walks/${walkId}/notice`} scroll={false}>
          모임 공지사항
        </NavLink>
      </li>
    </ul>
  );
}
