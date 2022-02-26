import { useRecoilState, useRecoilValue } from 'recoil'
import { notifications, showNotification } from '../utils/state/general'
import Notification from '../components/notification'
import {Modal } from '@mantine/core'
import Theme from '../styles/home.theme'



const NotificationPopUp = ()=>{
    const [showNotif, setshowNotif] = useRecoilState<boolean>(showNotification)
    const notification = useRecoilValue(notifications);

    return(
        <Modal
        style={{color : Theme.secondary}}
        opened={showNotif}
        onClose={() => setshowNotif(false)}
        title="Notification Center"
        overflow='inside'
      >
        <Notification data={notification}/>
      </Modal>
    )
}

const PopUp = ()=>{
    return(
        <>
        <NotificationPopUp/>
        </>
    )
}

export default PopUp;