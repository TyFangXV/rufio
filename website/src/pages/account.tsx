import { NextPage } from "next";
import React, { useContext } from "react";

import styles from '../styles/page/account.module.css';

import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AccountInfoAtom } from "../utils/recoil/Account";
import { AccountContext } from "../utils/context/AccountProvider";





const Account: NextPage = () => {
    const [Account, setAccount]:any = useContext(AccountContext);


    return (
        <div className={styles.container}>
              <button onClick={() => console.log(Account)}>log</button>
        </div>
    )
}


export default Account;