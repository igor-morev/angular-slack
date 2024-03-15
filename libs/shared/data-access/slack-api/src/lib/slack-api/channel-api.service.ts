import { AuthService } from '@angular-slack/auth/data-access';

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Channel, ChannelCreate, ChannelUpdate } from './models';

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
          name: 'general',
          ownerId: this.authService.userId,
          chatId: 'channel-1',
          ownerName: this.authService.userName,
          createdAt: new Date().toISOString(),
          protected: true,
          topic: 'Company-wide announcements and work-based matters',
          users: [
            {
              id: '1',
              username: 'Steve Jobs',
            },
            {
              id: '2',
              username: 'Jeff Bezos',
            },
            {
              id: '3',
              username: 'Bill Gates',
            },
            {
              id: '4',
              username: 'Elon Musk',
            },
            {
              id: '5',
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
      ownerName: this.authService.userName,
      chatId: uuidv4(),
      createdAt: new Date().toISOString(),
      protected: false,
      name: data.name.toLowerCase(),
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

  updateChannel(params: ChannelUpdate) {
    this.channels.set(
      this.authService.userId,
      this.channels.get(this.authService.userId)!.map((channel) => {
        if (channel.id === params.id) {
          return {
            ...channel,
            ...params,
            users: params.users
              ? params.users.map(
                  (userId) =>
                    this.userApiService.users.find(
                      (user) => user.id === userId
                    )!
                )
              : channel.users,
          };
        }

        return channel;
      })
    );

    return of(
      this.channels
        .get(this.authService.userId)!
        .find((m) => m.id === params.id)!
    );
  }
}
