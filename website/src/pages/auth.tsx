import { NextPage } from "next";
import React from "react";
import styles from '../styles/Auth.module.css';

const Auth:NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.viewModel}>
                <h1>Sign In</h1>
                <hr className={styles.divider}/>
                <div>
                    <button className={styles.google}>Sign In with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Auth;