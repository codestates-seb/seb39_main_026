import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CommonButton from '../components/CommonButton';
import ResionPick from '../components/ResionPick';
import TabTitle from '../components/TabTitle';
import useSignup from '../hooks/SignupQuery';
import { UserSingup } from '../models/UserSingup';
import { Theme } from '../styles/Theme';

const signUpContainer = css`
  min-height: calc(100vh - 75px);
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;

  @media screen and (max-width: 768px) {
    padding: 35px 34px;
  }

  h1 {
    margin-bottom: 22px;
  }

  form > dl {
    display: flex;
    flex-direction: column;
    gap: 22px;
    margin-bottom: 22px;
  }

  dt {
    display: none;
  }

  input,
  select {
    width: 100%;
    height: 100%;
    padding: 14px 24px;
    background-color: #f7f7f5;
    border: 0;
    border-radius: 15px;
    font-size: 1rem;
    letter-spacing: 0.3px;

    &::placeholder {
      color: #c9c9c9;
    }
  }

  h2 {
    font-size: 1.1rem;
  }

  .gender-pick > select {
    width: 100%;
    padding: 10px 24px;
    color: #c9c9c9;
  }

  dd.error-area {
    height: 17px;
    text-align: center;
    color: ${Theme.errorMessagesColor};
    font-size: 0.9rem;
  }
`;

export default function Signup() {
  const router = useRouter();
  const methods = useForm<UserSingup>({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors, isValid },
  } = methods;

  const { handleSignup } = useSignup();

  const onClickSignup = async (value: UserSingup) => {
    try {
      const address = localStorage.getItem('currentAddress');

      const data = {
        ...value,
        gu: address?.split(' ')[0],
        si: address?.split(' ')[1],
        dong: address?.split(' ')[2],
      };

      const res = await handleSignup(data);

      console.log(res);
      router.push('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.status === 409) {
        reset();
        alert('이미 가입한 사용자 입니다!');
        return;
      }
    }
  };

  useEffect(() => {
    localStorage.removeItem('currentAddress');
    setFocus('email');
  }, [setFocus]);

  return (
    <>
      <TabTitle prefix="회원가입" />

      <section css={signUpContainer}>
        <h1>이메일로 회원가입</h1>
        <form>
          <FormProvider {...methods}>
            <dl>
              <dt>이메일</dt>
              <dd>
                <input
                  id="user-email"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  {...register('email', {
                    validate: {
                      empty: (v) =>
                        (v != null && v !== '') || '이메일을 입력해주세요.',
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '이메일 형식이 아닙니다.',
                    },
                  })}
                />
              </dd>
              <dd className="error-area">
                {errors.email && errors.email.message}
              </dd>
              <dt>비밀번호</dt>
              <dd>
                <input
                  id="user-password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  {...register('password', {
                    validate: {
                      empty: (v) =>
                        (v != null && v !== '') || '비밀번호를 입력해주세요.',
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                      message:
                        '비밀번호는 8~16자 영문, 숫자 조합만 가능합니다.',
                    },
                  })}
                />
              </dd>
              <dd className="error-area">
                {errors.password && errors.password.message}
              </dd>
              <dt>닉네임</dt>
              <dd>
                <input
                  id="user-nikname"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  {...register('username', {
                    validate: {
                      empty: (v) =>
                        (v != null && v !== '') || '닉네임을 입력해주세요.',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9가-힣]{2,10}$/,
                      message:
                        '닉네임은 2~10자리의 영문, 숫자, 한글만 가능합니다.',
                    },
                  })}
                />
              </dd>
              <dd className="error-area">
                {errors.username && errors.username.message}
              </dd>
              <h2>주 산책 지역</h2>
              <ResionPick />
            </dl>
            <CommonButton
              type="button"
              onClick={handleSubmit(onClickSignup)}
              disabled={!isValid}
            >
              회원 가입하기
            </CommonButton>
          </FormProvider>
        </form>
      </section>
    </>
  );
}
