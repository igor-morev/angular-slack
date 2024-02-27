import { User } from '@angular-slack/auth/data-access';

export interface Thread {
  id: string;
  chatId: string;
  authors: User[];
  messagesCount: number;
}
