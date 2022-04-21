import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AccountHandler from "../utils/Account";

const Account: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        const code = router.query.t;
        if (code) 
        {
            AccountHandler(code as string)
                .then((res:any) => {
                    console.log(res);
                    
                })
                .catch(err => {
                    console.log(err);
                    
                   router.push("/auth")
                }
                );
        }
    }, [router.isReady, router.query.t]);


    return (
        <div>
            <h1>Account</h1>
        </div>
    )
}


export default Account;