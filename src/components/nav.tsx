import { Container } from '@mantine/core';
import Theme from '../styles/home.theme';
import Tools from './tools';
const Nav = () => {
  return (
    <Container
      style={{
        background: Theme.secondary,
        minHeight: '100vh',
        borderRight : `1px solid ${Theme.outline}`,
        minWidth: '225px',
      }}
    >
      <div style={{ paddingTop: '2vh', position: 'absolute', left: '0' }}>
        <Tools />
      </div>
    </Container>
  );
};

export default Nav;
