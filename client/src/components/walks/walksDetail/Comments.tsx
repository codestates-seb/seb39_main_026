/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { Dispatch, SetStateAction } from 'react';
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

export default function Comments({
  walksData,
  setIsDogInfoModalOpen,
  getPetId,
}: {
  walksData: WalkDetail;
  setIsDogInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  getPetId: (petId: string) => void;
}) {
  return (
    <>
      <article css={commentContainer}>
        {walksData == null ? (
          <LoadingComment />
        ) : (
          <>
            <h2>
              댓글
              <span
                css={css`
                  color: ${walksData?.comments?.length > 0
                    ? Theme.mainColor
                    : '#000'};
                  margin-left: 4px;
                `}
              >
                {walksData?.comments?.length}
              </span>
            </h2>
            <ul>
              {walksData?.comments == null ? (
                <span>로딩</span>
              ) : (
                walksData?.comments?.map((item) => (
                  <li key={item.username}>
                    <div>
                      <img
                        src="/main_image.jpg"
                        css={css`
                          width: 40px;
                          height: 40px;
                          object-fit: cover;
                          border-radius: 50%;
                        `}
                        alt={item.username}
                        onClick={() => {
                          getPetId('1');
                          setIsDogInfoModalOpen(true);
                        }}
                      />
                      <div>
                        <p
                          css={css`
                            font-weight: 600;
                          `}
                        >
                          {item.username}
                        </p>
                        <p>{item.comment}</p>
                        <div>
                          <button>수정</button>
                          <button>삭제</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </article>
      <CommentInput />
    </>
  );
}
