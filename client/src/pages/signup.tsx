import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import CommonButton from '../components/CommonButton';
import RegionPick from '../components/RegionPick';
import TabTitle from '../components/TabTitle';
import { useLogin, useSignup } from '../hooks/UsersQuery';
import { UserSignup } from '../models/UserSignup';
import { LoginState } from '../states/LoginState';
import UserState from '../states/UserState';
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

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url('/arrow-down.svg');
    background-repeat: no-repeat;
    background-position: right 0.5rem top 50%;
    background-size: 1rem;
    cursor: pointer;
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
  const methods = useForm<UserSignup>({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setFocus,
    getValues,
    formState: { errors, isValid },
  } = methods;

  const [user, setUser] = useRecoilState(UserState);
  const [, setIsLoggedIn] = useRecoilState(LoginState);

  const { handleSignup } = useSignup();
  const { handleLogin } = useLogin();

  const onClickSignup = async (value: UserSignup) => {
    try {
      await handleSignup(value);
      const data = await handleLogin({
        email: value.email,
        password: value.password,
      });
      setUser(data);

      localStorage.setItem(
        'currentAddress',
        `${data.address.si} ${data.address.gu} ${data.address.dong}`
      );

      setIsLoggedIn(true);
      router.push('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.error === 'Email already exists') {
        alert('?????? ????????? ????????? ?????????!');
        setFocus('email');
        return;
      } else if (error.response.data.error === 'Username already exists') {
        alert('?????? ???????????? ??????????????????!');
        setFocus('username');
        return;
      }
    }
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TabTitle prefix="????????????" />

      <section css={signUpContainer}>
        <h1>???????????? ????????????</h1>
        <form>
          <FormProvider {...methods}>
            <dl>
              <dt>?????????</dt>
              <dd>
                <input
                  id="user-email"
                  type="email"
                  placeholder="???????????? ??????????????????"
                  {...register('email', {
                    validate: {
                      empty: (v) =>
                        (v != null && v !== '') || '???????????? ??????????????????.',
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '????????? ????????? ????????????.',
                    },
                  })}
                />
              </dd>
              <dd className="error-area">
                {errors.email && errors.email.message}
              </dd>
              <dt>????????????</dt>
              <dd>
                <input
                  id="user-password"
                  type="password"
                  placeholder="??????????????? ??????????????????"
                  {...register('password', {
                    validate: {
                      empty: (v) =>
                        (v != null && v !== '') || '??????????????? ??????????????????.',
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                      message:
                        '??????????????? 8~16??? ??????, ?????? ????????? ???????????????.',
                    },
                  })}
                />
              </dd>
              <dd className="error-area">
                {errors.password && errors.password.message}
              </dd>
              <dt>???????????? ??????</dt>
              <dd>
                <input
                  id="user-password-check"
                  type="password"
                  placeholder="??????????????? ??? ??? ??? ??????????????????"
                  {...register('passwordCheck', {
                    validate: {
                      empty: (v) =>
                        (v != null && v !== '') || '??????????????? ??????????????????.',
                      match: (v) =>
                        v === getValues('password') ||
                        '??????????????? ???????????? ????????????.',
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                      message:
                        '??????????????? 8~16??? ??????, ?????? ????????? ???????????????.',
                    },
                  })}
                />
              </dd>
              <dd className="error-area">
                {errors.passwordCheck && errors.passwordCheck.message}
              </dd>
              <dt>?????????</dt>
              <dd>
                <input
                  id="user-nikname"
                  type="text"
                  placeholder="???????????? ??????????????????"
                  {...register('username', {
                    validate: {
                      empty: (v) =>
                        (v != null && v !== '') || '???????????? ??????????????????.',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9???-???]{2,10}$/,
                      message:
                        '???????????? 2~10????????? ??????, ??????, ????????? ???????????????.',
                    },
                  })}
                />
              </dd>
              <dd className="error-area">
                {errors.username && errors.username.message}
              </dd>
              <h2>??? ?????? ??????</h2>
              <RegionPick />
            </dl>
            <CommonButton
              type="button"
              onClick={handleSubmit(onClickSignup)}
              disabled={!isValid}
            >
              ?????? ????????????
            </CommonButton>
          </FormProvider>
        </form>
      </section>
    </>
  );
}
