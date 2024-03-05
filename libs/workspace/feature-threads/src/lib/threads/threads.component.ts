import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  initThreads,
  selectAllThreads,
} from '@angular-slack/data-access-threads';
import { Message, Thread } from '@angular-slack/slack-api';

import { Observable } from 'rxjs';
import {
  selectMessagesByChatId,
  sendMessage,
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
export class ThreadsComponent implements OnInit {
  private readonly store = inject(Store);

  threads$ = this.store.select(selectAllThreads);

  getMessagesByChatId(chatId: string): Observable<Message[]> {
    return this.store.select(selectMessagesByChatId(chatId));
  }

  ngOnInit() {
    this.store.dispatch(initThreads());
  }

  trackBy(_: any, thread: Thread): string {
    return thread.id;
  }

  submit(event: { content: string; attachments: File[] }, chatId: string) {
    const { content, attachments } = event;
    this.store.dispatch(
      sendMessage({
        chatId,
        attachments,
        content: content,
      })
    );
  }
}
