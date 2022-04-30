/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import Nav from '../components/account/Nav';
import styles from '../styles/Home.module.css';
import { fetchAccountFromServer, SignIn } from '../utils/Account';
import { AccountContext } from '../utils/context/AccountProvider';


const Home: NextPage = () => {
  const [Account, setAccount]:any = useContext(AccountContext);

  const fetchAccount = async () => {
    if(!Account.isSignIn) 
    {
    const account = await SignIn();
    setAccount({id: account.id, username: account.username, email: account.email, profilePic: account.avatar, isSignIn: true});
    console.log(account);
    }
  };

  useEffect(() => {
      fetchAccount();
  }, [Account])


  return (
    <div className={styles.container}>
      <div>
        <Nav id={Account.id} username={Account.username} profilePic={Account.profilePic} email={Account.email} isSignIn={true}/>
      </div>
    </div>
  );
};

export default Home;
