import { Input, Select, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';
import { ArrowBack } from 'tabler-icons-react';
import styles from '../../styles/page/createChallenges.module.css';

const CreateChall: React.FC = () => {
  const tmwDate = new Date().setDate(new Date().getDate() + 1);

  const [challengeName, setChallengeName] = React.useState('');
  const [challengeDescription, setChallengeDescription] = React.useState('');
  const [challengeEndDate, setChallengeEndDate] = React.useState(tmwDate);
  const [challengeType, setChallengeType] = React.useState('1');

  return (
    <div>
      <div id="header" className={styles.header}>
        <ArrowBack size={48} strokeWidth={2} color={'white'} />
        <button className={styles.createButton}>Create</button>
      </div>

      <div className={styles.container}>
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
      </div>
    </div>
  );
};

export default CreateChall;
