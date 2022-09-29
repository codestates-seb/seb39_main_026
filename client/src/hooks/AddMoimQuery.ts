import axios from 'axios';
import { dateToHMM, dateToYYYYMMDD } from '../../util/transformDate';
import { API } from '../apis/api';
import { WalksMoimOneDay, WalksMoimEveryWeek } from '../models/WalksMoim';

export function useAddOneDayMoim() {
  const handleAddOneDayMoim = async (data: WalksMoimOneDay) => {
    const res = await axios.post(
      API.WALKS,
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
        // images: data.images,
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
  const handleAddEveryWeekMoim = async (data: WalksMoimEveryWeek) => {
    const res = await axios.post(
      API.WALKS,
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
