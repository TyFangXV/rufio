import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/nav';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useRouter } from 'next/router';
import TopBar from '../components/nav/sub-component/topbar';

import settings from '../utils/constant/settings';
import axios from 'axios';
import { decrypt } from '../utils/crypter';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Provider, useDispatch } from 'react-redux';
import store from '../utils/redux/store';
import { setAccount } from '../utils/redux/reducers/account';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <Instanitiate/>
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
        </QueryClientProvider>          
    </Provider>
     
  )
}

const Instanitiate:React.FC = () => {
    const router = useRouter();
    const [_pageIsLoading, setLoading] = useState<boolean>();
    const dispatch = useDispatch();

    let code:any;
  
    useEffect(() => {
        //get the code from the url
        const urlParams = new URLSearchParams(window.location.search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        code = urlParams.get('code');        
    })
  
  
  
    // login in methods
    const loginWithCode = async (code: string) => {
        const serverApiUrl = process.env.NODE_ENV === 'development' ? settings.apiDev : settings.apiProd;
        const {data:UserData} = await axios.get(`${serverApiUrl}/auth/github/cb?code=${code}`)
        let {user, token} = UserData;
  
        token =  decrypt(token);
  
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return {user, token};
    }

    const loginWithLocalStorage = async () => {
        const user = localStorage.getItem('user');
        if(user)
        {
             dispatch(setAccount(JSON.parse(user)));            
        }
    }


    const loginWithToken = async () => {
        const token = localStorage.getItem('token');
        if(token)
        {
            
        }
    }
  
  
    const {data, isLoading, isLoadingError} = useQuery('github', async () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if(token && user)
        {   
            loginWithLocalStorage()
        }

        if (code)
        {
            const {user, token} = await loginWithCode(code as string);
            
            if(user && token)
            {
                dispatch(setAccount(user));
                queryClient.cancelQueries("github");
                if(user.newUser)
                {
                    router.push("/signIn");
                }else{
                    router.push("/");
                }
            }

            if(isLoadingError)
            {
                queryClient.cancelQueries("github");
                router.push("/")
                
            }
             
            queryClient.cancelQueries("github")
            router.push("/")
        }
    })

    return (
        <>
            {
                isLoading && (
                    <div className="loadingCtn">
                        <Image src={"/loading.gif"} width={100} height={100} alt="loading"/>
                        <h1>Loading...</h1>
                    </div>
                )
            }
        </>
    )
}

export default MyApp