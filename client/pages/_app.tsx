import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ㅅㅊ</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
