import { Avatar, Card, Divider, Header, Title } from '@mantine/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { AccountType } from '../../../types';
import { RootState } from '../../utils/redux/reducers';
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
         <KeyDataViewer id={AccountData.username} data={AccountData.username} keyname={"username"}/>  
         <KeyDataViewer id={AccountData.email} data={AccountData.email} keyname={"Email"}/>     
        </div>  
    </div>
  );
};

const AccountOverview: React.FC = () => {
  const AccountData = useSelector((state: RootState) => state.Account);

  return (
    <Card className={styles.container}>
      {AccountData.isSignIn ? (
        <>
          <AccountOverviewCard
            id={AccountData.id}
            username={AccountData.username}
            profilePic={AccountData.profilePic}
            email={AccountData.email}
            isSignIn={AccountData.isSignIn}
          />
        </>
      ) : (
        <>
          <h1>You need to be Signed In</h1>
        </>
      )}
    </Card>
  );
};

export default AccountOverview;
