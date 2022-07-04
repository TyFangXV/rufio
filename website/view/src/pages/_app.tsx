import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import AppViewHandler from './home/handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from '../utils/redux/store';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();

  //check if the path is under /home or is /home
  const isHome =
    router.pathname === '/home' || router.pathname.includes('/home/');
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div>
          {isHome ? (
            <AppViewHandler Component={Component} pageProps={pageProps} />
          ) : (
            <Component {...pageProps} />
          )
        }
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
