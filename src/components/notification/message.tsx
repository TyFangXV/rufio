import { ActionIcon, Avatar, Container, Text } from '@mantine/core';
import { AiFillCloseCircle } from 'react-icons/ai';
import Theme from '../../styles/home.theme';
import { Notif } from '../../utils/intefere';

const Message: React.FC<Notif> = ({ id, profile, content, time, onclick }) => {
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
          <Text underline weight={'bold'}>
            {profile.name}
          </Text>
          <Text>{content}</Text>
          <Text size="xs">{time}</Text>
        </div>
      </div>
    </Container>
  );
};

export default Message;
