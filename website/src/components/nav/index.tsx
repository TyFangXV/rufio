import React from "react";
import Hr from "../main/hr";
import styles from './styles/main.module.css'
import AccountOverView from "./sub-component/profile/overview";

const Nav: React.FC = () => {
    return(
        <div className={styles.container}>
            <AccountOverView/>
            <Hr width={"100%"} strokeStren={"3.5px"}/>
        </div>
    )
}

export default Nav