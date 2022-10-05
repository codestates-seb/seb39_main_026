import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { WalksMoim } from '../../../models/WalksMoim';
import { Theme } from '../../../styles/Theme';

const personCountInputContainer = css`
  display: flex;
  align-items: center;
  justify-content: end;

  button {
    border: none;
    background-color: transparent;
    width: 30px;
    height: 30px;
    cursor: pointer;

    .minus-button,
    .plus-button {
      width: 100%;
      height: 100%;
      color: ${Theme.mainColor};
    }

    .minus-button.disable {
      color: ${Theme.disableColor};
    }
  }

  span {
    width: 30px;
    text-align: center;
  }
`;

const errormessageContainer = css`
  height: 17px;

  p {
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
  }
`;

export default function PersonCountInput({
  control,
}: {
  control: Control<WalksMoim>;
}) {
  const [disable, setDisable] = useState(true);

  return (
    <Controller
      rules={{
        validate: {
          min: (v) => v >= 2 || '최소 2명 이상이어야 합니다.',
        },
      }}
      control={control}
      name="personCount"
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const onChangeWithMin = (value: number) => {
          if (value !== 0 && value < 2) {
            return;
          }
          if (value <= 2) {
            setDisable(true);
          } else {
            setDisable(false);
          }

          onChange(value);
        };

        return (
          <div css={personCountInputContainer}>
            <button type="button" onClick={() => onChangeWithMin(value - 1)}>
              <Icon
                icon="akar-icons:circle-minus-fill"
                className={disable ? 'minus-button disable' : 'minus-button'}
              />
            </button>
            <span>{value}</span>
            <button type="button" onClick={() => onChangeWithMin(value + 1)}>
              <Icon
                icon="akar-icons:circle-plus-fill"
                className="plus-button"
              />
            </button>
            <div css={errormessageContainer}>
              {error && <p>{error.message}</p>}
            </div>
          </div>
        );
      }}
    />
  );
}
