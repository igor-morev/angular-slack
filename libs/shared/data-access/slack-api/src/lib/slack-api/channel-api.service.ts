import { AuthService } from '@angular-slack/auth/data-access';

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Channel, Contact } from './models';

@Injectable({
  providedIn: 'root',
})
export class ChannelApiService {
  private authService = inject(AuthService);

  channels: Map<string, Channel[]> = new Map([
    [
      this.authService.userId,
      [
        {
          id: '1',
          name: 'General',
          chatId: 'channel-1',
        },
      ] as Channel[],
    ],
  ]);

  getChannels(): Observable<Channel[]> {
    return of(this.channels.get(this.authService.userId)!);
  }
}
