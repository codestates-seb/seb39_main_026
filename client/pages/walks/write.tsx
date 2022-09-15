import { css } from '@emotion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TabTitle from '../../components/TabTitle';
import DateSelectBox from '../../components/walks/wirte/DateSelectBox';
import DaySelectBox from '../../components/walks/wirte/DaySelectBox';
import PersonCountInput from '../../components/walks/wirte/PersonCountInput';
import { WalksMoim } from '../../models/WalksMoim';
import { Theme } from '../../styles/Theme';

export default function Write() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WalksMoim>({
    mode: 'onChange',
    defaultValues: {
      personCount: 2,
    },
  });

  const [plan, setPlan] = useState('day');

  const handlePlanSelectButtonClick = (buttonType: string) => {
    setPlan(buttonType);
  };

  return (
    <>
      <TabTitle prefix="모임 글쓰기" />
      <section css={moimFormContainer}>
        <h1>🐕 산책 모임 만들기</h1>
        <form>
          <ul>
            <li>
              <label htmlFor="moim-name">모임의 이름을 지어주세요.</label>
              <input
                type="text"
                id="moim-name"
                {...register('name', {
                  validate: {
                    empty: (v) =>
                      (v != null && v !== '') || '모임의 이름을 입력해주세요.',
                  },
                })}
              />
              {errors.name ? <p>{errors.name.message}</p> : <p></p>}
            </li>
            <li>
              <label htmlFor="moim-place">자세한 모임 장소를 알려주세요.</label>
              <input
                type="text"
                id="moim-place"
                {...register('place', {
                  validate: {
                    empty: (v) =>
                      (v != null && v !== '') || '모임의 장소를 입력해주세요.',
                  },
                })}
              />
              {errors.place ? <p>{errors.place.message}</p> : <p></p>}
            </li>
            <li>
              <label htmlFor="moim-description">어떤 산책을 하고 싶나요?</label>
              <textarea
                id="moim-description"
                placeholder="저희 강쥐가 낯을 많이 가려서 비슷하게 순둥하게 산책할 친구 찾아요!"
                {...register('description', {
                  validate: {
                    empty: (v) =>
                      (v != null && v !== '') || '내용을 입력해주세요.',
                  },
                })}
              />
              {errors.description ? (
                <p>{errors.description.message}</p>
              ) : (
                <p></p>
              )}
            </li>
            <li>
              <label htmlFor="moim-personCount">정원을 정해주세요</label>
              <PersonCountInput control={control} />
            </li>
            <li>
              <label htmlFor="moim-plan">모임 날짜를 정해주세요.</label>
            </li>
            <li>
              <button
                type="button"
                className={plan === 'day' ? 'active' : ''}
                onClick={() => handlePlanSelectButtonClick('day')}
              >
                요일로 선택하기
              </button>
              <button
                type="button"
                className={plan === 'date' ? 'active' : ''}
                onClick={() => handlePlanSelectButtonClick('date')}
              >
                날짜로 선택하기
              </button>
            </li>
            <li>{plan === 'day' ? <DaySelectBox /> : <DateSelectBox />}</li>
            <li>
              <button
                type="button"
                onClick={handleSubmit((e) => {
                  console.log(e);
                })}
              >
                등록
              </button>
            </li>
          </ul>
        </form>
      </section>
    </>
  );
}

const moimFormContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  border: 1px solid;
  margin: 0 auto;

  form ul li {
    margin-top: 20px;
  }

  form {
    padding: 0 36px;
    width: 100%;
  }

  ul {
    list-style: none;
  }

  li {
    label {
      display: block;
      margin-bottom: 20px;
      font-weight: 600;
    }

    input {
      width: 100%;
      padding: 10px;
      background-color: #f7f7f5;
      border: 1px solid #f7f7f5;
      border-radius: 15px;
    }

    textarea {
      width: 100%;
      height: 200px;
      padding: 10px;
      background-color: ${Theme.inputBgColor};
      border: 1px solid ${Theme.inputBgColor};
      border-radius: 15px;
    }

    p {
      height: 17px;
      color: ${Theme.errorMessagesColor};
      font-size: 12px;
    }
  }
`;
