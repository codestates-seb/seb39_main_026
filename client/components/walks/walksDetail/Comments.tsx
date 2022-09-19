/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { WalkDetail } from '../../../models/WalkDefault';

export default function Comments({ walksData }: { walksData: WalkDetail }) {
  return (
    <article>
      <h2>댓글 {walksData?.comments?.length}</h2>
      <ul>
        {walksData.comments == null ? (
          <span>로딩</span>
        ) : (
          walksData.comments.map((item) => (
            <li key={item['user.name']}>
              <div>
                <img
                  src="/main_image.jpg"
                  css={css`
                    width: 35px;
                    height: 35px;
                    object-fit: cover;
                  `}
                  alt={item['user.name']}
                />
                <div>
                  <p>{item['user.name']}</p>
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
    </article>
  );
}
