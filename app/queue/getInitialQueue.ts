import { QueueEntry } from "../../pages/api/types";

export default async function getInitialQueue(
  roomId: string
): Promise<QueueEntry[]> {
  const resp = await fetch(`/api/queue/${roomId}`);

  const data = await resp.json();
  return data.queue;
}
