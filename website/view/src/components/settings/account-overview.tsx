/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/redux/store";
import styles from './style/AccountOverview.module.css'

const AccountOverview:React.FC = () => {
    const profileData = useSelector((state:RootState) => state.account.data)
    return (
        <div className={styles.container}>
            <div style={{paddingLeft : "10px"}}>
                <h1>Profile</h1>
                <p>Username : {profileData.username}</p>
                <p>Email : {profileData.email}</p>
                <p>Organisation : None</p>
                <p>
                    Account-Type: 
                    {
                        profileData.accountLevel === 30 && " User"
                    }
                </p>
            </div>
            <div style={{paddingRight : "10px"}}>
                <img src={`${profileData.avatar}`} alt="profile" width={"230px"} height={"230px"} style={{borderRadius : "50%"}}/>
            </div>
        </div>
    )
}

export default AccountOverview;