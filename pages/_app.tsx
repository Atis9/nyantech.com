import { AppProps } from 'next/app';
import '@primer/css/index.scss';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
