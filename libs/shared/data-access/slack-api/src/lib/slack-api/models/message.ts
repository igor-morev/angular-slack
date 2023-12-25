import { User } from '@angular-slack/auth/data-access';

import { Attachment } from './attachment';

export interface Message {
  id: string;
  chatId: string;
  content: string;
  createdAt: string;
  attachments: Attachment[];
  author: User;
}
