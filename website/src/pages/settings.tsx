import { NextPage } from "next";
import React from "react";
import AccountOverview from "../components/settings/account-overview";
import styles from '../styles/Setting.module.css';


const Settings:NextPage = () => {
    return (
        <div className={styles.container}>
            <AccountOverview/>
        </div>
    )
}

export  default Settings;