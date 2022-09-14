import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  const { walkId } = router.query;

  return (
    <section>
      <h1>산책 개별 페이지 입니다!</h1>
      <p>walkId = {walkId}</p>
    </section>
  );
}
