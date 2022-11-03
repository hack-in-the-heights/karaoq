import * as React from 'react';

import styles from '../styles/Sing.module.css';
import { useState } from 'react';
import getInitialQueue from '../app/queue/getInitialQueue';
import postEntryToQueue from '../app/queue/postEntryToQueue';

import {useRouter} from 'next/router';
import { QueueEntry } from '../pages/api/types';

interface YoutubeResult {
  title: string,
  thumbnailUrl: string,
  videoId: string
}

async function searchYoutube(query: string): Promise<YoutubeResult[]> {
  const params = new URLSearchParams({
    q: query,
    videoEmbeddable: "true",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!,
    type: "video"
  })

  const rawResp = await fetch("https://www.googleapis.com/youtube/v3/search?" + params);
  const resp = await rawResp.json();

  const videoIds = resp.items?.map((item: any) => item.id.videoId) ?? [];
  const nextParams = new URLSearchParams({
    part: "snippet",
    id: videoIds.join(','),
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!
  });

  const nextRawResp = await fetch("https://www.googleapis.com/youtube/v3/videos?" + nextParams);
  const nextResp = await nextRawResp.json();
  return nextResp.items?.map((item: any) => ({
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails?.default.url,
    videoId: item.id
  })) ?? [];
}

const Sing = (): React.ReactElement => {
  const [songs, setSongs] = useState<YoutubeResult[]>([])
  const [query, setQuery] = useState('');
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [username, setUsername] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [chosenSong, setChosenSong] = useState<YoutubeResult>({
      title: "",
      thumbnailUrl: "",
      videoId: ""
  })

  const router = useRouter();
  const joinCode: any = router.query.joinCode;

  function handleQueryChange(e: any) {
    setQuery(e.target.value);
  }

  function handleUsernameChange(e: any) {
    setUsername(e.target.value);
  }

  function getNextAvailableIdString(){
    const currentIdString = queue[queue.length-1].id;
    
    let newIdString = String(Number(currentIdString) + 1)
    if (newIdString === "NaN") newIdString = "1";
    return newIdString;
  }

  async function search() {
      if (query) {
        const songs = await searchYoutube(query);
        setSongs(songs);
      } else {
        setSongs([])
      }
  }

  React.useEffect(()=>{
    getInitialQueue(joinCode).then((res: any)=> {setQueue(res); console.log(queue);});
  }, [])

  function renderAddModal(){
    return (
      <div className={styles.add}>
        <div className={styles.addItems}>
          <p>You will be adding:</p>
          <p>{chosenSong.title}</p>
          <img src={chosenSong.thumbnailUrl}></img>
          <p>(ID: {chosenSong.videoId})</p>
          <p>to the queue.</p>
          <label htmlFor="username">Please type your name:</label>
          <input onChange={handleUsernameChange} type="text" name="username" placeholder={username}></input>
          <button id="add" onClick={addSong} disabled = {username.length > 0 ? false : true}>Add</button>
          <button onClick={()=> setShowAddModal(false)}>Close</button>
         </div>
      </div>
    )
  }

  function addSong(){
    const song: QueueEntry = {
      id: getNextAvailableIdString(),
      userName: username,
      songTitle: chosenSong.title,
      videoId: chosenSong.videoId,
    }
    postEntryToQueue(joinCode, song);
    setQueue([...queue, song])
    setShowAddModal(false);
    setSongs([]);
  }
 
  return (
    <main className={styles.main}>
      <h1>Songs</h1>
      {showAddModal ? renderAddModal() : null}
      <input type="text" placeholder="Search YouTube. (Tip: Add 'karaoke' after the song name)" onChange={handleQueryChange} value={query}/>
      <button onClick={search}>Search</button>
      <div className={styles.songList}>
      {songs.map((song => <div key={song.thumbnailUrl} className={styles.song}> <img src={song.thumbnailUrl}/>{song.title} <button onClick={()=>{setChosenSong(song);
        setShowAddModal(true);}}> Add </button></div>))}
      </div>
      <h3>Queue:</h3>
      <div className={styles.queue}>
        {queue.length > 0 ? queue.map((item: any) => <div key={item.id} className={styles.queueItem}>{item.userName + "---" + item.songTitle}</div>) : <div className={styles.queueItem} >No songs in queue</div>}
      </div>
    </main>
  );
};

export default Sing;
