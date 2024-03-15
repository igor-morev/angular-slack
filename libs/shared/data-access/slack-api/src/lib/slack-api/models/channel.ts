import { User } from '@angular-slack/auth/data-access';

export interface Channel {
  id: string;
  name: string;
  topic?: string;
  chatId: string;
  clientId: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  users: User[];
  protected: boolean;
}

export interface ChannelCreate {
  name: string;
  users: string[];
}

export type ChannelUpdate = Partial<ChannelCreate> &
  Pick<Channel, 'topic' | 'id'>;
