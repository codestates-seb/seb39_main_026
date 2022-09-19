import { Global, css } from '@emotion/react';
import { Theme } from './Theme';

const globalStyles = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
  }

  // 시간 선택

  .react-datepicker-time__header {
    color: ${Theme.mainColor};
    font-size: 1rem !important;
    font-weight: 600;
  }

  .react-datepicker__header {
    background-color: #fff;
    border-bottom: none;
  }

  .react-datepicker--time-only {
    width: 300px !important;

    @media screen and (max-width: 310px) {
      width: 250px !important;
    }
  }

  .react-datepicker__time-container,
  .react-datepicker__time-box {
    width: 100% !important;
  }

  .react-datepicker__time-list {
    li {
      margin-top: 0 !important;
    }
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    height: unset !important;
    padding: 15px 0px;
  }

  .react-datepicker__month-container {
    float: unset;
  }

  .react-datepicker__time-list .react-datepicker__time-list-item--selected {
    border-radius: 20px !important;
  }

  // 달력

  .react-datepicker {
    border-radius: 20px;
    padding: 0 10px;
    overflow: hidden;
  }

  .react-datepicker__current-month {
    margin-top: 20px;
    padding-left: 15px;
    text-align: start;
    font-size: 1rem !important;
    font-weight: 600;
  }

  .react-datepicker__navigation--previous {
    left: unset;
    right: 52px !important;
  }

  .react-datepicker__navigation--next {
    right: 20px !important;
  }

  .react-datepicker__navigation {
    top: 22.6px !important;
  }

  .react-datepicker__navigation-icon--next,
  .react-datepicker__navigation-icon--previous {
    &::before {
      border-color: ${Theme.mainColor} !important;
    }
  }

  .react-datepicker__navigation:hover *::before {
    border-color: #f49870 !important;
  }

  .react-datepicker__day-names {
    font-size: 0.8rem !important;
    font-weight: 500 !important;
    margin-top: 12px !important;
  }

  .react-datepicker__day-names {
    .react-datepicker__day-name {
      color: ${Theme.disableColor} !important;
    }
  }

  .react-datepicker__month {
    font-weight: 400 !important;

    height: 350px;

    @media screen and (max-width: 400px) {
      height: 300px;
    }
  }

  .react-datepicker__day--today,
  .react-datepicker__day--keyboard-selected {
    font-weight: unset !important;
  }

  .react-datepicker__day--selected {
    background-color: ${Theme.mainColor} !important;
  }

  .react-datepicker__day:hover {
    background-color: #f4987085 !important;
    color: #fff !important;
    border-radius: 50% !important;
  }

  .react-datepicker__close-icon::after {
    background-color: ${Theme.mainColor} !important;
    height: 25px !important;
    width: 25px !important;
    font-size: 1.2rem !important;
    line-height: 1.2 !important;
  }

  .react-datepicker__input-container > input {
    width: calc(100% - 38px) !important;
    padding: 20px 30px;
    background-color: #f7f7f5;
    border: 1px solid #f7f7f5;
    border-radius: 15px;
  }

  [aria-selected='true'] {
    background-color: ${Theme.mainColor} !important;
    color: #fff !important;
    border-radius: 50% !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: unset !important;
    color: ${Theme.mainColor} !important;
  }
`;

export default function GlobalStyle() {
  return <Global styles={globalStyles} />;
}
