/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import styles from '../styles/components/Notification.module.css';
import {GiCancel} from 'react-icons/gi'
interface NotificationProps {
    userID : string;
    message : string;
    seen : boolean;
    date : Date
}

interface NotificationListType{
    notif : NotificationProps[];
}

const Notification: React.FC = () => {
  const notifications:NotificationProps[] = [{userID : "1", message : "Hello", seen : false, date : new Date}];
  const [displayNotif, setDisplayNotif] = useState(false)
  return (
    <div>
      <div>
        {notifications.length > 0 && (
          <div className={styles.notification}><p>{notifications.length}</p></div>
        )}
        <IoIosNotifications className={styles.icon} onClick={() => setDisplayNotif(!displayNotif)} />

        <div style={{display : !displayNotif ? "flex" : "none"}}>
            <NotificationList notif={notifications}/>
        </div>
      </div>
    </div>
  );
};



const NotificationList:React.FC<NotificationListType> = ({notif}) => {
    return(
        <div className={styles.notificationList}>
            {notif.map((notification, index) => {
                return(
                    <div key={index} className={styles.notificationListTab}>
                        <img  width={"40"} height={"40"} src="https://static.wikia.nocookie.net/41d305b3-4780-4b21-9f7a-585d32a2516b/scale-to-width/370" alt='pfp' style={{borderRadius : "50%"}} />
                        <p>{notification.message}</p>
                        <GiCancel/>
                    </div>
                )
            })}

        </div>
    )
}
export default Notification;
