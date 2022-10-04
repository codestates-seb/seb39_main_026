import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  useDeleteComment,
  usePatchComment,
} from '../../../../hooks/CommentQuery';
import { WalkDetail } from '../../../../models/WalkDefault';
import UserState from '../../../../states/UserState';
import { Theme } from '../../../../styles/Theme';
import LoadingComment from '../../skeleton/walksDetail/LoadingComment';
import ComentModifyInput from './ComentModifyInput';
import CommentInput from './CommentInput';
import CommentMenu from './CommentMenu';

const commentContainer = css`
  h2 {
    font-size: 1rem;
    border-bottom: 1px solid ${Theme.divisionLineColor};
    padding-bottom: 15px;

    @media screen and (max-width: 324px) {
      font-size: 0.8rem;
    }

    span {
      margin-left: 4px;
    }
  }

  ul {
    margin: 18px 0 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;
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

    &:hover {
      background-color: #e6e6e6;
      border-radius: 5px;
    }
  }

  button + button {
    margin-left: 7px;
  }

  .comment-profile {
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }

  span {
    height: 40px !important;
    width: 40px !important;
  }

  p.comment-owner {
    font-weight: 600;
    font-size: 1rem;

    @media screen and (max-width: 324px) {
      font-size: 0.9rem;
    }
  }

  p.comment-content {
    font-size: 1rem;

    @media screen and (max-width: 324px) {
      font-size: 0.9rem;
    }
    line-height: 1.25;
  }
`;

export default function Comments({ walkDetail }: { walkDetail?: WalkDetail }) {
  const router = useRouter();

  const { handlDeleteComment } = useDeleteComment();
  const { handlePatchComment } = usePatchComment();

  const [user] = useRecoilState(UserState);
  const [isCommentModify, setIsCommentModify] = useState(false);
  const [modifyCommentId, setModifyCommentId] = useState(0);
  const [modifyCommentContent, setModifyCommentContent] = useState('');

  const handleDeleteClick = (commentId: number) => {
    handlDeleteComment(commentId);
    router.reload();
  };

  const handleModifyButtonClick = (commentId: number) => {
    setIsCommentModify(true);
    setModifyCommentId(commentId);
  };

  const handleModifyRegisterClick = async (
    commentId: number,
    commentContent: string
  ) => {
    await handlePatchComment(commentId, commentContent);

    router.reload();
  };

  // NOTE: 로딩중이면 로딩 컴포넌트 렌더링
  if (walkDetail == null) {
    return (
      <article css={commentContainer}>
        <LoadingComment />
      </article>
    );
  }

  // NOTE: comment가 없을 때 렌더링
  if (walkDetail.comments.length === 0) {
    return (
      <article css={commentContainer}>
        <h2>
          댓글
          <span>0</span>
        </h2>
        <ul>
          <li>
            <p className="comment-owner">댓글을 남겨주세요.</p>
          </li>
        </ul>
        <CommentInput walkDetail={walkDetail} />
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
            `}
          >
            {walkDetail.comments.length}
          </span>
        </h2>
        <ul>
          {walkDetail.comments.map((comment, idx) => (
            <li key={`${comment.body}-${idx}`}>
              <div>
                <Image
                  src={comment.member.imgUrl}
                  height="40px"
                  width="40px"
                  alt={`${comment.member.username}의 사진`}
                  className="comment-profile"
                  onClick={() => router.push(`/users/${comment.member.id}`)}
                />
                <div>
                  <p className="comment-owner">{comment.member.username}</p>

                  {/* NOTE: 수정 버튼을 눌렀을 때 나타나는 input */}
                  {isCommentModify && comment.commentId === modifyCommentId ? (
                    <ComentModifyInput
                      comment={comment.commentId}
                      setIsCommentModify={setIsCommentModify}
                      modifyCommentContent={modifyCommentContent}
                      handleModifyRegisterClick={handleModifyRegisterClick}
                      setModifyCommentContent={setModifyCommentContent}
                      value={modifyCommentContent}
                    />
                  ) : (
                    <p className="comment-content">{comment.body}</p>
                  )}

                  {/* NOTE: 수정 / 삭제 버튼 */}
                  {user && comment.member.id === user.id && !isCommentModify && (
                    <>
                      <CommentMenu
                        handleModifyButtonClick={handleModifyButtonClick}
                        handleDeleteClick={handleDeleteClick}
                        commentId={comment.commentId}
                        setModifyCommentContent={setModifyCommentContent}
                        commentBody={comment.body}
                      />
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </article>
      <CommentInput walkDetail={walkDetail} />
    </>
  );
}
