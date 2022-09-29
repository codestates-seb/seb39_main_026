import { css } from '@emotion/react';

export default function ComentModifyInput({
  value,
  comment,
  setIsCommentModify,
  modifyCommentContent,
  setModifyCommentContent,
  handleModifyRegisterClick,
}: {
  value: string;
  comment: number;
  setIsCommentModify: React.Dispatch<React.SetStateAction<boolean>>;
  modifyCommentContent: string;
  setModifyCommentContent: React.Dispatch<React.SetStateAction<string>>;
  handleModifyRegisterClick: (
    commentId: number,
    commentContent: string
  ) => void;
}) {
  return (
    <>
      <textarea
        css={css`
          height: 50px;
          resize: none;
          padding: 10px;
        `}
        value={value}
        onChange={(e) => setModifyCommentContent(e.target.value)}
      />
      <div
        css={css`
          display: flex;
          justify-content: flex-end;

          button {
            padding: 5px;
          }
        `}
      >
        <button onClick={() => setIsCommentModify(false)}>취소</button>
        <button
          onClick={() =>
            handleModifyRegisterClick(comment, modifyCommentContent)
          }
        >
          등록
        </button>
      </div>
    </>
  );
}
