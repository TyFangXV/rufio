import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from '../styles/Auth.module.css';
import Settings from "../utils/constants/Settings";

const Auth:NextPage = () => {
    const router = useRouter();

    useEffect(() => {

    })

    return (
        <div className={styles.container}>
            <div className={styles.viewModel}>
                <h1>Sign In</h1>
                <hr className={styles.divider}/>
                <div>
                    <button className={styles.google} onClick={() => router.push(`${Settings.APIUrl}/auth/discord/login?redirectURL=${"http://localhost:3001/auth"}`)}>Sign In with Discord</button>
                </div>
            </div>
        </div>
    )
}

export default Auth;