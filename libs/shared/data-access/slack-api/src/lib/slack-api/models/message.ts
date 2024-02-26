import { User } from '@angular-slack/auth/data-access';
import { Thread } from './thread';

// import { Attachment } from './attachment';

export interface Message {
  id: string;
  chatId: string;
  content: string;
  createdAt: string;
  attachments?: File[];
  thread?: Thread;
  author: User;
  mode: 'full' | 'compact';
}
