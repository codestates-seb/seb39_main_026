import { format } from 'date-fns';

export function dateToYYYYMMDD(date?: Date) {
  if (date == null) return '';

  return format(date, 'yyyy-MM-dd');
}

export function dateToHMM(date?: Date) {
  if (date == null) return '';

  return format(date, 'HH:mm:ss');
}
