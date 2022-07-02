import { NextPage } from "next";
import React from "react";
import AccountAction from "../../components/settings/account-action";
import AccountLevel from "../../components/settings/account-level";
import AccountOverview from "../../components/settings/account-overview";
import styles from '../../styles/Setting.module.css';


const Settings:NextPage = () => {
    return (
        <div className={styles.container}>
            <AccountOverview/>
            <AccountLevel/>
            <AccountAction/>
        </div>
    )
}

export  default Settings;