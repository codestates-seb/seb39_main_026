import { css } from '@emotion/react';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { WalksMoim } from '../../../models/WalksMoim';
import { Theme } from '../../../styles/Theme';

const placeInputContainer = css`
  width: 100%;
  padding: 20px 30px;
  background-color: #f7f7f5;
  border: 1px solid #f7f7f5;
  border-radius: 15px;
`;

const errormessageContainer = css`
  height: 17px;

  p {
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
  }
`;

export default function PlaceInput({
  register,
  errors,
}: {
  register: UseFormRegister<WalksMoim>;
  errors: FieldErrorsImpl<WalksMoim>;
}) {
  return (
    <>
      <input
        type="text"
        id="moim-place"
        css={placeInputContainer}
        {...register('place', {
          validate: {
            empty: (v) =>
              (v != null && v !== '') || '모임의 장소를 입력해주세요.',
          },
        })}
      />
      <div css={errormessageContainer}>
        {errors.place && <p>{errors.place.message}</p>}
      </div>
    </>
  );
}
