import { css } from '@emotion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TabTitle from '../../components/TabTitle';
import DateSelectBox from '../../components/walks/wirte/DateSelectBox';
import DaySelectBox from '../../components/walks/wirte/DaySelectBox';
import DescriptionInput from '../../components/walks/wirte/DescriptionInput';
import NameInput from '../../components/walks/wirte/NameInput';
import PersonCountInput from '../../components/walks/wirte/PersonCountInput';
import PlaceInput from '../../components/walks/wirte/PlaceInput';
import { WalksMoim } from '../../models/WalksMoim';

export default function Write() {
  const {
    register,
    handleSubmit,
    control,
    setFocus,
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
              <NameInput
                register={register}
                errors={errors}
                setFocus={setFocus}
              />
            </li>
            <li>
              <label htmlFor="moim-place">자세한 모임 장소를 알려주세요.</label>
              <PlaceInput register={register} errors={errors} />
            </li>
            <li>
              <label htmlFor="moim-description">어떤 산책을 하고 싶나요?</label>
              <DescriptionInput register={register} errors={errors} />
            </li>
            <li>
              <label htmlFor="moim-personCount">정원을 정해주세요</label>
              <PersonCountInput control={control} />
            </li>
            <li>
              <label htmlFor="moim-plan">모임 날짜를 정해주세요.</label>
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
      font-size: 1.1rem;
    }
  }
`;
