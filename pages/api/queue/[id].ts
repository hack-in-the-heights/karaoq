import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { QueueEntry } from '../../../app/queue/types';

interface Error {
  code: number;
  message: string;
}

interface Room {
  id: string;
  queue: QueueEntry[];
  queuePos: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Room | Error>
) {
  const id = req.query.id;
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const room = await client
      .db(process.env.MONGODB_DB)
      .collection<Room>('rooms')
      .findOne({ id });
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ code: 404, message: 'Not Found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ code: 500, message: 'ahhhh' });
  } finally {
    client.close();
  }
}
