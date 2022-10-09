/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';
import UserState from '../states/UserState';
import NavLink from './NavLink';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [user] = useRecoilState(UserState);

  const mobile_navbar = css`
    @media screen and (max-width: 768px) {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 72px;
      background-color: #fff3e3;
      z-index: 2;

      ul {
        display: flex;
        align-items: center;
        justify-content: space-around;
        list-style: none;
        width: 100%;
        height: 100%;
      }

      a {
        opacity: 50%;
        color: #dc602a;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          font-size: 2.3rem;
          padding-bottom: 0.5rem;
        }
        .nav_text {
          font-size: 0.8rem;
        }
        :hover {
          opacity: 100%;
        }
        :active {
          opacity: 100%;
        }
        &.active {
          opacity: 100%;
        }
      }
    }
    @media screen and (min-width: 769px) {
      display: none;
    }
  `;

  const desktop_navbar = css`
    @media screen and (max-width: 768px) {
      display: none;
    }
    height: 75px;
    width: 100%;
    background-color: #fff3e3;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    li {
      list-style: none;
    }
    a {
      opacity: 0.8;
      text-decoration: none;
      color: black;
      font-size: 1rem;
      :hover {
        font-weight: 500;
      }
      &.active {
        font-weight: 500;
        color: #dc602a;
      }
    }
    .logo {
      cursor: default;
      color: #dc602a;
      font-weight: 700;
      font-size: 2rem;
      margin-right: 2rem;
    }
    .menus {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
    }
    .tabs {
      display: flex;
      align-items: center;
      a {
        margin-right: 2rem;
      }
    }
  `;

  useEffect(() => {
    if (localStorage.getItem('accessToken')) setIsLoggedIn(true);
  }, []);

  return (
    <>
      <nav css={mobile_navbar}>
        <ul>
          <li>
            <NavLink href="/">
              <Icon icon="akar-icons:home" className="icon" />
              <p className="nav_text">메인</p>
            </NavLink>
          </li>
          <li>
            <NavLink href="/walks">
              <Icon icon="ph:dog" className="icon" />
              <p className="nav_text">산책 찾기</p>
            </NavLink>
          </li>
          {isLoggedIn ? (
            <li>
              <NavLink href={`/users/${user.id}`}>
                <Icon
                  icon="fluent-emoji-high-contrast:paw-prints"
                  className="icon"
                />
                <p className="nav_text">마이페이지</p>
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink href="/login">
                <Icon
                  icon="fluent-emoji-high-contrast:paw-prints"
                  className="icon"
                />
                <p className="nav_text">마이페이지</p>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <nav css={desktop_navbar}>
        <div className="menus">
          <ul className="tabs">
            <li className="logo">ㅅㅊ</li>
            <li>
              <NavLink href="/">홈</NavLink>
            </li>
            <li>
              <NavLink href="/walks">산책 찾기</NavLink>
            </li>
          </ul>
          {isLoggedIn ? (
            <li>
              <NavLink href={`/users/${user.id}`}>마이페이지</NavLink>
            </li>
          ) : (
            <li>
              <NavLink href="/login">로그인/회원가입</NavLink>
            </li>
          )}
        </div>
      </nav>
    </>
  );
}
