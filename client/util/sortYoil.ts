import { Yoil } from '../src/models/WalksMoim';

const weekDay: Record<Yoil, number> = {
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,
};

export const yoilSort = (a: Yoil, b: Yoil) => {
  if (weekDay[a] - weekDay[b] >= 0) {
    return 1;
  } else {
    return -1;
  }
};

// 요일 순서대로 정렬하고 싶을 때 사용
// [요일이 들어간 배열].sort(yoilSort);
