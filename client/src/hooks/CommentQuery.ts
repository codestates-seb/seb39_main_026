import axios from 'axios';
import { API } from '../apis/api';
import { CommentPost } from '../models/WalkDefault';

export function usePostComment() {
  const handlePostComment = async (id: number, body: string) => {
    const res = await axios.post<CommentPost>(
      `${API.COMMENT}/${id}`,
      {
        body,
      },
      {
        headers: {
          authorization: localStorage.getItem('accessToken') || '',
          refresh_token: localStorage.getItem('refreshToken') || '',
        },
      }
    );

    if (res.headers.authorization && res.headers.refresh_token) {
      localStorage.setItem('accessToken', res.headers.authorization);
      localStorage.setItem('refreshToken', res.headers.refresh_token);
    }
    console.log(res);
    console.log(res.data);
    return res.data;
  };
  return { handlePostComment } as const;
}
