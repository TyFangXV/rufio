import React from "react";
import styles from '../styles/topbar.module.css'
import Input from "./input";
import Notification from "./notification";

const TopBar:React.FC = () => {
    return (
        <div className={styles.container}>
           <div></div>
           <Input onChange={(e) => console.log(e)}/> 
           <div>
           <Notification/>
           </div>
        </div>
    )
}

export default TopBar