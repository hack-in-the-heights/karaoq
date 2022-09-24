import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { Room } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query)
  if (req.method == 'POST') {
    const client = new MongoClient(process.env.MONGODB_URI!);
    const id = req.query.id;

    try {
      await client.connect();
      const room = await client
        .db(process.env.MONGODB_DB)
        .collection<Room>('rooms')
        .findOne({ id });

      if (room == null) {
        res.status(404).json({ code: 404, message: "Room not found."})
      } else {
        
      }

    } catch (e) {
      console.log(e);
      res.status(500).json({ code: 500, message: "Internal server error."})
    }

  } else {
    res.status(404).json({ code: 404, message: 'Video Page Not Found' })
  }
}
