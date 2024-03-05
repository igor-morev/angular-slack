import { User } from '@angular-slack/auth/data-access';

export interface Thread {
  id: string;
  chatName: string;
  chatId: string;
  authors: User[];
  messagesCount: number;
}

export type CreateThreadParams = Omit<Thread, 'id'>;
