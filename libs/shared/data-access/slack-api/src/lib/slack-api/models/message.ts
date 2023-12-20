import { Attachment } from './attachment';
import { User } from './user';

export interface Message {
  id: string;
  chatId: string;
  content: string;
  updatedAt: string;
  attachments: Attachment[];
  author: User;
}
