import { AuthService, User } from '@angular-slack/auth/data-access';

import { inject, Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Channel, ChannelCreate } from './models';

import { v4 as uuidv4 } from 'uuid';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelApiService {
  private readonly authService = inject(AuthService);
  private readonly userApiService = inject(UserApiService);

  private readonly channels: Map<string, Channel[]> = new Map([
    [
      this.authService.userId,
      [
        {
          id: '1',
          name: 'General',
          chatId: 'channel-1',
          protected: true,
          description: 'Company-wide announcements and work-based matters',
          users: [
            {
              username: 'Steve Jobs',
            },
            {
              username: 'Jeff Bezos',
            },
            {
              username: 'Bill Gates',
            },
            {
              username: 'Elon Musk',
            },
            {
              username: 'John Carmack',
            },
          ],
        },
      ] as Channel[],
    ],
  ]);

  getChannels(): Observable<Channel[]> {
    return of(this.channels.get(this.authService.userId)!);
  }

  createChannel(data: ChannelCreate): Observable<Channel> {
    const newChannel: Channel = {
      ...data,
      id: uuidv4(),
      ownerId: this.authService.userId,
      chatId: uuidv4(),
      protected: false,
      clientId: '1',
      users: data.users.map(
        (userId) =>
          this.userApiService.users.find((user) => user.id === userId)!
      ),
    };

    this.channels.set(this.authService.userId, [
      ...this.channels.get(this.authService.userId)!,
      newChannel,
    ]);

    return of(newChannel);
  }
}
