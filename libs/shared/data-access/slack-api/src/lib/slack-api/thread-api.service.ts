import { AuthService } from '@angular-slack/auth/data-access';

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateThreadParams, Thread } from './models';

import { v4 as uuidv4 } from 'uuid';

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
          id: uuidv4(),
          chatName: 'General',
          messageId: uuidv4(),
        },
      ] as Thread[],
    ],
  ]);

  getThreads(): Observable<Thread[]> {
    return of(this.threads.get(this.authService.userId)!);
  }

  createThread(params: CreateThreadParams) {
    this.threads.set(
      this.authService.userId,
      this.threads.get(this.authService.userId)!.concat({
        ...params,
        id: uuidv4(),
      })
    );

    return of(params);
  }
}
