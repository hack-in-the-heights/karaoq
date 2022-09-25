import * as React from 'react';

import styles from '../styles/Host.module.css';

const url = 'https://youtu.be/8leAAwMIigI';

const Host = (): React.ReactElement => {
  return (
    <main className={styles.main}>
      <p>
        TO JOIN: Go to www.karoq.vercel.app and type in code{' '}
        <span className={styles.span}>{'CODE'}</span>
      </p>
      <video src={url} controls />
    </main>
  );
};

export default Host;
