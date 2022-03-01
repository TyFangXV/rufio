import { Container } from '@mantine/core';
import Theme from '../styles/home.theme';
import { User } from '../utils/intefere';
import Tools from './tools';
import UserProfile from './user/user-profile';

//mock data
const user: User = {
  username: 'mantinde',
  id : 1,
  password : 'mantinde',
  name : "Drex",
  email : 'fallingbird@gmail.com',
  profile_pic : 'https://avatars2.githubusercontent.com/u/52709853?s=400&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8&v=4',
};


const Nav = () => (
  <Container
    style={{
      padding : 0,
      background: Theme.secondary,
      minHeight: '100vh',
      borderRight: `1px solid ${Theme.outline}`,
      minWidth: '250px',
    }}
  >
    <div style={{ paddingTop: '2vh', position: 'absolute', left: '0' }}>
      <Tools />
    </div>
    <div style={{position : "absolute", bottom : "0"}}>
      <UserProfile profile_pic={user.profile_pic} username={user.username} id={0} name={''} email={''} password={''}/>
    </div>
  </Container>
);

export default Nav;
