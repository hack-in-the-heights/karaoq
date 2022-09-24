import * as React from 'react';

import styles from '../styles/Host.module.css';

const Host = (): React.ReactElement => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Thank you for hosting!</h1>
    </main>
  );
};

export default Host;
