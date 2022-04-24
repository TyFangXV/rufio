/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import Image from 'next/image';
import styles from '../../styles/components/Nav.module.css'
import logo from '../../public/logo.svg'
import { AccountType } from "../../../types";
import AccountViewer from "./nav/AccountViewer";
import { AccountContext } from "../../utils/context/AccountProvider";
import { SignIn } from "../../utils/Account";

const Nav:React.FC<AccountType> = (account) => {
    const [Account, setAccount]:any = useContext(AccountContext);

    const fetchAccount = async () => {
      if(!Account.isSignIn) 
      {
      const account = await SignIn();
      setAccount({id: account.id, username: account.username, email: account.email, profilePic: account.avatar, isSignIn: true});
      console.log("ran");
      }
    };
  
    useEffect(() => {
        fetchAccount();
    }, [Account])
    return(
        <div className={styles.container}>
            <AccountViewer Account={Account}/>
        </div>
    )
} 

export default Nav;