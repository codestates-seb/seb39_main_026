import Head from 'next/head';

export default function TabTitle({ prefix }: { prefix?: string }) {
  if (prefix == null) {
    return null;
  }

  const title = `${prefix} | ㅅㅊ`;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="소심견도, 인싸견도 괜찮아! 성향대로 모이는 동네 기반 산책 모임 플랫폼"
      />
      <meta
        property="og:image"
        content="https://github.com/codestates-seb/seb39_main_026/blob/main/metaImage.png?raw=true"
      />
    </Head>
  );
}
