import { ActionIcon, Avatar, Button, Container, Text } from '@mantine/core';
import React from 'react';
import { Notif } from '../../utils/intefere';
import { AiFillCloseCircle } from 'react-icons/ai';
import Theme from '../../styles/home.theme';



const Request: React.FC<Notif> = ({ profile, content, time, id, onclick }) => {
  return (
    <Container
      style={{
        border : `1px solid ${Theme.outline}`,
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '2vh',
      }}
    >
      <div>
        <ActionIcon
        onClick={() => onclick(id)}
          style={{
            position: 'absolute',
            right: '0',
            marginTop: '-10px',
          }}
        >
          <AiFillCloseCircle />
        </ActionIcon>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }} id={id}>
        <Avatar alt="pic" src={profile.profile_pic} />
        <div style={{ marginLeft: '10px' }}>
          <Text style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            {profile.name}
          </Text>
          <Text>{content}</Text>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <Text style={{ marginRight: '10px' }}>{time}</Text>
        <div style={{ marginRight: '10px' }}>
          <Button>Accept</Button>
        </div>
        <div>
          <Button>Decline</Button>
        </div>
      </div>
    </Container>
  );
};

export default Request;
