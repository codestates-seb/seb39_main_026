import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import CommonButton from '../../components/CommonButton';
import TabTitle from '../../components/TabTitle';
import DescriptionInput from '../../components/walks/wirte/DescriptionInput';
import EveryWeekPicker from '../../components/walks/wirte/EveryWeekPicker';
import OneDayPicker from '../../components/walks/wirte/OneDayPicker';
import PersonCountInput from '../../components/walks/wirte/PersonCountInput';
import PlaceInput from '../../components/walks/wirte/PlaceInput';
import TitleInput from '../../components/walks/wirte/TitleInput';
import { WalksMoim } from '../../models/WalksMoim';
import 'react-datepicker/dist/react-datepicker.css';
import { Theme } from '../../styles/Theme';

export default function Write() {
  const methods = useForm<WalksMoim>({
    mode: 'onChange',
    defaultValues: {
      personCount: 2,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors, isValid },
    resetField,
  } = methods;

  const [plan, setPlan] = useState('day');

  const handlePlanSelectButtonClick = (buttonType: string) => {
    setPlan(buttonType);
  };

  const onSubmit = (data: WalksMoim) => {
    console.log(data);
  };

  useEffect(() => {
    resetField('plannedDate');
    resetField('plannedDates');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  return (
    <>
      <TabTitle prefix="모임 글쓰기" />
      <section css={moimFormContainer}>
        <h1>🐕 산책 모임 만들기</h1>

        <FormProvider {...methods}>
          <form>
            <ul>
              <li>
                <label htmlFor="moim-name">모임의 이름을 지어주세요.</label>
                <TitleInput
                  register={register}
                  errors={errors}
                  setFocus={setFocus}
                />
              </li>
              <li>
                <label htmlFor="moim-place">
                  자세한 모임 장소를 알려주세요.
                </label>
                <PlaceInput register={register} errors={errors} />
              </li>
              <li>
                <label htmlFor="moim-description">
                  어떤 산책을 하고 싶나요?
                </label>
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
                  className={
                    plan === 'day'
                      ? 'date-select-button active'
                      : 'date-select-button'
                  }
                  onClick={() => handlePlanSelectButtonClick('day')}
                >
                  요일로 선택하기
                </button>
                <button
                  type="button"
                  className={
                    plan === 'date'
                      ? 'date-select-button active'
                      : 'date-select-button'
                  }
                  onClick={() => handlePlanSelectButtonClick('date')}
                >
                  날짜로 선택하기
                </button>
              </li>
              <li>{plan === 'day' ? <EveryWeekPicker /> : <OneDayPicker />}</li>
              <li>
                <CommonButton
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValid}
                >
                  등록
                </CommonButton>
              </li>
            </ul>
          </form>
        </FormProvider>
      </section>
    </>
  );
}

const moimFormContainer = css`
  max-width: 800px;
  margin: 0 auto;
  padding: 35px;

  h1 {
    text-align: start;
    color: ${Theme.mainColor};
  }

  form ul li {
    margin-top: 20px;
  }

  form {
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

  button.date-select-button {
    border: none;
    padding: 13px 16px;
    border-radius: 20px;
    background-color: ${Theme.disableBgColor};
    color: ${Theme.disableColor};
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
  }

  button.date-select-button.active {
    background-color: ${Theme.mainColor};
    color: #fff;
  }

  button.date-select-button + button.date-select-button {
    margin-left: 10px;
  }
`;
