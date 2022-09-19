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
  const { control } = useFormContext<WalksMoimOneDay>();

  return (
    <>
      <Controller
        rules={{
          validate: {
            required: (value) => value != null || '시간을 선택해주세요.',
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
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                timeCaption="시간을 선택해주세요"
                dateFormat="aa HH:mm"
                withPortal
                isClearable
                placeholderText="여기를 눌러 시간을 선택해주세요."
                className="time-picker"
                // closeOnScroll={true}
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
