import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TabTitle from '../../components/TabTitle';
import { useGetUsersQuery } from '../../components/users/UsersQuery';
import { MyPets } from '../../models/MyPets';
import { WalkDefault } from '../../models/WalkDefault';
import { Theme } from '../../styles/Theme';

export default function User() {
  const router = useRouter();
  const username = router.query.username as string;
  const UserData = useGetUsersQuery();
  const user = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    .userInfo {
      margin-top: 2rem;
      display: flex;
      .img {
        height: 75px;
        width: 75px;
        border-radius: 50%;
      }
      .username {
        margin-left: 1rem;
        font-size: 22px;
      }
    }
    .petInfo {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .petImg {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
      .petName {
        font-size: 10px;
        font-weight: 600;
      }
    }
    .walks {
      margin-top: 1rem;
      p {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        padding: 1rem;
        border-bottom: 1px solid ${Theme.divisionLineColor};
        .icon {
          font-size: 1.5rem;
        }
        span {
          margin-left: 0.5rem;
          font-weight: 600;
          color: ${Theme.mainColor};
        }
      }
      a {
        text-decoration: none;
        color: black;
      }
    }
  `;

  return (
    <section css={user}>
      <TabTitle prefix={username} />
      <div className="userInfo">
        <div className="img">
          <Image
            alt={`${username}'s profile`}
            src={UserData.imgUrl}
            width="75px"
            height="75px"
            className="img"
          />
        </div>
        <p className="username">{username}</p>
      </div>
      <div className="petWrapper">
        {UserData?.petResponseDtoList?.map((pet: MyPets) => {
          return (
            <div className="petInfo" key={pet.id}>
              <div className="petImg">
                <Image
                  src={pet.imgUrl}
                  alt={`${pet.petName}'s picture`}
                  height="50px"
                  width="50px"
                  className="petImg"
                />
              </div>
              <p className="petName">{pet.petName}</p>
            </div>
          );
        })}
      </div>
      <div className="walks">
        <p>
          <Icon icon="fluent-emoji-flat:paw-prints" className="icon" />
          <span> {username}</span> 님의 산책 모임
        </p>
        {UserData?.community?.map((community: WalkDefault) => {
          return (
            <Link
              href={`/walks/${community.communityId}`}
              key={community.communityId}
            >
              <a>{community.title}</a>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
