import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useDeleteNotice } from '../../../../hooks/NoticeQuery';
import { WalkDetail } from '../../../../models/WalkDefault';
import UserState from '../../../../states/UserState';
import { skeletonGradient } from '../../../../styles/GlobalStyle';
import CommonButton from '../../../CommonButton';
import NoticeModifyInput from './NoticeModifyInput';

const contentContainer = css`
  position: relative;
  padding: 36px 0;
  min-height: 200px;

  p:first-of-type {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;
export default function MoimNotice({
  walkDetail,
}: {
  walkDetail?: WalkDetail;
}) {
  const router = useRouter();

  const [user] = useRecoilState(UserState);
  const [isNoticModify, setIsNoticModify] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [isRegisterNotice, setIsRegisterNotice] = useState('');

  const { handlDeleteNotice } = useDeleteNotice();

  // NOTE: 모임 공지사항 삭제
  const handleNoticeDeleteClick = async (commentId: number) => {
    await handlDeleteNotice(commentId);
    router.reload();
  };

  if (walkDetail == null) {
    return (
      <article css={contentContainer}>
        <h1
          css={css`
            border-radius: 10px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loading
        </h1>
        <p
          css={css`
            border-radius: 10px;
            -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            animation: ${skeletonGradient} 1.8s infinite ease-in-out;
            color: transparent;
          `}
        >
          loading
        </p>
      </article>
    );
  }

  if (walkDetail.notices == null) {
    return (
      <article
        css={css`
          position: relative;
          padding: 36px 0;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 600;
        `}
      >
        {user &&
        isNoticModify &&
        walkDetail.member.username === user.username ? (
          <NoticeModifyInput
            noticeId={0}
            communityId={walkDetail.communityId}
            setIsNoticModify={setIsNoticModify}
            noticeTitle={noticeTitle}
            setNoticeTitle={setNoticeTitle}
            noticeContent={noticeContent}
            setNoticeContent={setNoticeContent}
            isRegisterNotice={isRegisterNotice}
          />
        ) : (
          <>
            {user && walkDetail.member.username === user.username && (
              <div
                css={css`
                  position: absolute;
                  top: 10px;
                  right: 0;
                `}
              >
                <CommonButton
                  type="button"
                  padding="10px"
                  borderRadius="10px"
                  fontSize="0.8rem"
                  onClick={() => {
                    setIsNoticModify(true);
                    setIsRegisterNotice('noticePost');
                  }}
                >
                  작성하기
                </CommonButton>
              </div>
            )}
            <p>아직 공지사항이 없네요 😢</p>
          </>
        )}
      </article>
    );
  }

  return (
    <>
      <article css={contentContainer}>
        {user &&
        isNoticModify &&
        walkDetail.member.username === user.username ? (
          <NoticeModifyInput
            communityId={walkDetail.communityId}
            noticeId={walkDetail.notices.noticeId}
            setIsNoticModify={setIsNoticModify}
            noticeTitle={noticeTitle}
            setNoticeTitle={setNoticeTitle}
            noticeContent={noticeContent}
            setNoticeContent={setNoticeContent}
            isRegisterNotice={isRegisterNotice}
          />
        ) : (
          <>
            {user && walkDetail.member.username === user.username && (
              <div
                css={css`
                  position: absolute;
                  top: 10px;
                  right: 0;
                  display: flex;
                  gap: 10px;
                `}
              >
                <CommonButton
                  type="button"
                  padding="10px"
                  borderRadius="10px"
                  fontSize="0.8rem"
                  onClick={() => {
                    setIsNoticModify(true);
                    setNoticeTitle(walkDetail.notices.title);
                    setNoticeContent(walkDetail.notices.body);
                    setIsRegisterNotice('noticePatch');
                  }}
                >
                  수정
                </CommonButton>
                <CommonButton
                  type="button"
                  padding="10px"
                  borderRadius="10px"
                  fontSize="0.8rem"
                  onClick={() =>
                    handleNoticeDeleteClick(walkDetail.notices.noticeId)
                  }
                >
                  삭제
                </CommonButton>
              </div>
            )}
            <p>{walkDetail.notices.title}</p>
            <p>{walkDetail.notices.body}</p>
          </>
        )}
      </article>
    </>
  );
}
