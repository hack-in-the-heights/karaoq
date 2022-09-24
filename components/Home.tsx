import { nanoid } from 'nanoid';
import Link from 'next/link';
import * as React from 'react';

import styles from '../styles/Home.module.css';

const Home = (): React.ReactElement => {
  const [displayJoinCodeInput, setDisplayJoinCodeInput] =
    React.useState<boolean>(false);

  const [joinCode, setJoinCode] = React.useState<string | null>(null);
  const [newJoinCode, setNewJoinCode] = React.useState<string | null>(null);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to KaraoQ</h1>

      <p className={styles.description}>
        Your one stop shop for Youtube Karaoke!
      </p>

      <div className={styles.grid}>
        <div
          className={styles.card}
          onClick={(): void => {
            if (!newJoinCode) {
              setNewJoinCode(nanoid(4));
            }
          }}
        >
          <h2>Host &rarr;</h2>
          <p>Create a karaoke queue that other people can join.</p>

          {newJoinCode && (
            <div className={styles.inputContainer}>
              Your game code is: <h3>{newJoinCode}</h3>
              <Link href={`/host/${newJoinCode}`}>
                <button>
                  <a>Start Hosting</a>
                </button>
              </Link>
            </div>
          )}
        </div>

        <div
          className={styles.card}
          onClick={(): void => {
            setDisplayJoinCodeInput(true);
          }}
        >
          <h2>Play &rarr;</h2>
          <p>Join a pre-existing queue that someone else set up.</p>

          {displayJoinCodeInput && (
            <div className={styles.inputContainer}>
              <label>Enter join code: </label>
              <input
                id="enterJoinCode"
                onChange={(e): void => {
                  setJoinCode(e.target.value);
                }}
                name="enterJoinCode"
                required
                type="text"
              />

              <Link href={`/sing/${joinCode}`}>
                <button>
                  <a>Start Singing</a>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
