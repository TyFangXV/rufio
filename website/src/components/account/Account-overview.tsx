import { Avatar, Card, Divider, Header, Title } from '@mantine/core';
import React from 'react';
import { AccountType } from '../../../types';
import styles from '../../styles/components/AccountOverview.module.css';
import KeyDataViewer from './keyDataView';

const AccountOverviewCard: React.FC<AccountType> = (AccountData) => {
  return (
    <div className={styles.cardLayout}>
     <h1 style={{color : "white"}}>Account Overview</h1>
     <Divider style={{minWidth : "100%", background : "white"}}/>
     <br/>
     <div>
         <Avatar src={`https://cdn.discordapp.com/avatars/${AccountData.id}/${AccountData.profilePic}.png`} size={100}/>
      </div>
        <div className={styles.accountInfo}>
         <KeyDataViewer  data={AccountData.username} keyname={"username"}/>  
         <KeyDataViewer  data={AccountData.email} keyname={"Email"}/>     
        </div>  
    </div>
  );
};

const AccountOverview: React.FC<AccountType> = (AccountData) => {
  return (
    <Card className={styles.container}>
          <AccountOverviewCard
            id={AccountData.id}
            username={AccountData.username}
            profilePic={AccountData.profilePic}
            email={AccountData.email}
            isSignIn={AccountData.isSignIn}
          />
    </Card>
  );
};

export default AccountOverview;
