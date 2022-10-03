import axios from 'axios';
import { yoilSort } from '../../util/sortYoil';
import { dateToHMM, dateToYYYYMMDD } from '../../util/transformDate';
import { API } from '../apis/api';
import { WalksMoimOneDay, WalksMoimEveryWeek } from '../models/WalksMoim';

export function usePostMoimImage() {
  const handlePostMoimImage = async (files: File[]) => {
    if (files.length === 0) {
      return null;
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

    console.log('PostMoimImage', res);
    return res.data;
  };

  return { handlePostMoimImage } as const;
}

export function useAddOneDayMoim() {
  const handleAddOneDayMoim = async (
    data: WalksMoimOneDay,
    moimImg: string[]
  ) => {
    if (moimImg == null) {
      moimImg = [];
    }

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
      },
      {
        headers: {
          authorization: localStorage.getItem('accessToken') || '',
          refresh_token: localStorage.getItem('refreshToken') || '',
        },
      }
    );

    console.log(
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
      },
      'moim'
    );
    console.log(res, 'onedayMoimRes');

    return res;
  };

  return { handleAddOneDayMoim } as const;
}

export function useAddEveryWeekMoim() {
  const handleAddEveryWeekMoim = async (
    data: WalksMoimEveryWeek,
    moimImg: string[]
  ) => {
    if (moimImg == null) {
      moimImg = [];
    }

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
      },
      {
        headers: {
          authorization: localStorage.getItem('accessToken') || '',
          refresh_token: localStorage.getItem('refreshToken') || '',
        },
      }
    );

    console.log(
      {
        name: data.title,
        body: data.description,
        capacity: data.personCount,
        place: data.place,
        dates: data.plannedDates,
        time: dateToHMM(data.plannedTime),
        si: data.si,
        gu: data.gu,
        dong: data.dong,
        // images: data.images,
        imgUrls: [...moimImg],
      },
      'moim'
    );
    console.log(res, 'everyWeekMoimRes');

    return res;
  };

  return { handleAddEveryWeekMoim } as const;
}
