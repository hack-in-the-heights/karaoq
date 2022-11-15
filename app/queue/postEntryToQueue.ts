import { QueueEntry } from "../../pages/api/types";

export default async function postEntryToQueue(
  roomId: string, entry: QueueEntry 
): Promise<any> {
  const params = new URLSearchParams({
        entryId: entry.id,
        userName: entry.userName,
        videoId: entry.videoId,
        songTitle: entry.songTitle
  });

  const resp = await fetch(`/api/queue/${roomId}/videos?${params}`, {
    method: "POST"
  });

  const data = await resp.json();
  return data;
}