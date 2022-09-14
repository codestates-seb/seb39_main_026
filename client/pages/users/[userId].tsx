import { useRouter } from 'next/router';
import TabTitle from '../../components/TabTitle';

export default function User() {
  const router = useRouter();
  const userId = router.query.userId as string;

  return (
    <section>
      <TabTitle prefix={userId} />
      <h1>유저 프로필 페이지 입니다!</h1>
      <p>userId = {userId}</p>
    </section>
  );
}
