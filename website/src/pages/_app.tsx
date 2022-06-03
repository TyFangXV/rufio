import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/nav';
import { useRouter } from 'next/router';
import TopBar from '../components/nav/sub-component/topbar';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        //check if the url has a code param in it 
        const code = router.query.code;
        
        if(code) {
            axios.get("localhost:3001/auth/google/cb", {
                params: {
                    code: code
                }
            })
            .then(res => {
                console.log(res);
            }
            )
        }
    })

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