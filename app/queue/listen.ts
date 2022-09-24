import Pusher from 'pusher-js';

interface Args {
  roomId: string;
  pusherConfig: PusherConfig;
  onEvent: (event: any) => void;
  onDisconnect: () => void;
}

interface PusherConfig {
  key: string;
  cluster: string;
}

type CleanupFn = () => void;

export default function listen({
  roomId,
  onEvent,
  onDisconnect,
  pusherConfig,
}: Args): Promise<CleanupFn> {
  const pusher = new Pusher(pusherConfig.key, {
    cluster: pusherConfig.cluster,
  });

  const channel = pusher.subscribe(roomId);

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      channel.unbind_all();
      channel.disconnect();
    };
    channel.bind('karaoq:event', onEvent);
    channel.bind('pusher:subscription_succeeded', () => resolve(cleanup));
    channel.bind('pusher:subscription_error', () => {
      reject();
      onDisconnect();
    });
  });
}
