/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch } from "@reduxjs/toolkit";
import { NextPage } from "next";
import { NextRouter, Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountOverview from "../components/account/Account-overview";
import getAccountDetail, { fetchAccountFromServer } from "../utils/Account";
import { RootState } from "../utils/redux/reducers";
import { UpdateAccount } from "../utils/redux/reducers/Account";
import styles from '../styles/page/account.module.css';

//get the account deatils from the server and store them 
const accountHandler = async(code:string, dispacter:Dispatch) => {
    const {account, tokens} = await getAccountDetail(code);
    if (account) {
        window.localStorage.setItem("account", JSON.stringify(tokens));
        dispacter(UpdateAccount({id : account.id, username : account.username, email : account.email, profilePic : account.avatar}));
        return account;
    }
    return null;
}


const SignIn = async(router:NextRouter, dispatch:Dispatch) => {
    const code = router.query.t;
    const accountDetailsFromLocalStorage = window.localStorage.getItem("account");

    //if the code exist in the url then get the account details from the server
    if (code) 
    {
        const account = await accountHandler(code as string, dispatch);
        return account;
    }else
    {
        //if there isnt any code then signin using the account details from the local storage
        if(accountDetailsFromLocalStorage)
        {
            const account = await fetchAccountFromServer(JSON.parse(accountDetailsFromLocalStorage as string));
            return account;
        }

        return null;
    }
}


const Account: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const AccountData = useSelector((state:RootState) => state.Account);
    
    useEffect(() => {
        if(AccountData.isSignIn === false)
        {
            (async() => {
                const data = await SignIn(router, dispatch);
                if(data) dispatch(UpdateAccount({id : data.id, username : data.username, email : data.email, profilePic : data.avatar, isSignIn : true}));              
            })()            
        }
    });
    return (
        <div className={styles.container}>
           <AccountOverview/>
        </div>
    )
}


export default Account;