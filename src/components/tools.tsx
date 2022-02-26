import { Button, Container } from '@mantine/core';
import React from 'react';
import Theme from '../styles/home.theme';
import { IoNotifications } from 'react-icons/io5';
import { IoIosPerson } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { showNotification } from '../utils/state/general';
const Tools = () => {
  const [showNotif, setshowNotif] = useRecoilState<boolean>(showNotification)
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Button
        style={{ backgroundColor: Theme.tertiary, padding: '5px 5px 5px 5px' }}
        >
        <IoIosPerson fontSize={'1.5vw'} style={{ paddingRight: '0px' }} />
        Friends
      </Button>
      <Button
        onClick={() => setshowNotif(!showNotif)}
        style={{ backgroundColor: Theme.tertiary, padding: '5px 5px 5px 5px' }}
      >
        <IoNotifications fontSize={'1.2vw'} style={{ paddingRight: '5px' }} />
        Notification
      </Button>
    </Container>
  );
};

export default Tools;
