import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps : { session, ...pageProps}, }: AppProps) {
  <SessionProvider session={session}>
  return <Component {...pageProps} />
  </SessionProvider>
}

export default MyApp
