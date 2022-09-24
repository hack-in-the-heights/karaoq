import { QueueEntry } from "../../app/queue/types";

export interface ApiError {
  code: number;
  message: string;
}

export interface Room {
  id: string;
  queue: QueueEntry[];
  queuePos: number;
}