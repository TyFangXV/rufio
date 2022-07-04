import Nav from '../../components/nav';
import { useRouter } from 'next/router';
import TopBar from '../../components/nav/sub-component/topbar';
import axios from 'axios';
import React, { useEffect } from 'react';
import Image from 'next/image';
import {useDispatch } from 'react-redux';
import { setAccount } from '../../utils/redux/reducers/user';
import { useQuery } from 'react-query';



type Props = {
    Component: React.ComponentType<any>;
    pageProps: any;
}

function MyApp({ Component, pageProps}:Props) {
    const router = useRouter();
    
  return (
        <div>
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
        </div>     
  )
}

const Instanitiate:React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    let code:any;
  
    useEffect(() => {
        //get the code from the url
        const urlParams = new URLSearchParams(window.location.search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        code = urlParams.get('code');        
    })
  
  
  

    const loginWithLocalStorage = async () => {
        const user = localStorage.getItem('user');
        if(user)
        {
             dispatch(setAccount(JSON.parse(user)));            
        }
    }


  
  
    const { isLoading, error, data, } = useQuery('fetcAuthData', async() => {
        try {
            if(code)
            {
                const {data:authRequestRes} = await axios.post(`/api/jsw`, {code});
                const authData = authRequestRes.data.user;
                if(authData)
                {
                    dispatch(setAccount(authData)); 
                    
                    if(authData.newUser)
                    {
                        router.push("/signin")
                    }else{
                        localStorage.setItem('user', JSON.stringify(authData));
                        router.push("/home")
                    }
                }else{
                    alert("Something went wrong")
                    router.push("/home")
                }
            }else if(localStorage.getItem('user'))
            {
                loginWithLocalStorage();
            }
        } catch (error) {
            alert(error)
            router.push("/home")
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