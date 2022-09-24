import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';

import Home from '../components/Home';
import styles from '../styles/Home.module.css';

const HomePage: NextPage = (): React.ReactElement => {
  return (
    <div className={styles.container}>
      <Head>
        <title>KaraoQ</title>
        <meta name="description" content="Karaoke Youtube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />

      <footer className={styles.footer}>
        Powered by Brew House, La Puente
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
};

export default HomePage;
