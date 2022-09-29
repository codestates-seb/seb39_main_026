import { css } from '@emotion/react';
import { useEffect } from 'react';
import {
  UseFormRegister,
  FieldErrorsImpl,
  UseFormSetFocus,
} from 'react-hook-form';
import { WalksMoim } from '../../../models/WalksMoim';
import { Theme } from '../../../styles/Theme';

const titleInputContainer = css`
  width: 100%;
  padding: 20px 30px;
  background-color: ${Theme.inputBgColor};
  border: 1px solid ${Theme.inputBgColor};
  border-radius: 15px;
`;

const errormessageContainer = css`
  height: 17px;

  p {
    color: ${Theme.errorMessagesColor};
    font-size: 0.8rem;
  }
`;

export default function TitleInput({
  register,
  errors,
  setFocus,
}: {
  register: UseFormRegister<WalksMoim>;
  errors: FieldErrorsImpl<WalksMoim>;
  setFocus: UseFormSetFocus<WalksMoim>;
}) {
  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  return (
    <>
      <input
        type="text"
        id="moim-title"
        css={titleInputContainer}
        {...register('title', {
          validate: {
            empty: (v) =>
              (v != null && v !== '') || '모임의 이름을 입력해주세요.',
          },
        })}
      />
      <div css={errormessageContainer}>
        {errors.title && <p>{errors.title.message}</p>}
      </div>
    </>
  );
}
