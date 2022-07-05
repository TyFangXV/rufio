import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../utils/redux/store'
import { Provider, useSelector } from 'react-redux'
import AppViewHandler from './home/handler';
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

  //check if the path is under /home or is /home
  const isHome =
    router.pathname === '/home' || router.pathname.includes('/home/')

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <div>
        {
          isHome ? (
            <AppViewHandler Component={Component} pageProps={pageProps} />
          ) : (
            <Component {...pageProps} />
          )
        }
      </div>      
      </QueryClientProvider> 
    </Provider>

  )
}

export default MyApp
