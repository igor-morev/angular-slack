import { User } from '@angular-slack/auth/data-access';
import { Message } from './message';

export interface MessageThread {
  id: string;
  chatId: string;
  authors: User[];
  messagesCount: number;
}

export interface Thread {
  id: string;
  parentChatName: string;
  chatId: string;
  authors: User[];
  message: Message;
  messagesCount: number;
}

export type CreateThreadParams = Thread;

export type UpdateThreadParams = Partial<Thread>;
