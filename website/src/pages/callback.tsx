import { Button } from "@mantine/core";
import { Dispatch } from "@reduxjs/toolkit";
import { NextRouter, Router, useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getAccountDetail from '../utils/Account'
import { UpdateAccount } from "../utils/redux/reducers/Account";


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


const Callback: React.FC = () => {
    const [message, setMessage] = useState<string>("Signing in...");
    const router:NextRouter = useRouter();
    const dispatch = useDispatch();
    const code = router.query.t;
    
    console.log(code);
    

    useEffect(() => {

        if(code)
        {
            accountHandler(code as string, dispatch)
                    .then(account => {
                        if (account) {
                            router.push("/");
                        } else {
                            setMessage("Something went wrong, please try again later or try to sign in again");
                        }
            })
        }else{
            setMessage("No code found, please try again later");
        }

    }, [message])

  return (
    <div>
        <h1>{message}</h1>
        <Button onClick={() => router.push("/auth")}>Go back to auth</Button>
    </div>
  );
}

export default Callback;