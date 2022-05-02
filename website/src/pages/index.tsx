/* eslint-disable react-hooks/exhaustive-deps */
import { Title } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import Nav from '../components/account/Nav';
import styles from '../styles/Home.module.css';
import {
  SignIn } from '../utils/Account';
import { AccountContext } from '../utils/context/AccountProvider';


const Home: NextPage = () => {
  const router = useRouter();
  const [Account, setAccount]:any = useContext(AccountContext);

  const fetchAccount = async () => {
    if(!Account.isSignIn) 
    {
      const account = await SignIn();       
      if(account)
      {
        setAccount({id: account.id, username: account.username, email: account.email, profilePic: account.avatar, isSignIn: true});
      }else{
        router.push("/auth")
      }
    }
  };

  useEffect(() => {
      fetchAccount();
  }, [Account])


  return (
    <div className={styles.container}>
      {
        Account.isSignIn ?
        (
          <div>
            <Nav id={Account.id} username={Account.username} profilePic={Account.profilePic} email={Account.email} isSignIn={true}/>
          </div>
        ) : (
          <div>
            <h1>You need to signIn</h1>

          </div>
        )
      }
    </div>
  );
};

export default Home;
