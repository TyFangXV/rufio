/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import styles from '../../styles/components/Nav.module.css';
import AccountViewer from '../nav/AccountViewer';
import { AccountContext } from '../../utils/context/AccountProvider';
import { Divider } from '@mantine/core';
import { Home, Stars, UserCircle } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { AccountType, GuildType } from '../../../types';

interface TabsProps {
  children: React.ReactNode;
  title? : string,
  path : string,
}


interface NavProps {
  Account : {
    account : AccountType,
    guilds : GuildType[],
  }
}
const Tabs: React.FC<TabsProps> = ({ children, title, path }) => {
  const router = useRouter();
  return <div className={styles.tabs} title={title} onClick={() => router.push(path)}>{children}</div>;
};

const Nav: React.FC<NavProps> = ({Account}) => {
  return (
    <div className={styles.container}>
      <AccountViewer Account={Account.account} Guilds={Account.guilds}/>
      <Divider />
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}
      >
        <Tabs title='Home page' path='/'>
          <Home size={"3.5vh"} strokeWidth={1} color={'white'} className={styles.tabsIcons}/>
          <p className={styles.tabsTitle}>Home</p>
        </Tabs>

        <Tabs title='Account' path='/account'>
          <UserCircle size={"3.5vh"} strokeWidth={1} color={'white'} className={styles.tabsIcons}/>
          <p className={styles.tabsTitle}>Account</p>
        </Tabs>

        <Tabs title='Challenges' path='/Challenges'>
          <Stars size={"3.5vh"} strokeWidth={1} color={'white'} className={styles.tabsIcons}/>
          <p className={styles.tabsTitle}>Challenges</p>
        </Tabs>

      </div>
    </div>
  );
};

export default Nav;
