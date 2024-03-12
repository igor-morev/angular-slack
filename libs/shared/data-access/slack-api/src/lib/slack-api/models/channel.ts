import { User } from '@angular-slack/auth/data-access';

export interface Channel {
  id: string;
  name: string;
  description?: string;
  chatId: string;
  clientId: string;
  ownerId: string;
  users: User[];
  protected: boolean;
}

export interface ChannelCreate {
  name: string;
  users: string[];
}
