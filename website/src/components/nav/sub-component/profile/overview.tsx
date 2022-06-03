/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import key from '../../../../../key/index'
import * as queryString from 'query-string';
import styles from '../../styles/account.module.css';
import { useRouter } from "next/router";

const stringifiedParams = queryString.stringify({
    client_id:key.clientID,
    redirect_uri: 'http://localhost:3000/',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });



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
                        <button className={styles.btn} onClick={() => router.push(`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`)}>Sign In</button>
                    </div>
                )
            }
        </>
    )
}


export default AccountOverView