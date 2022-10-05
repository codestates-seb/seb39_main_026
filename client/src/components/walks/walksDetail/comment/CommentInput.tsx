import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState, KeyboardEvent } from 'react';
import { useRecoilState } from 'recoil';
import { usePostComment } from '../../../../hooks/CommentQuery';
import { WalkDetail } from '../../../../models/WalkDefault';
import UserState from '../../../../states/UserState';
import { Theme } from '../../../../styles/Theme';

const inputContainer = css`
  display: grid;
  grid-template-columns: 1fr 50px;
  gap: 8px;

  input {
    background-color: #f7f7f5;
    border: 1px solid #f7f7f5;
    border-radius: 20px;
    padding-left: 18px;
    box-shadow: 0 1px 2px hsl(0deg 0% 0% / 5%), 0 1px 4px hsl(0deg 0% 0% / 5%),
      0 2px 8px hsl(0deg 0% 0% / 5%);

    @media screen and (max-width: 300px) {
      padding-left: 10px;
    }
  }

  button {
    padding: 10px 12px;
    border-radius: 10px;
    border: none;
    background-color: ${Theme.mainColor};
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    box-shadow: rgb(127 135 144 / 28%) 1px 1px 2px 0px,
      rgb(0 0 0 / 20%) 1px 1px 2px 1px;

    &:active {
      transform: scale(0.95);
    }
  }
`;

export default function CommentInput({
  walkDetail,
  setIsLoginOfferModalOpen,
}: {
  walkDetail: WalkDetail;
  setIsLoginOfferModalOpen: (isLoginOfferModalOpen: boolean) => void;
}) {
  const [body, setBody] = useState('');
  const [user] = useRecoilState(UserState);
  const id = walkDetail.communityId;
  const { handlePostComment } = usePostComment();
  const router = useRouter();

  const handleRegisterClick = async () => {
    if (body.length === 0) {
      alert('댓글을 입력해주세요.');
      return;
    }
    await handlePostComment(id, body);
    router.reload();
  };

  const handleRejsterEnterKeyUP = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      if (body.length === 0) {
        return;
      }
      handlePostComment(id, body);
      router.reload();
    }
  };

  if (user == null) {
    return (
      <article css={inputContainer}>
        <input
          type="text"
          placeholder="로그인 후 댓글을 작성할 수 있어요"
          onClick={() => setIsLoginOfferModalOpen(true)}
        />
        <button type="button" onClick={handleRegisterClick}>
          등록
        </button>
      </article>
    );
  }

  return (
    <article css={inputContainer}>
      <input
        type="text"
        placeholder="댓글을 작성해주세요"
        onChange={(e) => setBody(e.target.value)}
        onKeyUp={handleRejsterEnterKeyUP}
      />
      <button type="button" onClick={handleRegisterClick}>
        등록
      </button>
    </article>
  );
}
