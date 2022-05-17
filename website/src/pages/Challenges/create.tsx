import { Button, Divider, Input, Select, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useRouter } from 'next/router';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ArrowBack } from 'tabler-icons-react';
import styles from '../../styles/page/createChallenges.module.css';
import Settings from '../../utils/constant';
import { AccountContext } from '../../utils/context/AccountProvider';

const CreateChall: React.FC = () => {
  const router = useRouter();
  const tmwDate = new Date().setDate(new Date().getDate() + 1);

  const [Account, setAccount]:any = useContext(AccountContext)
  const {account, guilds} = Account;

  // Challenges stats input ref
  const challengeNameRef = useRef<HTMLInputElement>(null);
  const challengeDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const challengeGuildRef = useRef<HTMLInputElement>(null);
  const challengeEndDateRef = useRef<any>(null);
  const challengeTypeRef = useRef<HTMLInputElement>(null);
  const challengeViewModeRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if(!account.isSignIn)
    {
      router.push("/")
    }    
  })



  const ChallengeMakerModal:React.FC = () => {
    return (
          
      <div className={styles.ChallengeMakerModalContainer}>
        <Input
          className={styles.input}
          maxLength={45}
          ref={challengeNameRef}
          placeholder="Enter a name for your challenge"
          required
        />

        <Textarea
          placeholder="Details about your Game"
          label="Description"
          radius="md"
          ref={challengeDescriptionRef}
          size="md"
          className={styles.textarea}
          required
        />

        <div className={styles.optionView}>
          <Select
            className={styles.select}
            placeholder="Select a Game Mode"
            label="Game Mode"
            ref={challengeTypeRef}
            required
            defaultValue="1"
            data={Settings.gameTypes}
          />

          <Select
            className={styles.select}
            placeholder="Choose the Visibility"
            label="Visibility"
            ref={challengeViewModeRef}
            required
            defaultValue="1"
            data={Settings.gamePublicity}
          />

          <DatePicker
            label="End Date"
            defaultValue={new Date(tmwDate)}
            className={styles.select}
            ref={challengeEndDateRef}
            required
          />
        </div>

        <div>
        <Select 
            className={styles.select}
            placeholder="Choose a Guild"
            label="Guild"
            ref={challengeGuildRef}
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

        <Divider/>
        <Button className={styles.button}>Preview</Button>
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
           account.isSignIn && (
            <ChallengeMakerModal/>
           )
         }         
      </div>

    </div>
  );
};

export default CreateChall;
