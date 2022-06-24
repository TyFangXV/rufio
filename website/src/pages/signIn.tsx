/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/signin.module.css';
import { setAccount } from "../utils/redux/reducers/linkedAccount";
import { setUserData } from "../utils/redux/reducers/user";
import { RootState } from "../utils/redux/store";

interface AccountViewProps {
    imgUrl : string;
    username : string;
}


const queryClient = new QueryClient()


const AccountView: React.FC<AccountViewProps> = (data) => {
    return (
        <div className={styles.profileContainer}>
            <img src={data.imgUrl} alt="signin" width={500} height={500} className={styles.image} />
            <h4>{data.username}</h4>
        </div>
    )
}




const SignIn:React.FC = () => {
    const dispatch = useDispatch();
    const accountData = useSelector((state:RootState) => state.account.account);
    const [Hasclicked, setHasClicked] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    
    if(!accountData.newUser)
    {
        Router.push("/")
    }
    

    //once the user click the submit button it will render this component which will handle the sign in process
    const LoadingModal: React.FC = () => {
        const {data, isLoading, isLoadingError} = useQuery('user', async () => {
            if(Hasclicked)
            {
            try {
                    setLoading(true);
                    const {data:userData} = await axios.post("/api/psw", {username, linkAcccountID : accountData.id, provider : accountData.provider});
                    
                    if(userData)
                    {
                        queryClient.cancelQueries("github");
                        setLoading(false);
                        dispatch(setAccount({...accountData, newUser : false, isSignedIn : true}));
                        dispatch(setUserData(userData));
                        Router.push("/")
                    }
        
                    if(isLoadingError)
                    {
                        queryClient.cancelQueries("github");
                        setLoading(false);
                        Router.push("/");
                        alert("Try signing in again");
                    }
                } catch (error) {
                    queryClient.cancelQueries("github");
                    setLoading(false);
                    Router.push("/");
                    alert("Try signing in again");
                }
                
                if(data)
                {
                    queryClient.cancelQueries("github");
                }            
            }
        })
            
        return(
            <div className="loadingCtn">
            <Image src={"/loading.gif"} width={100} height={100} alt="loading"/>
            <h1>Loading...</h1>
        </div>
        )
    }


    const HandleSubmit = () => {
        setHasClicked(true);
    }
 
    return (
       <>
        {
            Hasclicked ? (
                <LoadingModal/>
            ) : (
              <div className={styles.container}>
                <AccountView imgUrl={accountData.avatar} username={accountData.name}/>
                <input className={styles.input} placeholder="Set a Username" onChange={(e) => setUsername(e.currentTarget.value)}/>
                <button className={styles.btn} onClick={() =>  HandleSubmit()}>Sign In</button>
              </div>
            )
        }
       </>
    )
}

export default SignIn;