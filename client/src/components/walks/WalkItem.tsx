import { css } from '@emotion/react';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { WalkDefault } from '../../models/WalkDefault';

export default function WalkItem({ walk }: { walk: WalkDefault }) {
  const router = useRouter();
  const handleItemClick = () => {
    router.push(`/walks/${walk.communityId}`);
  };

  const walkitem = css`
    cursor: pointer;
    width: 320px;
    box-shadow: 4px 4px 30px #00000020;
    margin: 1rem 0.5rem;
    border-radius: 15px;
    .img {
      border-radius: 15px 15px 0 0;
      object-fit: cover;
    }
    .walk_wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1rem;
    }
    .walk_info {
      padding-right: 0.5rem;
      .walk_title {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 0.5rem;
        text-align: left;
      }
      .walk_des {
        font-weight: 300;
        font-size: 10px;
        span + span {
          &::before {
            content: '・';
            margin-left: 3px;
            margin-right: 3px;
          }
        }
      }
    }
    .status {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: 8px;
        margin-bottom: 0.2rem;
        color: #dc602a;
      }
      button {
        font-size: 14px;
        height: 30px;
        width: 74px;
        border-radius: 0.5rem;
        border: none;
        background-color: #dc602a;
        color: white;
      }
    }
  `;
  return (
    <>
      {walk && (
        <div css={walkitem} onClick={handleItemClick}>
          <Image
            className="img"
            src={walk.imgUrls[0]}
            alt="산책 모임 대표 이미지"
            height="120px"
            width="321px"
          />
          <div className="walk_wrapper">
            <div className="walk_info">
              <h3 className="walk_title">{walk.name}</h3>
              <h4 className="walk_des">
                {walk.dateInfo != null ? (
                  format(new Date(walk?.dateInfo), 'yyyy년 MM월 dd일')
                ) : (
                  <p className="everyweek-moim">
                    매주{' '}
                    {walk.dayInfo.map((yoil) => (
                      <span key={`${yoil}`}>{yoil}</span>
                    ))}
                  </p>
                )}
              </h4>
              <h4 className="walk_des">{walk.place}</h4>
            </div>
            <div className="status">
              <p>
                {walk.capacity <= walk.participant
                  ? '다음 기회에...'
                  : `${walk.capacity - walk.participant}자리 남았어요!`}
              </p>
              <button>
                {walk.capacity <= walk.participant ? '모집마감' : '모집중'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
