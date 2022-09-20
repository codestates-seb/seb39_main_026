import Head from 'next/head';

export default function TabTitle({ prefix }: { prefix?: string }) {
  if (prefix == null) {
    return null;
  }

  const title = `${prefix} | ㅅㅊ`;

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
