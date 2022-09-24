import * as React from 'react';

import styles from '../styles/Home.module.css';

const Home = (): React.ReactElement => {
  return (
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to KaraoQ</h1>

        <p className={styles.description}>
          Your one stop shop for Youtube Karaoke!
        </p>

        <div className={styles.grid}>
          {/* FIXME: Make links dynamic */}
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Host &rarr;</h2>
            <p>Create a karaoke queue that other people can join.</p>
          </a>

          <button className={styles.card}>
            <h2>Play &rarr;</h2>
            <p>Join a pre-existing queue that someone else set up.</p>
          </button>
        </div>
      </main>
    );
};

export default Home;
