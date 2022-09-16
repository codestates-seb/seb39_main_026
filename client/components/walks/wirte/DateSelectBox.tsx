import { css } from '@emotion/react';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Controller, Control } from 'react-hook-form';
import { WalksMoim } from '../../../models/WalksMoim';
import { Theme } from '../../../styles/Theme';

registerLocale('ko', ko);

const errormessageContainer = css`
  height: 17px;

  p {
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
  }
`;

export default function DateSelectBox({
  control,
}: {
  control: Control<WalksMoim>;
}) {
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
                showDisabledMonthNavigation
                showTimeSelect
                dateFormat="yyyy.MM.dd aa HH:mm"
                timeIntervals={10}
                open
              ></DatePicker>
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
