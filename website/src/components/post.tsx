import React from 'react';
import styles from '../styles/components/post.module.css';
import {CodePlus } from 'tabler-icons-react';
import { useRouter } from 'next/router';

const Post: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container} onClick={() => router.push("/Challenges/create")}>
      <CodePlus className={styles.icon}/>
      <h1 className={styles.title}>Start a Challenge</h1>
    </div>
  );
};

export default Post;
