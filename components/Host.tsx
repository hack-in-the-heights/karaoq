import * as React from 'react';

import styles from '../styles/Host.module.css';

import {useRouter} from 'next/router';

const video_id = "bNOncnlm7Ho"

const Host = (): React.ReactElement => {
  const router = useRouter();
  const joinCode = router.query.joinCode;
  return (
    <main className={styles.main}>
       <h1 className={styles.title}>TO JOIN: Go to <a href={"http://karoq.vercel.app"}>karoq.vercel.app</a> and type in code <span className={styles.span}>{joinCode}</span></h1>
       <iframe className={styles.video}
        src={"https://www.youtube.com/embed/" + video_id}
        ></iframe>
    </main>
  );
};

export default Host;
