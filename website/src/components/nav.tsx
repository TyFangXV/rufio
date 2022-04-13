import React from "react";
import styles from '../styles/components/Nav.module.css';
import {IoIosNotifications} from 'react-icons/io';
import Notification from "./Notification";



const Nav:React.FC = () => {
    return (
        <nav className={styles.container}>
          <h1 className={styles.heading}>Rufio</h1>
          <div className={styles.actionBar}>
              <Notification/>
              
          </div>
        </nav>
    );
}

export default Nav;