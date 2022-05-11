/* eslint-disable react-hooks/exhaustive-deps */

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useEffect } from 'react';
import Nav from '../components/account/Nav';
import styles from '../styles/Home.module.css';
import {
  SignIn } from '../utils/Account';
import { AccountContext } from '../utils/context/AccountProvider';


const Home: NextPage = () => {
  const router = useRouter();
  const [Account, setAccount]:any = useContext(AccountContext);

  const fetchAccount = async () => {
    console.log(Account.account.isSignIn, Account.guilds.length);
    
    if(!Account.account.isSignIn && Account.guilds.length === 0) {
    {
      console.log(await SignIn());
      const {account, guilds} = await SignIn();   
      
      if(account)
      {
        const organizedAccountData = {id: account.id, username: account.username, email: account.email, profilePic: account.avatar, isSignIn: true};
        const organizedGuildsData = guilds.filter((guild:any) => guild.owner === true);

        setAccount({account: organizedAccountData, guilds: organizedGuildsData});    
      }else{
        router.push("/auth")
      }
    }
  };
}

  
  useEffect(() => {
    fetchAccount();
  }, [])





  return (
    <div className={styles.container}>
      {
        Account.account.isSignIn ?
        (
          <div>
            <Nav Account={Account}/>
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
