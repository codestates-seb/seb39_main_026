import { GetServerSideProps } from 'next';
import TabTitle from '../../../components/TabTitle';
import DetailLayout from '../../../components/walks/walksDetail/DetailLayout';
import MoimNotice from '../../../components/walks/walksDetail/MoimNotice';
import { useWalksDetailQuery } from '../../../hooks/WalksDetailQuery';

export default function Notice({ walkId }: { walkId: string }) {
  const walkDetail = useWalksDetailQuery(walkId);

  return (
    <>
      <TabTitle prefix={walkId} />
      <DetailLayout walkId={walkId}>
        <MoimNotice walkDetail={walkDetail} />
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
