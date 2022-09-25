import * as React from 'react';

import styles from '../styles/Sing.module.css';
import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';

interface YoutubeResult {
  title: string,
  thumbnailUrl: string
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
    thumbnailUrl: item.snippet.thumbnails?.default.url
  })) ?? [];
}

const Sing = (): React.ReactElement => {
  const [songs, setSongs] = useState<YoutubeResult[]>([])
  const [query, setQuery] = useState('');

  function handleChange(e: any) {
    setQuery(e.target.value);
  }

  async function search() {
      if (query) {
        const songs = await searchYoutube(query);
        setSongs(songs);
      } else {
        setSongs([])
      }
  }

  return (
    <main className={styles.main}>
      <h1>Songs</h1>
      <input type="text" placeholder="Search YouTube for a song" onChange={handleChange} value={query}/>
      <button onClick={search}>Search</button>
      {songs.map((song => <div className={styles.song}> <img src={song.thumbnailUrl}/>{song.title} <button> Add </button></div>))}
      <h3>Queue:</h3>
      <div className={styles.queue}>

      </div>
    </main>
  );
};

export default Sing;
