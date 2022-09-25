import type { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';

import Sing from '../../../components/Sing';
import styles from '../../../styles/Sing.module.css';

const SingPage: NextPage = (): React.ReactElement => {
  return (
    <div className={styles.container}>
      <Head>
        <title>KaraoQ</title>
        <meta name="description" content="Karaoke Youtube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sing />
    </div>
  );
};

export default SingPage;
