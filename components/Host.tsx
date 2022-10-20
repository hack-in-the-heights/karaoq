import * as React from 'react';

import styles from '../styles/Host.module.css';

import getInitialQueue from "../app/queue/getInitialQueue"

import { useRouter } from 'next/router';
import { QueueEntry } from '../pages/api/types';

const Host = (): React.ReactElement => {
  const [queue, setQueue] = React.useState<QueueEntry[]>([])
  const router = useRouter();
  const joinCode = "asdf"//router.query.joinCode;

  React.useEffect(()=>{
    getInitialQueue(joinCode).then((res: any)=> {setQueue(res)});
  })

  //TO-DO
  function playNextInQueue(){

  }


  return (
    <main className={styles.main}>
       <h1 className={styles.title}>TO JOIN: Go to <a href={"http://karaoq.vercel.app"}>karaoq.vercel.app</a> and type in code <span className={styles.span}>{joinCode}</span></h1>
       {queue.length > 0 ?
        <iframe className={styles.video}
          src={"https://www.youtube.com/embed/" + queue[0].videoId}
        ></iframe> : <h3>{"No songs in queue. :("}</h3>}
    </main>
  );
};

export default Host;
