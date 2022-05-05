import { Button } from "@mantine/core";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {getAccountInfo, setUp} from '../utils/Account';


//get the account deatils from the server and store them 
const accountHandler = async(code:string) => {
    try {
        const res = await setUp(code);
        if(res)
        {
            const {account, tokens, guilds} = res;
     
            if (account) 
            {
                window.localStorage.setItem("account", JSON.stringify(tokens));
                return {account, guilds};
            }      
            
            return null;
        }
        return null;        
    } catch (error) {
        return null
    }

}


const Callback: React.FC = () => {
    const [message, setMessage] = useState<string>("Signing in...");
    const [send, setSend] = useState<Boolean>(false);
    const router:NextRouter = useRouter();
    const code = router.query.code;
    

    useEffect(() => {

        if(code)
        {
            if(!send)
            {
                accountHandler(code as string)
                        .then(account => {
                            if (account) {
                                router.push("/");
                            } else {
                                setMessage("Something went wrong, please try again later or try to sign in again");
                            }
                });  
                setSend(true)              
            }

        }else{
            setMessage("No code found, please try again later");
        }

    }, [message, code, router])

  return (
    <div>
        <h1>{message}</h1>
        <Button onClick={() => router.push("/auth")}>Go back to auth</Button>
    </div>
  );
}

export default Callback;