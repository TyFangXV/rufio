import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <MantineProvider theme={{colorScheme : "dark"}}>
        <Component {...pageProps} />
      </MantineProvider>      
    </RecoilRoot>

  );
}
export default MyApp;
