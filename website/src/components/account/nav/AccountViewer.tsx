import { Avatar, Button, Divider, Modal } from "@mantine/core";
import React, { useState } from "react";
import styles from '../../../styles/components/Nav.module.css'
import { AccountType } from "../../../../types";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import KeyDataViewer from "../keyDataView";

interface Props{
    Account: AccountType;
}




const ProfileViwer:React.FC<AccountType> = (Account) => {
    const [showModal, setShowModal] = useState(false);

    //Account Modal
    const AccountModel:React.FC = () => {
     return(
         <Modal
            opened={showModal}
            onClose={() => setShowModal(false)}
            title="Account"
         >
             <div className={styles.AccountModel}>
                <Avatar src={`https://cdn.discordapp.com/avatars/${Account.id}/${Account.profilePic}.png`} size={150} radius={100}/>
                <div style={{marginBottom : "6%"}}>
                    <KeyDataViewer keyname="username" data={Account.username} style={{margin : "5px"}}/> 
                    <KeyDataViewer keyname="email" data={Account.email} style={{margin : "5px"}}/>                   
                </div>
             </div>
             <Divider/>
             <div style={{display : "flex", justifyContent : "space-between" }}>
             <p style={{fontSize : "12px", color : "grey"}}>Account ID <span style={{textDecoration : "underline", fontSize : "10px"}}>{Account.id}</span></p>
             <p style={{fontSize : "12px", color : "grey"}}>Not your Account? <span style={{textDecoration : "underline", cursor : "pointer"}}><a href="/logout">Logout</a></span></p>
             </div>
         </Modal>
     )
    }

    return (
        <div className={styles.ProfileViewer} onClick={() => setShowModal(true)}>
            <AccountModel/>
        <div className={styles.overlay}>
            <p>View</p>
        </div>
        <Avatar src={`https://cdn.discordapp.com/avatars/${Account.id}/${Account.profilePic}.png`} size={50}/>
        </div>
    )
}

const AccountViewer:React.FC<Props> = ({Account}) => {
    return(
        <div className={styles.AccountViewer}>
            <ProfileViwer id={Account.id} profilePic={Account.profilePic} username={Account.username} email={Account.email} isSignIn={true}/>
                <p style={{color : "white"}}>Signed in as <span style={{textDecorationLine : "underline", fontWeight : "bold"}}>{Account.username}</span></p>
        </div>
    )
}


export default AccountViewer;