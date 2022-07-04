import React from "react";
import AccountOverview from "./account-overview";
import styles from './style/index.module.css';

const Nav:React.FC = () => {
    return(
        <div className={styles.container}>
            <div></div>
            <div>
                <AccountOverview/>
            </div>
        </div>
    )
}

export default Nav;