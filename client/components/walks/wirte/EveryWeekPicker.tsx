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
          validate: {},
        }}
        control={control}
        name="plannedDates"
        render={({
          field: { onChange, value: yoilArr = [] },
          fieldState: { error },
        }) => {
          return (
            <>
              {(Object.keys(YOIL) as Array<keyof typeof YOIL>).map((day) => {
                const 요일 = day;
                const yoil = YOIL[요일];

                return (
                  <button
                    css={css`
                      ${yoilArr.includes(yoil)
                        ? `background-color: ${Theme.mainColor}; color: white;`
                        : ''}
                    `}
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
