import React from 'react';
import styles from '../styles/components/post.module.css'
import { CirclePlus } from 'tabler-icons-react';

const Post: React.FC = () => {



  return (
    <div
      className={styles.container}
    >
      <CirclePlus
        className={styles.icon}
        size={55}
        strokeWidth={2}
        style={{ padding: 0, margin: 0 }}
      />
    </div>
  );
};

export default Post;
