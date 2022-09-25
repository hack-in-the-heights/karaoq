import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError, Room } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Room | ApiError>
) {
  const client = new MongoClient(process.env.MONGODB_URI!);
  const roomId = req.query.id;

  if ( typeof roomId !== 'string' ) {
    res.status(400).json({ code: 400, message: 'Invalid request.'})
    return
  }

  const data = {id: roomId, queue: [], activeVideoIndex: 0};
  
  try {
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection<Room>('rooms');
  
    await client.connect();

    if (req.method == 'POST') {
      const result = await collection.insertOne(data)
      res.status(203).json({ code: 203, message: 'Data inserted successfully.' })
      console.log(result);
      
    } else if (req.method == 'GET') {
      const room = await collection.findOne({roomId});
      if (room) {        
        res.status(200).json(room);
      } else {
        res.status(404).json({ code: 404, message: 'Not found.' });
      }

    } else {
      res.status(400).json({ code: 400, message: 'Invalid request.'});
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({ code: 500, message: 'Internal search error.' });

  } finally {
    client.close();
  }
}
