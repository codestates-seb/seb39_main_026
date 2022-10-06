import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { usePatchNotice, usePostNotice } from '../../../../hooks/NoticeQuery';
import { Theme } from '../../../../styles/Theme';
import CommonButton from '../../../CommonButton';

const modifyContainer = css`
  width: 100%;

  input {
    height: 40px;
    margin-bottom: 16px;
  }

  textarea {
    height: 200px;
    resize: none;
  }

  input,
  textarea {
    width: 100%;
    padding: 20px 20px;
    border: 1px solid #f7f7f5;
    background-color: #f7f7f5;
    border-radius: 10px;
    font-size: 0.9rem;
    box-shadow: 0 1px 2px hsl(0deg 0% 0% / 5%), 0 1px 4px hsl(0deg 0% 0% / 5%),
      0 2px 8px hsl(0deg 0% 0% / 5%);
  }

  p {
    font-size: 0.8rem !important;
    margin: 0 !important;
    color: ${Theme.errorMessagesColor};
    height: 17px;
  }

  .modify-button-container {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;
    margin: 0 0 10px;

    button {
      max-width: 60px;
    }
  }
`;

export default function NoticeModifyInput({
  communityId,
  noticeId,
  setIsNoticModify,
  noticeTitle,
  setNoticeTitle,
  noticeContent,
  setNoticeContent,
  isRegisterNotice,
}: {
  communityId: number;
  noticeId: number;
  setIsNoticModify: React.Dispatch<React.SetStateAction<boolean>>;
  noticeTitle: string;
  setNoticeTitle: React.Dispatch<React.SetStateAction<string>>;
  noticeContent: string;
  setNoticeContent: React.Dispatch<React.SetStateAction<string>>;
  isRegisterNotice: string;
}) {
  const router = useRouter();
  const { handlePostNotice } = usePostNotice();
  const { handlePatchNotice } = usePatchNotice();
  const [message, setMessage] = useState('');

  const handleRegisterButtonClick = async () => {
    if (noticeTitle === '' || noticeContent === '') {
      setMessage('모든 내용을 입력해주세요');
      return;
    }

    if (isRegisterNotice === 'noticePost') {
      await handlePostNotice(communityId, noticeTitle, noticeContent);
      router.reload();
    } else if (isRegisterNotice === 'noticePatch') {
      await handlePatchNotice(noticeId, noticeTitle, noticeContent);
      router.reload();
    } else {
      return;
    }
  };

  return (
    <section css={modifyContainer}>
      <input
        autoFocus
        placeholder="공지사항의 제목을 입력해주세요"
        onChange={(e) => setNoticeTitle(e.target.value)}
        value={noticeTitle}
      />
      <textarea
        placeholder="공지사항의 상세내용을 입력해주세요"
        onChange={(e) => setNoticeContent(e.target.value)}
        value={noticeContent}
      />
      <p>{message}</p>
      <div className="modify-button-container">
        <CommonButton
          type="button"
          padding="8px"
          borderRadius="12px"
          fontSize="0.8rem"
          onClick={() => setIsNoticModify(false)}
        >
          취소
        </CommonButton>
        <CommonButton
          type="button"
          padding="8px"
          borderRadius="12px"
          fontSize="0.8rem"
          onClick={handleRegisterButtonClick}
        >
          등록
        </CommonButton>
      </div>
    </section>
  );
}
