import React from 'react';
import styles from '../styles/components/post.module.css';
import {CodePlus } from 'tabler-icons-react';

const Post: React.FC = () => {
  return (
    <div className={styles.container}>
      <CodePlus className={styles.icon}/>
      <h1 className={styles.title}>Start a Challenge</h1>
    </div>
  );
};

export default Post;
