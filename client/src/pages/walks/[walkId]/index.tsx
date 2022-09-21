import { GetServerSideProps } from 'next';
import TabTitle from '../../../components/TabTitle';
import DetailLayout from '../../../components/walks/walksDetail/DetailLayout';
import Introduce from '../../../components/walks/walksDetail/Introduce';
import { useWalksDetailQuery } from '../../../hooks/WalksDetailQuery';
import { WalkDetail } from '../../../models/WalkDefault';

export default function Index({ walkId }: { walkId: string }) {
  const walksData: WalkDetail = useWalksDetailQuery(walkId);

  return (
    <>
      <TabTitle prefix={walkId} />
      <DetailLayout walkId={walkId}>
        <Introduce walksData={walksData} />
      </DetailLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { walkId } = query;
  return {
    props: {
      walkId,
    },
  };
};
