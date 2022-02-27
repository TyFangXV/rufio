import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { UITheme } from '../styles/home.theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <MantineProvider
        theme={{ colorScheme: 'dark' }}
        styles={UITheme}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </RecoilRoot>
  );
}
export default MyApp;
