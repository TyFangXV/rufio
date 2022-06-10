import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/nav';
import { useRouter } from 'next/router';
import TopBar from '../components/nav/sub-component/topbar';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();


  return (
        <div className={"homeContainer"}>
        <div className='nav'>
            <div className={"bar"}>
            <TopBar/>
            </div>
            <div className={"sidebar"}>
                <Nav/>              
            </div>
        </div>
        <div className='screen'>
            <Component {...pageProps} />          
        </div>

        </div>        
  )
}

export default MyApp