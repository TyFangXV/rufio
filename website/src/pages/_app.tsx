import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/nav';
import TopBar from '../components/nav/sub-component/topbar';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
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