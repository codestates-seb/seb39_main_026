import { css } from '@emotion/react';
import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { WalksMoimOneDay } from '../../../models/WalksMoim';
import { Theme } from '../../../styles/Theme';

const errormessageContainer = css`
  height: 17px;

  p {
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
  }
`;

export default function TimeSelectBox() {
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
        name="plannedTime"
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <DatePicker
                locale="ko"
                selected={value}
                onChange={(time: Date) => onChange(time)}
                timeIntervals={10}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="시간"
                dateFormat="aa HH:mm"
              />
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
