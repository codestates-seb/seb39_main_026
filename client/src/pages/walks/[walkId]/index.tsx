import { GetServerSideProps } from 'next';
import TabTitle from '../../../components/TabTitle';
import DetailLayout from '../../../components/walks/walksDetail/DetailLayout';
import Introduce from '../../../components/walks/walksDetail/Introduce';
import { useWalksDetailQuery } from '../../../hooks/WalksDetailQuery';

export default function Index({ walkId }: { walkId: string }) {
  const walkDetail = useWalksDetailQuery(walkId);

  return (
    <>
      <TabTitle prefix={walkId} />
      <DetailLayout walkId={walkId}>
        <Introduce walkDetail={walkDetail} />
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
