import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import TabTitle from '../../components/TabTitle';
import DeleteUserButton from '../../components/users/DeleteUserButton';
import LogoutButton from '../../components/users/LogoutButton';
import PetInfo from '../../components/users/PetInfo';
import UserInfo from '../../components/users/UserInfo';
import WalksInfo from '../../components/users/WalksInfo';
import LoadingPets from '../../components/users/skeleton/LoadingPets';
import LoadingUsers from '../../components/users/skeleton/LoadingUsers';
import { useGetUsersQuery } from '../../hooks/UsersQuery';
import UserState from '../../states/UserState';
import { Theme } from '../../styles/Theme';

export default function User({ userId }: { userId: string }) {
  const [isValidated, setIsValidated] = useState(false);
  const [user] = useRecoilState(UserState);
  const getUsersQuery = useGetUsersQuery(userId);

  const userPage = css`
    margin: 15vw 20vw;
    display: flex;
    flex-direction: column;
    .walks {
      display: flex;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid ${Theme.divisionLineColor};
      font-weight: 500;
      .icon {
        margin-right: 0.5rem;
        font-size: 1.7rem;
      }
      span {
        font-weight: 600;
        color: ${Theme.mainColor};
        margin: 0 0.2rem 0rem 0rem;
      }
    }
  `;

  useEffect(() => {
    if (user) {
      if (userId === user.id.toString()) {
        setIsValidated(true);
      } else {
        setIsValidated(false);
      }
    }
  }, [userId, user]);

  return (
    <section css={userPage}>
      <TabTitle prefix={getUsersQuery?.data?.username} />
      {getUsersQuery.isSuccess && (
        <>
          <UserInfo data={getUsersQuery.data} isValidated={isValidated} />
          <PetInfo
            pets={getUsersQuery.data.petList}
            isValidated={isValidated}
          />
          <div className="walks">
            <Icon icon="fluent-emoji-flat:paw-prints" className="icon" />
            {isValidated ? (
              <p>내 산책 모임</p>
            ) : (
              <p>
                <span>{getUsersQuery.data.username}</span>님의 산책 모임
              </p>
            )}
          </div>
          <WalksInfo walks={getUsersQuery.data?.memberCommunityList} />
        </>
      )}
      {getUsersQuery.isLoading && (
        <>
          <LoadingUsers /> <LoadingPets />
        </>
      )}
      <footer
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        `}
      >
        {isValidated && (
          <>
            <LogoutButton /> <DeleteUserButton id={userId} />
          </>
        )}
      </footer>
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
