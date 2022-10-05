import { GetServerSideProps } from 'next';
import TabTitle from '../../../components/TabTitle';
import DetailLayout from '../../../components/walks/walksDetail/DetailLayout';
import Introduce from '../../../components/walks/walksDetail/Introduce';
import MoimNotice from '../../../components/walks/walksDetail/notice/MoimNotice';
import { useWalksDetailQuery } from '../../../hooks/WalksQuery';

export interface WalksPageProps {
  walkId: string;
  type: 'intro' | 'notice';
}

export default function Page({ walkId, type }: WalksPageProps) {
  const walkDetail = useWalksDetailQuery(walkId);

  return (
    <>
      <TabTitle prefix={walkDetail?.name} />
      <DetailLayout walkId={walkId}>
        {type === 'notice' ? (
          <MoimNotice walkDetail={walkDetail} />
        ) : (
          <Introduce walkDetail={walkDetail} />
        )}
      </DetailLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { walkId, type: _type } = query;

  // /walks/2 로 접근 시 type 은 undefined
  // /walks/2/notice 로 접근 시 type은 ['notice']
  // (안쓰지만) /walks/2/notice/a/b/c 로 접근 시 type은 ['notice', 'a', 'b', 'c']
  const type: 'intro' | 'notice' = _type == null ? 'intro' : 'notice';

  return {
    props: { walkId, type } as WalksPageProps,
  };
};
