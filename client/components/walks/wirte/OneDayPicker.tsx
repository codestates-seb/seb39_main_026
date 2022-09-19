import { css } from '@emotion/react';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { WalksMoimOneDay } from '../../../models/WalksMoim';
import { Theme } from '../../../styles/Theme';
import TimeSelectBox from './TimeSelectBox';

registerLocale('ko', ko);

const errormessageContainer = css`
  height: 17px;

  p {
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
  }
`;

export default function DateSelectBox() {
  const { control } = useFormContext<WalksMoimOneDay>(); // retrieve all hook methods

  return (
    <>
      <Controller
        rules={{
          validate: {
            required: (value) => value != null || '날짜를 선택해주세요.',
          },
        }}
        control={control}
        name="plannedDate"
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <DatePicker
                locale="ko"
                selected={value}
                onChange={(date: Date) => onChange(date)}
                minDate={new Date()}
                dateFormat="yyyy.MM.dd"
              />
              <TimeSelectBox />
              <div css={errormessageContainer}>
                {error && <p>{error.message}</p>}
              </div>
            </>
          );
        }}
      />
    </>
  );
}
