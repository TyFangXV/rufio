/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Nav from '../components/account/Nav';
import styles from '../styles/Home.module.css';
import { SignIn } from '../utils/Account';
import Settings from '../utils/constant';
import { AccountContext } from '../utils/context/AccountProvider';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();
  const [Account, setAccount]: any = useContext(AccountContext);
  const [loading, setLoading] = useState<boolean>(true);

  //check if the user is signed in or not and redirect to the correct page
  const fetchAccount = async () => {
    if (!Account.account.isSignIn && Account.guilds.length === 0) {
      const userdata = await SignIn();
      if (userdata) {
        const { account, guilds } = userdata;
        const organizedAccountData = {
          id: account.id,
          username: account.username,
          email: account.email,
          profilePic: account.avatar,
          isSignIn: true,
        };
        const organizedGuildsData = guilds.filter(
          (guild: any) => guild.owner === true
        );

        setAccount({
          account: organizedAccountData,
          guilds: organizedGuildsData,
        });
      } else {
        router.push('/auth');
      }
    }
  };

  //compoent to preload any data that is needed before the page is rendered
  const Initializer: React.FC = () => {
    useEffect(() => {
      setTimeout(() => {
        (async () => {
          const serverStatus = await axios.get(`${Settings.ApiDevUrl}/`);
          const { account } = Account;

          if (serverStatus.status === 200 && account.isSignIn) {
            setLoading(false);
          } else if (!account.isSignIn) {
            fetchAccount();
          } else {
            router.push('/500');
          }
        })();
      }, 1000);
    });

    return (
      <div
        className={styles.initializer}
      >
        <Image
          src={require('../utils/assets/john.png')}
          width={200}
          height={200}
          alt="loading"
          className={styles.initializerImage}
        />
        <p>Hold on, im getting things set up</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div>
          <Initializer />
        </div>
      ) : (
        <div>
          <Nav Account={Account} />
        </div>
      )}
    </div>
  );
};

export default Home;
