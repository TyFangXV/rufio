/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import * as queryString from 'query-string';
import styles from '../../styles/account.module.css';
import { useRouter } from "next/router";
import { RootState } from "../../../../utils/redux/store";
import { useSelector } from "react-redux";

const AccountOverView:React.FC = () => {
    const {account} = useSelector((state:RootState) => state.account);
    const router = useRouter();
    return (
        <>
            {
                account.isSignedIn ? (
                <div className={styles.navbar}>
                    <img src={account.avatar} alt="s" className={styles.picture}/>
                    <p className={styles.name}>{account.name}</p>
                </div>
                ) : (
                    <div className={styles.AuthBtn}>
                        <button className={styles.btn} onClick={() => router.push(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`)}>Sign In</button>
                    </div>
                )
            }
        </>
    )
}


export default AccountOverView