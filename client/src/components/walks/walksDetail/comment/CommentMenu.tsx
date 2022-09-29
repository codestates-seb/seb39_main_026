import { css } from '@emotion/react';

export default function CommentMenu({
  commentId,
  handleModifyButtonClick,
  handleDeleteClick,
  setModifyCommentContent,
  commentBody,
}: {
  commentId: number;
  handleModifyButtonClick: (commentId: number) => void;
  handleDeleteClick: (commentId: number) => void;
  setModifyCommentContent: React.Dispatch<React.SetStateAction<string>>;
  commentBody: string;
}) {
  return (
    <div css={buttonContainer}>
      <button
        onClick={() => {
          setModifyCommentContent(commentBody);
          handleModifyButtonClick(commentId);
        }}
      >
        수정
      </button>
      <button onClick={() => handleDeleteClick(commentId)}>삭제</button>
    </div>
  );
}

const buttonContainer = css`
  button {
    padding: 5px;
  }
`;
