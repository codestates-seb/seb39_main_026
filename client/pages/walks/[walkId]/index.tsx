import { useRouter } from 'next/router';
import TabTitle from '../../../components/TabTitle';

export default function Index() {
  const router = useRouter();
  const walkId = router.query.walkId as string;

  return (
    <section>
      <TabTitle prefix={walkId} />
      <h1>산책 개별 페이지 입니다!</h1>
      <p>walkId = {walkId}</p>
    </section>
  );
}
