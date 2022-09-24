import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>KaraoQ</title>
        <meta name="description" content="Karaoke Youtube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to KaraoQ</h1>

        <p className={styles.description}>
          Your one stop shop for Youtube Karaoke!
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Host &rarr;</h2>
            <p>Create a karaoke queue that other people can join.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Play &rarr;</h2>
            <p>Join a pre-existing queue that someone else set up.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by Brew House, La Puente
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
};

export default Home;
