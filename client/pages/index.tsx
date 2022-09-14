import type { NextPage } from 'next';
import TabTitle from '../components/TabTitle';

const Home: NextPage = () => {
  return (
    <section>
      <TabTitle prefix="지금 핫한 모임" />
      <h1>메인 페이지 입니다!</h1>
    </section>
  );
};

export default Home;
