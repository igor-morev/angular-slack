import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllThreads } from '@angular-slack/data-access-threads';
import { Message, Thread } from '@angular-slack/slack-api';

import { map, Observable } from 'rxjs';
import {
  selectMessagesByChatId,
  sendThreadMessage,
} from '@angular-slack/data-access-messages';
import { ThreadCardComponent } from '@angular-slack/thread-card';

@Component({
  selector: 'as-threads',
  standalone: true,
  imports: [CommonModule, ThreadCardComponent],
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadsComponent {
  private readonly store = inject(Store);

  threads$ = this.store.select(selectAllThreads);

  getMessagesByChatId(thread: Thread): Observable<Message[]> {
    return this.store
      .select(selectMessagesByChatId(thread.chatId))
      .pipe(map((messages) => [thread.message, ...messages]));
  }

  trackBy(_: any, thread: Thread): string {
    return thread.id;
  }

  submit(event: { content: string; attachments: File[] }, thread: Thread) {
    const { content, attachments } = event;
    this.store.dispatch(
      sendThreadMessage({
        threadId: thread.id,
        parentMessage: thread.message,
        attachments,
        content: content,
      })
    );
  }
}
