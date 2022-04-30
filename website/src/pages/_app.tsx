import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { AccountProvider } from '../utils/context/AccountProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <RecoilRoot>
        <MantineProvider>
          <ModalsProvider>
          <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
      </RecoilRoot>
    </AccountProvider>
    );      
}

export default MyApp;
