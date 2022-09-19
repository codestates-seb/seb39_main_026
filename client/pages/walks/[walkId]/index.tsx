import { useRouter } from 'next/router';
import TabTitle from '../../../components/TabTitle';
import DetailLayout from '../../../components/walks/walksDetail/DetailLayout';
import Introduce from '../../../components/walks/walksDetail/Introduce';

import { useWalksDetailQuery } from '../../../hooks/WalksDetailQuery';
import { WalkDetail } from '../../../models/WalkDefault';

export default function Index() {
  const router = useRouter();
  const walkId = router.query.walkId as string;
  const walksData: WalkDetail = useWalksDetailQuery(walkId);

  return (
    <>
      <TabTitle prefix={walkId} />
      <DetailLayout>
        <h1>산책 개별페이지의 소개 부분입니다!</h1>
        <Introduce walksData={walksData} />
      </DetailLayout>
    </>
  );
}
