export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface AIInsight {
  userId: string;
  history: Message[];
}