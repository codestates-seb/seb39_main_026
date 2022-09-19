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
  const { control } = useFormContext<WalksMoimOneDay>();

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
                autoFocus
                locale="ko"
                selected={value}
                minDate={new Date()}
                onChange={(date: Date) => onChange(date)}
                dateFormat="yyyy년 MM월 dd일 E요일"
                isClearable
                withPortal
                placeholderText="여기를 눌러 날짜를 선택해주세요."
                // closeOnScroll={true}
              >
                <div
                  css={css`
                    color: ${Theme.errorMessagesColor};
                    text-align: center;
                    margin: 20px 0;
                  `}
                >
                  날씨를 확인하는 것을 잊지 마세요!
                </div>
              </DatePicker>
              <div css={errormessageContainer}>
                {error && <p>{error.message}</p>}
              </div>
              <TimeSelectBox />
            </>
          );
        }}
      />
    </>
  );
}
