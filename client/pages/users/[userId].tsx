import { useRouter } from 'next/router';

export default function User() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <section>
      <h1>유저 프로필 페이지 입니다!</h1>
      <p>userId = {userId}</p>
    </section>
  );
}
