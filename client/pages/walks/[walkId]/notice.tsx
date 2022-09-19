import { useRouter } from 'next/router';
import TabTitle from '../../../components/TabTitle';
import DetailLayout from '../../../components/walks/walksDetail/DetailLayout';
import MoimNotice from '../../../components/walks/walksDetail/MoimNotice';

export default function Notice() {
  const router = useRouter();
  const walkId = router.query.walkId as string;
  return (
    <>
      <TabTitle prefix={walkId} />
      <DetailLayout>
        <h1>산책 개별페이지의 공지사항 부분입니다!</h1>
        <MoimNotice />
      </DetailLayout>
    </>
  );
}
