import React from 'react';
import { IoIosNotifications } from 'react-icons/io';
import styles from '../styles/topbar.module.css';
const Notification: React.FC = () => {
  const [clicked, setClicked] = React.useState(false);


  return (
    <div>
      <IoIosNotifications className={styles.notificationBtn} onClick={() => setClicked(!clicked)}/>
      <div className={styles.notificationModal} style={{display : clicked ? "flex" : "none"}}></div>
    </div>
  );
};

export default Notification;
