import axios from 'axios';
import { yoilSort } from '../../util/sortYoil';
import { dateToHMM, dateToYYYYMMDD } from '../../util/transformDate';
import { API } from '../apis/api';
import { WalksMoimOneDay, WalksMoimEveryWeek } from '../models/WalksMoim';

export function usePostMoimImage() {
  const handlePostMoimImage = async (files: File[]) => {
    if (files.length === 0) {
      return [];
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('imgFile', files[i]);
    }

    const res = await axios.post(`${API.WALKS}/post/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: localStorage.getItem('accessToken') || '',
        refresh_token: localStorage.getItem('refreshToken') || '',
      },
    });

    return res.data;
  };

  return { handlePostMoimImage } as const;
}

export function useAddOneDayMoim() {
  const handleAddOneDayMoim = async (
    data: WalksMoimOneDay,
    moimImg: string[]
  ) => {
    const res = await axios.post(
      `${API.WALKS}/post`,
      {
        name: data.title,
        body: data.description,
        capacity: data.personCount,
        place: data.place,
        date: dateToYYYYMMDD(data.plannedDate),
        time: dateToHMM(data.plannedTime),
        si: data.si,
        gu: data.gu,
        dong: data.dong,
        imgUrls: [...moimImg],
        joinnedPetList: [...data.joinnedPetList],
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

  return { handleAddOneDayMoim } as const;
}

export function useAddEveryWeekMoim() {
  const handleAddEveryWeekMoim = async (
    data: WalksMoimEveryWeek,
    moimImg: string[]
  ) => {
    const res = await axios.post(
      `${API.WALKS}/post`,
      {
        name: data.title,
        body: data.description,
        capacity: data.personCount,
        place: data.place,
        dates: data.plannedDates.sort(yoilSort),
        time: dateToHMM(data.plannedTime),
        si: data.si,
        gu: data.gu,
        dong: data.dong,
        imgUrls: [...moimImg],
        joinnedPetList: [...data.joinnedPetList],
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

  return { handleAddEveryWeekMoim } as const;
}
