import { Avatar, Button, Divider, Modal, Title } from "@mantine/core";
import React, { useState } from "react";
import styles from '../../styles/components/Nav.module.css'
import { AccountType, GuildType } from "../../../types";
import KeyDataViewer from "../account/keyDataView";
import { DiscordServer } from "../../utils/formatter/discord";

interface Props{
    Account: AccountType;
    Guilds : GuildType[]
}


const ServerViewer:React.FC<GuildType> = (guild) => {

    const server = new DiscordServer(guild.id, guild.name, guild.icon, guild.owner, guild.permissions);
    const serverInfo = server.getServer();
    return(
        <div className={styles.serverViewContainer}>
            <div className={styles.ServerViwerOverlay}>
                <h3 className={styles.ServerOverlayText}>{guild.name}</h3>
            </div>
            <Avatar src={serverInfo.icon} alt={serverInfo.name} size={100} radius={50}/>
        </div>
    )
}

const ProfileViwer:React.FC<Props> = ({Account, Guilds}) => {
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
             <div>
                <Title>Owner of</Title>  
                <div className={styles.serverRollet}>
                    {
                        Guilds.map((guild:GuildType) => {
                            return(
                                <ServerViewer 
                                key={guild.id} 
                                name={guild.name} 
                                icon={guild.icon} 
                                id={guild.id} 
                                permissions={guild.permissions} 
                                owner={guild.owner}
                                />
                            )
                        })
                    }
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

const AccountViewer:React.FC<Props> = ({Account, Guilds}) => {
    const account = {id: Account.id, username: Account.username, email: Account.email, profilePic: Account.profilePic, isSignIn: true}

    return(
        <div className={styles.AccountViewer}>
            <ProfileViwer Account={account} Guilds={Guilds}/>
                <p style={{color : "white"}}>Signed in as <span style={{textDecorationLine : "underline", fontWeight : "bold"}}>{Account.username}</span></p>
        </div>
    )
}


export default AccountViewer;