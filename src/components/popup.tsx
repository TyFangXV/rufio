import { useRecoilState } from 'recoil';
import {
  notifications,
  showFriendRequestTab,
  showNotification,
} from '../utils/state/general';
import Notification from './nav/notification';
import { Modal } from '@mantine/core';
import Theme from '../styles/home.theme';
import { Notif } from '../utils/intefere';
import FriendReq from './nav/friendReq';

const NotificationPopUp = () => {
  const [showNotif, setshowNotif] = useRecoilState<boolean>(showNotification);
  const [notification, setNotification] =
    useRecoilState<Notif[]>(notifications);

  const removeNotification = (id: string) => {
    setNotification(notification.filter((notif) => notif.id !== id));
  };

  return (
    <Modal
    styles={{ modal: { backgroundColor: Theme.secondary } }}
      opened={showNotif}
      onClose={() => setshowNotif(false)}
      title="Notification Center"
      overflow="inside"
    >
      <Notification data={notification} onClick={removeNotification} />
    </Modal>
  );
};

const FriendRequest = () => {
  const [showFriendReq, setshowFriendReq] =
    useRecoilState<boolean>(showFriendRequestTab);

  return (
    <Modal
      styles={{ modal: { backgroundColor: Theme.secondary } }}
      opened={showFriendReq}
      onClose={() => setshowFriendReq(false)}
      title="Add your Friends"
      overflow="inside"
    >
      <div>
        <FriendReq />
      </div>
    </Modal>
  );
};

const PopUp = () => {
  return (
    <>
      <NotificationPopUp />
      <FriendRequest />
    </>
  );
};

export default PopUp;
