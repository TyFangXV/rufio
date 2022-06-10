/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import * as queryString from 'query-string';
import styles from '../../styles/account.module.css';
import { useRouter } from "next/router";

const AccountOverView:React.FC = () => {
    const [isSigned, setIsSigned] = useState(false);
    const router = useRouter();
    return (
        <>
            {
                isSigned ? (
                <div className={styles.navbar}>
                    <img src="https://static.wikia.nocookie.net/ba0628fe-3bc1-42c3-9c0c-aa91ba24f03c/scale-to-width/370" alt="s" className={styles.picture}/>
                    <p className={styles.name}>Yves Chirstoper</p>
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