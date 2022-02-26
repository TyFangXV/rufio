import { ActionIcon, Avatar, Container, Text } from '@mantine/core';
import { Notif } from '../../utils/intefere';
import { AiFillCloseCircle } from 'react-icons/ai';
const Message: React.FC<Notif> = ({ id, profile, content, time }) => {
  return (
    <Container
      style={{
        backgroundColor: '#002531',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '2vh',
      }}
    >
      <div>
        <ActionIcon
          style={{
            position: 'absolute',
            right: '0',
            marginTop  : "-10px",
            marginRight: 20,
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
