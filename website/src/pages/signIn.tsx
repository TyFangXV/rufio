/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import styles from '../styles/signin.module.css';
import { RootState } from "../utils/redux/store";

interface AccountViewProps {
    imgUrl : string;
    username : string;
}

const AccountView: React.FC<AccountViewProps> = (data) => {
    return (
        <div className={styles.profileContainer}>
            <img src={data.imgUrl} alt="signin" width={500} height={500} className={styles.image} />
            <h4>{data.username}</h4>
        </div>
    )
}

const SignIn:React.FC = () => {
    const accountData = useSelector((state:RootState) => state.account.account);
    return (
        <div className={styles.container}>
            <AccountView imgUrl={accountData.avatar} username={accountData.name}/>
            <input className={styles.input} placeholder="Set a Username"/>
            <button className={styles.btn}>Sign In</button>
        </div>
    )
}

export default SignIn;