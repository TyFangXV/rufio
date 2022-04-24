import { Avatar } from "@mantine/core";
import React from "react";
import styles from '../../../styles/components/Nav.module.css'
import { AccountType } from "../../../../types";
import KeyDataViewer from "../keyDataView";

interface Props{
    Account: AccountType;
}

const AccountViewer:React.FC<Props> = ({Account}) => {
    return(
        <div className={styles.AccountViewer}>
            <div>
                <Avatar src={`https://cdn.discordapp.com/avatars/${Account.id}/${Account.profilePic}.png`} size={50}/>
            </div>
            <div className="AccountInfo">
                <KeyDataViewer id={Account.username} data={Account.username} keyname={"username"}/>  
                <KeyDataViewer id={Account.email} data={Account.email} keyname={"Email"}/>     
            </div>  
        </div>
    )
}


export default AccountViewer;