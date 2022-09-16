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
  name: string;
  place: string;
  description: string;
  personCount: number;
  plannedTime: Date;
}

export interface WalksMoimOneDay extends WalksMoimBase {
  plannedDate: Date;
}

export interface WalksMoimEveryWeek extends WalksMoimBase {
  plannedDates: Yoil[];
}

export type WalksMoim = WalksMoimOneDay | WalksMoimEveryWeek;
