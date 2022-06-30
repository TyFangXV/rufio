import React from "react";
import styles from './style/account-level.module.css';

const AccountLevel:React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Account Level</h1>
            <p>
                <button className={styles.btn}>Upgrade account</button>
            </p>
        </div>
    )
}


export default AccountLevel;