import { User } from '@angular-slack/auth/data-access';
import { MessageThread } from './thread';

export interface Message {
  id: string;
  chatId: string;
  parentChatId: string | null;
  content: string;
  createdAt: string;
  attachments?: File[];
  emoji: string[];
  thread?: Partial<MessageThread> | null;
  author: User;
  mode: 'full' | 'compact';
}

export type UpdateMessageParams = Partial<Message>;
