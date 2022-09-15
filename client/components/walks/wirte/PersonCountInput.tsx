import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { WalksMoim } from '../../../models/WalksMoim';

export default function PersonCountInput({
  control,
}: {
  control: Control<WalksMoim>;
}) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsEdit(true);
  };

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
          if ((value !== 0 && value < 2) || isNaN(value)) {
            return;
          }

          onChange(value);
        };
        return (
          <>
            <button type="button" onClick={() => onChangeWithMin(value - 1)}>
              -
            </button>
            {isEdit ? (
              <input
                autoFocus
                type="text"
                value={value}
                onBlur={() => setIsEdit(false)}
                onChange={(e) => onChangeWithMin(Number(e.target.value))}
              />
            ) : (
              <span onClick={handleEditButtonClick}>{value}</span>
            )}
            <button type="button" onClick={() => onChange(value + 1)}>
              +
            </button>
            {error && <p>{error.message}</p>}
          </>
        );
      }}
    />
  );
}
