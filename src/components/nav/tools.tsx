import { Button, Container } from '@mantine/core';
import React from 'react';
import Theme from '../../styles/home.theme';
import { IoNotifications } from 'react-icons/io5';
import { IoIosPerson } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { showFriendRequestTab, showNotification } from '../../utils/state/general';
const Tools = () => {
  const [showNotif, setshowNotif] = useRecoilState<boolean>(showNotification);
  const [showFriendReq, setshowFriendReq] =
    useRecoilState<boolean>(showFriendRequestTab);

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Button onClick={() => setshowFriendReq(!showFriendReq)}>
        <IoIosPerson fontSize={'1.5vw'} />
        Friends
      </Button>
      <Button onClick={() => setshowNotif(!showNotif)}>
        <IoNotifications fontSize={'1.2vw'} />
        Notification
      </Button>
    </Container>
  );
};

export default Tools;
