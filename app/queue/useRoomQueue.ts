import { useCallback, useState } from 'react';
import useAsyncEffect from 'use-async-effect/types';
import { QueueEntry } from '../../pages/api/types';
import getInitialQueue from './getInitialQueue';
import listen from './listen';

interface Args {
  roomId: string;
  pusherConfig: {
    key: string;
    cluster: string;
  };
}

type RoomQueueState = 'loading' | 'error' | QueueEntry[];

function withNewEvents(
  events: QueueEntry[],
  newEvents: QueueEntry[]
): QueueEntry[] {
  const actuallyNewEvents = newEvents.filter(
    (newEvent) => !events.some((oldEvent) => newEvent.id === oldEvent.id)
  );

  return [...events, ...actuallyNewEvents];
}

function useRoomQueue({ roomId, pusherConfig }: Args): RoomQueueState {
  const [state, setState] = useState<RoomQueueState>('loading');
  const [pendingEvents, setPendingEvents] = useState<QueueEntry[]>([]);

  const onDisconnect = useCallback(() => {
    setState('error');
  }, []);

  const onEvent = useCallback(
    (event: QueueEntry) => {
      if (state === 'error') return;

      if (state === 'loading') {
        setPendingEvents([...pendingEvents, event]);
      } else {
        setState(withNewEvents(state, [event]));
      }
    },
    [state, pendingEvents]
  );

  useAsyncEffect(async () => {
    await listen({
      roomId,
      pusherConfig,
      onDisconnect,
      onEvent,
    });

    try {
      const initialQueue = await getInitialQueue(roomId);
      setState(withNewEvents(initialQueue, pendingEvents));
    } catch (error) {
      console.log(error);
      setState('error');
    }
  }, [roomId, pusherConfig.key, pusherConfig.cluster, onDisconnect, onEvent]);

  return state;
}

export default useRoomQueue;
