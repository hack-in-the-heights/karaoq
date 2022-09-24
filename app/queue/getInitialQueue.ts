import { QueueEntry } from './types';

export default async function getInitialQueue(
  roomId: string
): Promise<QueueEntry[]> {
  const resp = await fetch(`/queue/${roomId}`);

  const data = await resp.json();
  return data.queue;
}
