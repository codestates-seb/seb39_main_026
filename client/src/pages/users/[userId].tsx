import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import TabTitle from '../../components/TabTitle';
import PetInfo from '../../components/users/PetInfo';
import UserInfo from '../../components/users/UserInfo';
import { useGetUsersQuery } from '../../components/users/UsersQuery';
import WalksInfo from '../../components/users/WalksInfo';
import { Theme } from '../../styles/Theme';

export default function User({ userId }: { userId: string }) {
  const UserData = useGetUsersQuery(userId);
  const user = css`
    margin: 15vw 20vw;
    display: flex;
    flex-direction: column;
    .walks {
      display: flex;
      padding: 1rem 0;
      border-bottom: 1px solid ${Theme.divisionLineColor};
      font-weight: 500;
      .icon {
        font-size: 1.7rem;
      }
      span {
        font-weight: 600;
        color: ${Theme.mainColor};
        margin: 0 0.2rem 0rem 0.8rem;
      }
    }
  `;

  useEffect(() => {
    console.log(UserData);
  }, []);

  return (
    <section css={user}>
      <TabTitle prefix={userId} />
      <UserInfo data={UserData} />
      <PetInfo pets={UserData.petList} />
      <div className="walks">
        <Icon icon="fluent-emoji-flat:paw-prints" className="icon" />
        <span>{UserData.username}</span>님의 산책 모임
      </div>
      <WalksInfo walks={UserData?.community} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { userId } = query;
  return {
    props: {
      userId,
    },
  };
};
