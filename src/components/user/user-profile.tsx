import { ActionIcon, Avatar, Container, Text } from '@mantine/core';
import React from 'react';
import { MdNotificationsNone, MdNotificationsOff } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import Theme from '../../styles/home.theme';
import { User } from '../../utils/intefere';
import { iSNotificationOn } from '../../utils/state/general';

const UserProfile: React.FC<User> = ({ profile_pic, username }) => {
  const [NotificationStatus , setNotificationStatus] = useRecoilState<boolean>(iSNotificationOn);
  return (
    <Container
      style={{
        backgroundColor: Theme.tertiary,
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '7vh',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
        <Avatar
          alt="pic"
          src={profile_pic}
          radius="xl"
          style={{ border: `2px solid ${Theme.outline}` }}
        />
        <Text color={'white'} style={{ paddingLeft: '6px', marginTop: '1vh' }}>
          {username}
        </Text>
      </div>
      <ActionIcon onClick={()=> setNotificationStatus(!NotificationStatus)}>
          {
            NotificationStatus ?
            <MdNotificationsNone fontSize={'1.5vw'} color={'white'} />
            :
            <MdNotificationsOff fontSize={'1.5vw'} color={Theme.outline} />
          }
      </ActionIcon>
    </Container>
  );
};

export default UserProfile;
