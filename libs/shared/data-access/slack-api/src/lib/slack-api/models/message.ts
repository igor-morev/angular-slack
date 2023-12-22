import { User } from '@angular-slack/auth/data-access';

import { Attachment } from './attachment';

export interface Message {
  id: string;
  chatId: string;
  content: string;
  updatedAt: string;
  attachments: Attachment[];
  author: User;
}
