import type { AppProps } from "next/app";
import "../styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { AuthProvider } from "../utils/auth/auth";
import { Provider } from "next-auth/client";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>WesterosCraft Launcher</title>
      </Head>
      <Provider session={pageProps.session}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </>
  );
};

export default MyApp;
