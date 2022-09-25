import * as React from 'react';

import styles from '../styles/Host.module.css';

import getInitialQueue from "../app/queue/getInitialQueue.ts"

import {useRouter} from 'next/router';

const Host = (): React.ReactElement => {
  const [queue, setQueue] = React.useState([])
  const router = useRouter();
  const joinCode = "asdf"//router.query.joinCode;

  React.useEffect(()=>{
    getInitialQueue(joinCode).then((res)=> setQueue(res));
  })

  //TO-DO
  function playNextInQueue(){

  }


  return (
    <main className={styles.main}>
       <h1 className={styles.title}>TO JOIN: Go to <a href={"http://karaoq.vercel.app"}>karaoq.vercel.app</a> and type in code <span className={styles.span}>{joinCode}</span></h1>
       {queue.length > 0 ?
        <iframe className={styles.video}
          src={"https://www.youtube.com/embed/" + queue[0].video_id}
        ></iframe> : <h3>{"No songs in queue. :("}</h3>}
    </main>
  );
};

export default Host;
