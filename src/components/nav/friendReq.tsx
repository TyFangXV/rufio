import { Button, Container, Input, InputWrapper, TextInput } from '@mantine/core';
import { MdPersonAddAlt1 } from 'react-icons/md';
import Theme from '../../styles/home.theme';

const FriendReq = () => (
    <Container>
        <InputWrapper
            id="FriendReq"
            required
            style={{marginBottom : "5vh"}}
            label="Friend Request"
            description="Add the users Username with their ID to send a friend request"
        >
            <Input
                icon={<MdPersonAddAlt1 />}
                variant="filled"
                placeholder="Add your friend"
            />
        </InputWrapper>

        <Container style={{textAlign: "right"}}>
            <Button style={{ backgroundColor: Theme.tertiary, padding: '5px 5px 5px 5px' }}>Add your Friend</Button>
        </Container>
    </Container>
);

export default FriendReq;
