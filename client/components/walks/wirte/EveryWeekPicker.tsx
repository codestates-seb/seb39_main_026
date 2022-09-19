import { css } from '@emotion/react';
import { Controller, useFormContext } from 'react-hook-form';
import { WalksMoimEveryWeek, YOIL } from '../../../models/WalksMoim';
import { Theme } from '../../../styles/Theme';
import TimeSelectBox from './TimeSelectBox';

const errormessageContainer = css`
  height: 17px;

  p {
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
  }
`;

export default function DaySelectBox() {
  const { control } = useFormContext<WalksMoimEveryWeek>(); // retrieve all hook methods

  return (
    <>
      <Controller
        rules={{
          validate: {
            required: (value) => value?.length > 0 || '요일을 선택해주세요.',
          },
        }}
        control={control}
        name="plannedDates"
        render={({
          field: { onChange, value: yoilArr = [] },
          fieldState: { error },
        }) => {
          return (
            <>
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 10px;
                `}
              >
                <p
                  css={css`
                    font-size: 1rem;
                    font-weight: 500;
                  `}
                >
                  매주
                </p>
                {(Object.keys(YOIL) as Array<keyof typeof YOIL>).map((day) => {
                  const 요일 = day;
                  const yoil = YOIL[요일];
                  return (
                    <button
                      css={css`
                        cursor: pointer;
                        border: none;
                        padding: 10px 12px;
                        border-radius: 50px;
                        background: ${yoilArr.includes(yoil)
                          ? Theme.mainColor
                          : '#F7F7F5'};
                        color: ${yoilArr.includes(yoil) ? '#fff' : '#000'};
                      `}
                      className={
                        yoilArr.includes(yoil)
                          ? 'yoil-button active'
                          : 'yoil-button'
                      }
                      type="button"
                      key={`${yoil}-button`}
                      onClick={() => {
                        if (yoilArr.includes(yoil)) {
                          onChange(yoilArr.filter((x) => x !== yoil));
                        } else {
                          onChange([...yoilArr, yoil]);
                        }
                      }}
                    >
                      {요일}
                    </button>
                  );
                })}
              </div>

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
