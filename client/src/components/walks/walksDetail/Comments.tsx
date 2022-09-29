/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { WalkDetail } from '../../../models/WalkDefault';
import { Theme } from '../../../styles/Theme';
import LoadingComment from '../skeleton/walksDetail/LoadingComment';
import CommentInput from './CommentInput';

const commentContainer = css`
  h2 {
    font-size: 1rem;
    border-bottom: 1px solid ${Theme.divisionLineColor};
    padding-bottom: 15px;
  }

  ul {
    margin: 18px 0 78px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  li > div {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 14px;
    letter-spacing: 0.2px;
  }

  li > div > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  button {
    border: none;
    background-color: transparent;
    color: #717171;
    cursor: pointer;
  }

  button + button {
    margin-left: 7px;
  }
`;

export default function Comments({ walkDetail }: { walkDetail?: WalkDetail }) {
  if (walkDetail == null) {
    return (
      <article css={commentContainer}>
        <LoadingComment />
      </article>
    );
  }

  return (
    <>
      <article css={commentContainer}>
        <h2>
          댓글
          <span
            css={css`
              color: ${walkDetail.comments?.length > 0
                ? Theme.mainColor
                : '#000'};
              margin-left: 4px;
            `}
          >
            {walkDetail?.comments?.length}
          </span>
        </h2>
        <ul>
          {walkDetail.comments?.map((item) => (
            <li key={item.body}>
              <div>
                <img
                  src={item.member.imgUrl}
                  css={css`
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 50%;
                    cursor: pointer;
                  `}
                  alt={`${item.member.username}의 사진`}
                />
                <div>
                  <p
                    css={css`
                      font-weight: 600;
                    `}
                  >
                    {item.member.username}
                  </p>
                  <p>{item.body}</p>
                  <div>
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </article>
      <CommentInput />
    </>
  );
}
