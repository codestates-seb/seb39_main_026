import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PageNav() {
  const router = useRouter();
  const walkId = router.query.walkId as string;
  return (
    <ul>
      <li>
        <Link href={`/walks/${walkId}`}>
          <a>모임 소개</a>
        </Link>
      </li>
      <li>
        <Link href={`/walks/${walkId}/notice`}>
          <a>모임 공지사항</a>
        </Link>
      </li>
    </ul>
  );
}
