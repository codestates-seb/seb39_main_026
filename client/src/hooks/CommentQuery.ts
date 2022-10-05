import axios from 'axios';
import { API } from '../apis/api';
import { CommentPost } from '../models/WalkDefault';

export function usePostComment() {
  const handlePostComment = async (id: number, body: string) => {
    const res = await axios.post<CommentPost>(
      `${API.COMMENT}/post/${id}`,
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

    return res.data;
  };
  return { handlePostComment } as const;
}

export function useDeleteComment() {
  const handlDeleteComment = async (id: number) => {
    await axios
      .delete<CommentPost>(
        `${API.COMMENT}/${id}`,

        {
          headers: {
            authorization: localStorage.getItem('accessToken') || '',
            refresh_token: localStorage.getItem('refreshToken') || '',
          },
        }
      )
      .then((res) => {
        if (res.headers.authorization && res.headers.refresh_token) {
          localStorage.setItem('accessToken', res.headers.authorization);
          localStorage.setItem('refreshToken', res.headers.refresh_token);
        }
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { handlDeleteComment } as const;
}

export function usePatchComment() {
  const handlePatchComment = async (id: number, body: string) => {
    const res = await axios.patch<CommentPost>(
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

    return res;
  };
  return { handlePatchComment } as const;
}
