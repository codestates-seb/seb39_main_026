import { Global, css } from '@emotion/react';

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
`;

export default function GlobalStyle() {
  return <Global styles={globalStyles} />;
}
