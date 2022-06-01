import React from "react";
import Hr from "../main/hr";
import styles from './styles/main.module.css'
import AccountOverView from "./sub-component/profile/overview";
import {MdOutlineLocalFireDepartment, MdPerson} from "react-icons/md";
import {GoGlobe} from "react-icons/go";
import {IoGrid} from "react-icons/io5";
import {IoMdSettings} from "react-icons/io";

const Nav: React.FC = () => {
    return(
        <div className={styles.container}>
            <AccountOverView/>
            <Hr width={"100%"} strokeStren={"3.5px"}/>
            <div className={styles.tabContainer}>
                <div className={styles.tabs}>
                    <MdOutlineLocalFireDepartment className={styles.icon}/>
                    <p>Trending</p>
                </div>    
             <div className={styles.tabs}>
                 <IoGrid className={styles.icon}/>
                <p>Catalog</p>
            </div>  
            <div className={styles.tabs}>
                <GoGlobe className={styles.icon}/   >
                <p>Region</p>
            </div>     
            <div className={styles.tabs}>
                <MdPerson className={styles.icon}/>
                <p>Account</p>
            </div>      

            <div className={styles.tabs}>
                <IoMdSettings className={styles.icon}/>
                <p>Settings</p>
            </div>            
            </div>
        </div>
    )
}

export default Nav