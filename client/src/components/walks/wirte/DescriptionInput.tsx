import { css } from '@emotion/react';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { WalksMoim } from '../../../models/WalksMoim';
import { Theme } from '../../../styles/Theme';

const descriptionInputContainer = css`
  width: 100%;
  height: 200px;
  padding: 25px 30px;
  background-color: ${Theme.inputBgColor};
  border: 1px solid ${Theme.inputBgColor};
  border-radius: 15px;
  resize: none;
`;

const errormessageContainer = css`
  height: 17px;

  p {
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
  }
`;

export default function DescriptionInput({
  register,
  errors,
}: {
  register: UseFormRegister<WalksMoim>;
  errors: FieldErrorsImpl<WalksMoim>;
}) {
  return (
    <>
      <textarea
        id="moim-description"
        css={descriptionInputContainer}
        placeholder="저희 강쥐가 낯을 많이 가려서 비슷하게 순둥하게 산책할 친구 찾아요!"
        {...register('description', {
          validate: {
            empty: (v) => (v != null && v !== '') || '내용을 입력해주세요.',
          },
        })}
      />
      <div css={errormessageContainer}>
        {errors.description && <p>{errors.description.message}</p>}
      </div>
    </>
  );
}
