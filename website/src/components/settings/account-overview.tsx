/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/redux/store";
import styles from './style/AccountOverview.module.css'

const AccountOverview:React.FC = () => {
    const {account:profileData, userData} = useSelector((state:RootState) => state)
    return (
        <div className={styles.container}>
            <div>
                <h1>Profile</h1>
                <p></p>
            </div>
            <div>
                <img src={`${profileData.account.avatar}`} alt="profile" width={"230px"} height={"230px"} style={{borderRadius : "50%"}}/>
            </div>
        </div>
    )
}

export default AccountOverview;