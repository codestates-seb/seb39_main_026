import axios from 'axios';
import { API } from '../apis/api';
import { NoticePost } from '../models/WalkDefault';

export function usePostNotice() {
  const handlePostNotice = async (id: number, title: string, body: string) => {
    const res = await axios.post<NoticePost>(
      `${API.WALKS}/notice/${id}`,
      {
        title,
        body,
      },
      {
        headers: {
          authorization: localStorage.getItem('accessToken') || '',
          refresh_token: localStorage.getItem('refreshToken') || '',
        },
      }
    );

    console.log(res, 'PostRes');
    return res;
  };
  return { handlePostNotice } as const;
}

export function useDeleteNotice() {
  const handlDeleteNotice = async (id: number) => {
    const res = await axios.delete<NoticePost>(
      `${API.WALKS}/notice/${id}`,

      {
        headers: {
          authorization: localStorage.getItem('accessToken') || '',
          refresh_token: localStorage.getItem('refreshToken') || '',
        },
      }
    );

    console.log(res, 'DeleteRes');
    return res;
  };
  return { handlDeleteNotice } as const;
}

export function usePatchNotice() {
  const handlePatchNotice = async (id: number, title: string, body: string) => {
    const res = await axios.patch<NoticePost>(
      `${API.WALKS}/notice/${id}`,
      {
        title,
        body,
      },
      {
        headers: {
          authorization: localStorage.getItem('accessToken') || '',
          refresh_token: localStorage.getItem('refreshToken') || '',
        },
      }
    );

    console.log(res, 'PatchRes');
    return res;
  };
  return { handlePatchNotice } as const;
}
