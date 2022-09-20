export enum YOIL {
  '일' = 'SUN',
  '월' = 'MON',
  '화' = 'TUE',
  '수' = 'WED',
  '목' = 'THU',
  '금' = 'FRI',
  '토' = 'SAT',
}

export type Yoil = `${YOIL}`;

interface WalksMoimBase {
  title: string;
  place: string;
  description: string;
  personCount: number;
  plannedTime: Date;
}

export const WalksMoimTypes = {
  단기모임: 'oneDay',
  매주모임: 'everyWeek',
} as const;

export type WalksMoimType = typeof WalksMoimTypes[keyof typeof WalksMoimTypes];

export interface WalksMoimOneDay extends WalksMoimBase {
  type: typeof WalksMoimTypes['단기모임'];
  plannedDate: Date;
}

export interface WalksMoimEveryWeek extends WalksMoimBase {
  type: typeof WalksMoimTypes['매주모임'];
  plannedDates: Yoil[];
}

export type WalksMoim = WalksMoimOneDay | WalksMoimEveryWeek;
