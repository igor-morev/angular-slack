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
import { Thread } from '@angular-slack/slack-api';

import { map, switchMap, tap } from 'rxjs';
import { initMessages } from '@angular-slack/data-access-messages';

@Component({
  selector: 'as-threads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './threads.component.html',
  styleUrl: './threads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadsComponent implements OnInit {
  private readonly store = inject(Store);

  threads$ = this.store.select(selectAllThreads).pipe(
    tap((threads) => {
      threads.forEach((thread) => {
        this.store.dispatch(
          initMessages({
            chatId: thread.messageId,
          })
        );
      });
    })
  );

  constructor() {}

  getMessagesByChatId(chatId: string) {}

  ngOnInit() {
    this.store.dispatch(initThreads());
  }

  trackBy(_: any, thread: Thread): string {
    return thread.id;
  }
}
