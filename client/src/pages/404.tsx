import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const notfound = css`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 30%;
    text-align: center;
    p {
      line-height: 2rem;
    }
  `;
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, []);

  return (
    <div css={notfound}>
      <p>
        잘못된 페이지 접근입니다 🙀
        <br />
        3초 후에 메인 페이지로 보내드릴게요!
      </p>
    </div>
  );
}
