import * as React from 'react';

import styles from '../styles/Host.module.css';

const video_id = '-PnwATAyJJU';
const room_code = 'TVXQ';

const Host = (): React.ReactElement => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        TO JOIN: Go to{' '}
        <a href={'https://karaoq.vercel.app'}>karaoq.vercel.app</a> and
        type in code <span className={styles.span}>{room_code}</span>
      </h1>
      <iframe
        className={styles.video}
        src={'https://www.youtube.com/embed/' + video_id}
      ></iframe>
    </main>
  );
};

export default Host;
