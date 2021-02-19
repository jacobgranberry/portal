import type { AppProps } from 'next/app';
import '../styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { AuthProvider } from '../utils/auth/auth';
import '../utils/scripts/wdyr';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>WesterosCraft Launcher</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
