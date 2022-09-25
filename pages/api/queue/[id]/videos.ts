import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Room } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const client = new MongoClient(process.env.MONGODB_URI!);
    const roomId = req.query.id;
    const entryId = req.query.entryId;
    const userName = req.query.userName;
    const youtubeUrl = req.query.youtubeUrl;

    if (
      typeof entryId !== "string" ||
      typeof userName !== "string" ||
      typeof youtubeUrl !== "string"
    ) {
      console.log(req.query);
      res.status(400).json({ code: 400, message: "Invalid request." });
      return;
    }

    try {
      await client.connect();

      const db = client.db(process.env.MONGODB_DB);
      const collection = db.collection<Room>("rooms");
      const room = await collection.findOne({ id: roomId });

      if (room == null) {
        res.status(404).json({ code: 404, message: "Room not found." });
      } else {
        await collection.updateOne(
          { id: roomId },
          {
            $push: {
              queue: {
                id: entryId,
                userName: userName,
                youtubeUrl: youtubeUrl,
              },
            },
          }
        );
        res
          .status(203)
          .json({ code: 203, message: "Data updated successfully." });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ code: 500, message: "Internal server error." });
    } finally {
      client.close();
    }
  } else {
    res.status(404).json({ code: 404, message: "Page not found." });
  }
}
