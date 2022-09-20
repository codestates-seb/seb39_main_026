import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Theme } from '../../../styles/Theme';
import NavLink from '../../NavLink';

const pageNavContainer = css`
  /* border-bottom: 1px solid ${Theme.divisionLineColor}; */
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
`;

export default function PageNav() {
  const router = useRouter();
  const walkId = router.query.walkId as string;
  return (
    <ul css={pageNavContainer}>
      <li>
        <NavLink href={`/walks/${walkId}`}>모임 소개</NavLink>
      </li>
      <li>
        <NavLink href={`/walks/${walkId}/notice`}>모임 공지사항</NavLink>
      </li>
    </ul>
  );
}
