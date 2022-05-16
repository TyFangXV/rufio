import { Input, Select, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ArrowBack } from 'tabler-icons-react';
import styles from '../../styles/page/createChallenges.module.css';
import { AccountContext } from '../../utils/context/AccountProvider';

const CreateChall: React.FC = () => {
  const router = useRouter();
  const tmwDate = new Date().setDate(new Date().getDate() + 1);

  const [Account, setAccount]:any = useContext(AccountContext)
  const {account, guilds} = Account;

  // Challenges state
  const [challengeName, setChallengeName] = React.useState('');
  const [challengeDescription, setChallengeDescription] = React.useState('');
  const [challengeEndDate, setChallengeEndDate] = React.useState(tmwDate);
  const [challengeType, setChallengeType] = React.useState('1');

  useEffect(() => {
    if(!account.isSignIn)
    {
      router.push("/auth")
    }    
  })


  const ChallengeMakerModal:React.FC = () => {
    return (
          
      <div className={styles.ChallengeMakerModalContainer}>
        <Input
          className={styles.input}
          placeholder="Enter a name for your challenge"
          required
        />

        <Textarea
          placeholder="Details about your Game"
          label="Description"
          radius="md"
          size="md"
          className={styles.textarea}
          required
        />

        <div className={styles.optionView}>
          <Select
            className={styles.select}
            placeholder="Select a Game Mode"
            label="Game Mode"
            required
            defaultValue="1"
            data={[
              { value: '1', label: 'Tournament' },
              { value: '2', label: 'Challenge' },
              { value: '3', label: 'Mini-Game' },
            ]}
          />

          <Select
            className={styles.select}
            placeholder="Choose the Visibility"
            label="Visibility"
            required
            defaultValue="1"
            data={[{ value: '1', label: 'public' }]}
          />

          <DatePicker
            label="End Date"
            defaultValue={new Date(tmwDate)}
            className={styles.select}
            required
          />
        </div>

        <div>
        <Select 
            className={styles.select}
            placeholder="Choose a Guild"
            label="Guild"
            required
            defaultValue={guilds[0].id}
            data={
              guilds.map((guild:any) => {
                return {
                  value: guild.id,
                  label: guild.name
                }
              })
            }
          />
        </div>
      </div>
    )
  }



  return (
    <div>
      <title>
        Create Challenge
      </title>
      <div id="header" className={styles.header}>
        <ArrowBack size={48} strokeWidth={2} color={'white'} onClick={() => router.back()} cursor="pointer"/>
        <button className={styles.createButton}>Create</button>
      </div>

      <div className={styles.twoWayView}>
        {
          account.isSignedIn && (
            <>
               <ChallengeMakerModal/>            
            </>
          ) 
        }
      </div>

    </div>
  );
};

export default CreateChall;
