export interface ApiError {
  code: number;
  message: string;
}

export interface Room {
  id: string;
  queue: QueueEntry[];
  activeVideoIndex: number;
}

export interface QueueEntry {
  id: string;
  userName: string;
  youtubeUrl: string;
}
