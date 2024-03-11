import { AuthService } from '@angular-slack/auth/data-access';

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CreateThreadParams,
  Message,
  Thread,
  UpdateThreadParams,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class ThreadApiService {
  private authService = inject(AuthService);

  threads: Map<string, Thread[]> = new Map([
    [
      this.authService.userId,
      [
        {
          id: 'thread-1',
          chatName: 'General',
          chatId: 'thread-1',
          authors: [
            {
              username: 'Elon Mask',
            },
            {
              username: 'John Carmack',
            },
            {
              username: 'Bill Gates',
            },
            {
              username: 'Steve Jobs',
            },
          ],
          message: {
            id: 'thread-1',
            mode: 'full',
            content: 'Hello',
            chatId: 'channel-1',
            createdAt: new Date().toISOString(),
            author: {
              username: 'Jeff Bezos',
            },
          } as Message,
        },
      ] as Thread[],
    ],
  ]);

  getThreads(): Observable<Thread[]> {
    return of(this.threads.get(this.authService.userId)!);
  }

  createThread(params: CreateThreadParams) {
    const newThread: Thread = {
      ...params,
    };

    this.threads.set(
      this.authService.userId,
      this.threads.get(this.authService.userId)!.concat({
        ...params,
      })
    );

    return of(newThread);
  }

  updateThread(id: string, params: UpdateThreadParams) {
    this.threads.set(
      this.authService.userId,
      this.threads.get(this.authService.userId)!.map((thread) => {
        if (thread.id === id) {
          return {
            ...thread,
            ...params,
          };
        }

        return thread;
      })
    );

    return of(
      this.threads.get(this.authService.userId)!.find((t) => t.id === id)!
    );
  }
}
