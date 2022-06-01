/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import styles from '../../styles/account.module.css';




const AccountOverView:React.FC = () => {
    const [isSigned, setIsSigned] = useState(true)
    return (
        <>
            {
                isSigned &&
                <div className={styles.navbar}>
                    <img src="https://static.wikia.nocookie.net/ba0628fe-3bc1-42c3-9c0c-aa91ba24f03c/scale-to-width/370" alt="s" className={styles.picture}/>
                    <p className={styles.name}>Yves Chirstoper</p>
                </div>
            }
        </>
    )
}


export default AccountOverView