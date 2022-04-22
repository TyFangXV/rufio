import '../styles/globals.css'
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../utils/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>     
    </Provider>

  )
}

export default MyApp
