import type { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';

import Host from '../../../components/Host';
import styles from '../../../styles/Host.module.css';

const HostPage: NextPage = (): React.ReactElement => {
  return (
    <div className={styles.container}>
      <Head>
        <title>KaraoQ</title>
        <meta name="description" content="Karaoke Youtube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Host />
    </div>
  );
};

export default HostPage;
